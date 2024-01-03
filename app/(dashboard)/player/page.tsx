'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import usePlayers from '@/hooks/usePlayers';
import { PlayerSummaryDto } from '@/app/api/types';

export default function PlayersView() {
    const {
        getPlayers,
        loading,
        error,
    } = usePlayers();
    const [players, setPlayers] = useState<PlayerSummaryDto[]>([]);

    useEffect(() => {
        const res = getPlayers();
        setPlayers(res.data);
    }, []);
    return <>
        {players.map(p => p.firstName)}
        <Button href="/player/create" component={Link}>Create
            Player
        </Button>
           </>;
}
