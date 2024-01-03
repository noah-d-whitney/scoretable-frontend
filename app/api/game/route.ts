import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { scoreTableApiV1 } from '@/app/api/scoreTableApiV1';
import { GameSummaryDTO } from '@/app/api/types';

export async function GET(): Promise<NextResponse<GameSummaryDTO[]>> {
    try {
        const res = await scoreTableApiV1.get('api/game', {
            headers: {
                Authorization: `Bearer ${cookies()
                    .get('AuthToken')?.value}`,
            },
        });

        return new NextResponse(JSON.stringify(res.data));
    } catch (e: any) {
        return new NextResponse(e.response.data, { status: e.response.status });
    }
}
