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
    const [error, setError] = useState<createPlayerErrors>({
        first_name: undefined,
        last_name: undefined,
        pref_number: undefined,
    });
    const [loading, setLoading] = useState(false);
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
            }>(`/player?page=${page || 1}&pageSize=${pageSize || 5}${name ? `&name=${name}` : ''}${sort ? `&sort=${sort}` : ''}`);
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
            setLoading(true);
            const res = await scoreTableApiV1.post<playerDto>('/player', p);
            router.push(res.headers.Location);
        } catch (e: any) {
            const { errors } = e.response.data;
            setError(errors);
        } finally {
            setLoading(false);
        }
    }

    return {
        getPlayer,
        getPlayers,
        createPlayer,
        error,
        loading,
    };
}
