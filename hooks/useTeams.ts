import { useState } from 'react';
import { playerDto } from '@/hooks/usePlayers';
import { scoreTableApiV1 } from '@/app/api/scoreTableApiV1';
import useNotify from '@/hooks/useNotify';

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
    const [updating, setUpdating] = useState(false);
    const { notify } = useNotify();

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

    // TODO create handler in backend to get all players not on game
    async function assignPlayers(teamPin: string, playerPins: string[]): Promise<teamDto> {
        try {
            setLoading(true);
            const response = await scoreTableApiV1.patch<{
                team: teamDto
            }>(`/team/${teamPin}`, { player_ids: playerPins });
            notify('assign_players', 'Player(s) assigned', 'Provided players' +
                ' were successfully added to team');
            return response.data.team;
        } catch (e: any) {
            setError(e.message);
            return await Promise.reject<teamDto>(e);
        } finally {
            setLoading(false);
        }
    }

    async function assignLineup(teamPin: string, lineup: string[]): Promise<teamDto> {
        try {
            setUpdating(true);
            const response = await scoreTableApiV1.patch<{
                team: teamDto
            }>(`/team/${teamPin}`, { player_lineup: lineup });
            return response.data.team;
        } catch (e: any) {
            setError(e.response.data.error);
            return await Promise.reject<teamDto>(e);
        } finally {
            setUpdating(false);
        }
    }

    return {
        getTeam,
        assignPlayers,
        assignLineup,
        error,
        loading,
        updating,
    };
}
