'use client';

import { Avatar, Badge, Flex, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import LoadingSuspense from '@/components/Utility/LoadingSuspense';
import usePlayers, { playerDto } from '@/hooks/usePlayers';

export default function PlayerDetailView({ params }: {
    params: { pin: string }
}) {
    const { pin } = params;
    const [player, setPlayer] = useState<playerDto | null>(null);
    const {
        getPlayer,
        loading,
    } = usePlayers();

    useEffect(() => {
        getPlayer(pin)
            .then(p => setPlayer(p))
            .catch(e => {
                if (e.response.status === 404) {
                    // TODO make 404 work
                    notFound();
                }
            });
    }, [pin]);

    return (
        <LoadingSuspense
          loading={loading}
          loadingText="Loading player, please wait..."
        >
            {player
                ? <Flex gap="md">
                    <Avatar size={100}>
                        {player.first_name.slice(0, 1) + player.last_name.slice(0, 1)}
                    </Avatar>
                    <Flex direction="column" mt="sm">
                        <Badge
                          size="lg"
                          variant="light"
                          color="orange"
                        >#{player.pref_number}
                        </Badge>
                        <Title order={1}>
                            {player.first_name} {player.last_name}
                        </Title>
                    </Flex>
                  </Flex> : null}
        </LoadingSuspense>);
}
