import { useState } from 'react';
import { metadata, playerDto } from '@/hooks/usePlayers';
import { scoreTableApiV1 } from '@/app/api/scoreTableApiV1';

export type teamDto = {
    pin: string
    name: string
    location: string
    size: number
    is_active: boolean
    players: playerDto[]
};

export type createTeamDto = {
    name: string
    location: string
    player_ids: string[]
    player_lineup: string[]
    player_nums: Map<string, number>
}

export default function useTeams() {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [creating, setCreating] = useState(false);
    const [fetching, setFetching] = useState(false);

    async function createTeam(t: createTeamDto): Promise<teamDto> {
        try {
            setCreating(true);
            const team = {
                name: t.name,
                location: t.location,
                player_ids: t.player_ids,
                player_lineup: t.player_lineup,
                player_nums: t.player_nums,
            }
            const response = await scoreTableApiV1.post<{ team: teamDto }>('/team', team);
            return response.data.team;
        } catch (e: any) {
            throw e.response.data.error;
        } finally {
            setCreating(false);
        }
    }

    async function getTeams(args: {
        name?: string | null,
        sort?: string | null,
        page?: number | null,
        pageSize?: number | null
    }): Promise<{ teams: teamDto[], metadata: metadata }> {
        const { name, sort, page, pageSize } = args;
        try {
            const response = await scoreTableApiV1.get<{
                teams: teamDto[]
                metadata: metadata
            }>(`/team?page=${page || 1}&page_size=${pageSize || 10}${name ? `&name=${name}` : ''}${sort ? `&sort=${sort}` : ''}`);
            return response.data;
        } catch (e: any) {
            setError(e.response.data.error);
            return Promise.reject<{ teams: teamDto[], metadata: metadata }>(e);
        } finally {
            setLoading(false);
        }
    }

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
            return response.data.team;
        } catch (e: any) {
            throw e.response.data.error.player_ids;
        } finally {
            setLoading(false);
        }
    }

    async function unassignPlayer(teamPin: string, playerPin: string): Promise<teamDto> {
        try {
            setUpdating(true);
            const response = await scoreTableApiV1.patch<{
                team: teamDto
            }>(`/team/${teamPin}`, { player_ids: [`-${playerPin}`] });
            return response.data.team;
        } catch (e: any) {
            setError(e.response.data.error);
            return await Promise.reject<teamDto>(e);
        } finally {
            setUpdating(false);
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

    async function toggleTeamActive(teamPin: string, active: boolean): Promise<teamDto> {
        try {
            setUpdating(true);
            const response = await scoreTableApiV1.patch<{
                team: teamDto
            }>(`/team/${teamPin}`, { is_active: active });
            return response.data.team;
        } catch (e: any) {
            setError(e.response.data.error.is_active);
            return await Promise.reject<teamDto>(e);
        } finally {
            setUpdating(false);
        }
    }

    async function deleteTeam(pin: string): Promise<void> {
        try {
            setUpdating(true);
            await scoreTableApiV1.delete(`team/${pin}`);
            return;
        } catch (e: any) {
            setError(e.response.data.error)
            return;
        } finally {
            setUpdating(false);
        }
    }

    return {
        createTeam,
        getTeam,
        getTeams,
        assignPlayers,
        unassignPlayer,
        assignLineup,
        toggleTeamActive,
        deleteTeam,
        error,
        fetching,
        loading,
        updating,
        creating,
    };
}
