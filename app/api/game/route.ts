import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
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

        return NextResponse.json(res.data);
    } catch (e: any) {
        return NextResponse.json(e.response.data, { status: e.response.status });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const res = await scoreTableApiV1.post('/api/Game', {
            dateTime: body.dateTime,
            periodCount: body.periodCount,
            periodLength: body.periodLength,
            gameFormatId: body.gameFormatId,
            teamIds: body.teamIds,
        }, {
            headers: {
                Authorization: `Bearer ${cookies()
                    .get('AuthToken')?.value}`,
            },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (e: any) {
        return new NextResponse(e.response.data, { status: e.response.status });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        const res = await scoreTableApiV1.delete(`api/Game?id=${id}`, {
            headers: {
                Authorization: `Bearer ${request.cookies.get('AuthToken')?.value}`,
            },
        });

        return new NextResponse(null, { status: res.status });
    } catch (e: any) {
        return NextResponse.json(e.response.data, { status: e.response.status });
    }
}
