'use client';

import { Avatar, Badge, Center, Flex, Loader, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { PlayerSummaryDto } from '@/app/api/types';

export default function PlayerDetailView({ params }: { params: { id: string } }) {
    const { id } = params;
    const [loading, setLoading] = useState<boolean>(true);
    const [player, setPlayer] = useState<PlayerSummaryDto | null>(null);
    const { push } = useRouter();

    async function fetchPlayer() {
        try {
            setLoading(true);
            const fetchedPlayer = await axios.get(`../api/player/${id}`);
            setPlayer(fetchedPlayer.data);
            setLoading(false);
        } catch (e) {
            notifications.show({
                title: 'Error',
                message: e.response.data,
                autoClose: 5000,
                color: 'red',
                radius: 'md',
                withBorder: true,
            });
            push('/player');
        }
    }

    useEffect(() => {
        fetchPlayer();
    }, []);

    return loading
        ? <Center my="xl"><Loader color="orange" size="lg" /></Center>
        : player
            ? <Flex gap="md">
                <Avatar size={100}>
                    {player.firstName.slice(0, 1) + player.lastName.slice(0, 1)}
                </Avatar>
                <Flex direction="column" mt="sm">
                    <Badge
                      size="lg"
                      variant="light"
                      color="orange"
                    >#{player.number}
                    </Badge>
                    <Title order={1}>
                        {player.firstName} {player.lastName}
                    </Title>
                </Flex>
              </Flex>
            : null;
}
