import { NextRequest, NextResponse } from 'next/server';
import { scoreTableApiV1 } from '@/app/api/scoreTableApiV1';

export async function GET(request: NextRequest, { params }: {
    params: { id: number }
}) {
    try {
        const { id } = params;
        const res = await scoreTableApiV1.get(`api/Team/${id}`, {
            headers: {
                Authorization: `Bearer ${request.cookies.get('AuthToken')?.value}`,
            },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (e: any) {
        return NextResponse.json(e.response.data, { status: e.response.status });
    }
}
