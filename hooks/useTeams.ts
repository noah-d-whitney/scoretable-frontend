import { useState } from 'react';
import { playerDto } from '@/hooks/usePlayers';
import { scoreTableApiV1 } from '@/app/api/scoreTableApiV1';

export type teamDto = {
    pin: string
    name: string
    size: number
    is_active: boolean
    players: playerDto[]
};

export default function useTeams() {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);

    async function getTeam(pin: string): Promise<teamDto> {
        try {
            setLoading(true);
            const response = await scoreTableApiV1.get<{
                team: teamDto
            }>(`/team/${pin}`);
            return response.data.team;
        } catch (e: any) {
            setError(e.message);
            return await Promise.reject<teamDto>(e);
        } finally {
            setLoading(false);
        }
    }

    // async function assignPlayers(pins: string[]): Promise<void> {
    //     try {
    //         setLoading(true)
    //     }
    // }

    return {
        getTeam,
        error,
        loading,
    };
}
