import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { scoreTableApiV1 } from '@/app/api/scoreTableApiV1';

// TODO add user isauth endpoint to server
export async function GET() {
    try {
        const cookie = cookies()
            .has('AuthToken');
        if (!cookie) return new NextResponse('Auth cookie not found', { status: 401 });
        const res = await scoreTableApiV1.get('/healthcheck', {
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
