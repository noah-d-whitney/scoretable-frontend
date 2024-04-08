import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { scoreTableApiV1 } from '@/app/api/scoreTableApiV1';

export type playerDto = {
    pin: string,
    first_name: string,
    last_name: string,
    pref_number: number | null,
    number: number | null,
    is_active: boolean,
    lineup_pos: number | null,
};

export type createPlayerDto = {
    first_name: string,
    last_name: string,
    pref_number: number,
};

export type createPlayerErrors = {
    first_name?: string,
    last_name?: string,
    pref_number?: string,
};

export type metadata = {
    current_page: number,
    page_size: number,
    first_page: number,
    last_page: number,
    total_records: number,
};

export default function usePlayers() {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const router = useRouter();

    async function getPlayer(pin: string): Promise<playerDto> {
        try {
            setLoading(true);
            const response = await scoreTableApiV1.get<{
                player: playerDto
            }>(`/player/${pin}`);
            return response.data.player;
        } catch (e: any) {
            setError(e.message);
            return await Promise.reject<playerDto>(e);
        } finally {
            setLoading(false);
        }
    }

    async function getPlayers(args: {
        name?: string | null,
        sort?: string | null,
        page?: number | null,
        pageSize?: number | null,
    }):
        Promise<{ players: playerDto[]; metadata: metadata; }> {
        try {
            setLoading(true);
            const {
                name,
                sort,
                page,
                pageSize,
            } = args;
            const response = await scoreTableApiV1.get<{
                players: playerDto[],
                metadata: metadata,
            }>(`/player?page=${page || 1}&page_size=${pageSize || 10}${name ? `&name=${name}` : ''}${sort ? `&sort=${sort}` : ''}`);
            return response.data;
        } catch (e: any) {
            setError(e.message);
            return await Promise.reject(e);
        } finally {
            setLoading(false);
        }
    }

    async function createPlayer(p: createPlayerDto): Promise<void> {
        try {
            setCreating(true);
            const res = await scoreTableApiV1.post<{
                player: playerDto
            }>('/player', p);
            const { pin } = res.data.player;
            router.push(`/player/${pin}`);
        } catch (e: any) {
            if (e.response.status === 422) {
                throw e.response.data.error;
            }
        } finally {
            setCreating(false);
        }
    }

    async function deletePlayer(pin: string): Promise<void> {
        try {
            setLoading(true);
            await scoreTableApiV1.delete(`/player/${pin}`);
            router.push('/player');
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        getPlayer,
        getPlayers,
        createPlayer,
        deletePlayer,
        error,
        loading,
        creating,
    };
}
