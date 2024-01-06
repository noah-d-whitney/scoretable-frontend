'use client';

import { Avatar, Badge, Flex, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { PlayerSummaryDto } from '@/app/api/types';
import LoadingSuspense from '@/components/Utility/LoadingSuspense';

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
        } catch (e: any) {
            notifications.show({
                title: 'Error',
                message: `Player with ID ${id} could not be found`,
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

    return (
        <LoadingSuspense
          loading={loading}
          loadingText="Loading player, please wait..."
        >
            {player
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
                  </Flex> : null}
        </LoadingSuspense>);
}
