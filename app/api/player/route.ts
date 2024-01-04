import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { scoreTableApiV1 } from '@/app/api/scoreTableApiV1';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const res = await scoreTableApiV1.post('/api/Player', {
            firstName: body.firstName,
            lastName: body.lastName,
            number: body.number,
        });

        return new NextResponse(res.data, { status: 201 });
    } catch (e: any) {
        return new NextResponse(e.response.data, { status: e.response.status });
    }
}

export async function GET() {
    try {
        const res = await scoreTableApiV1.get('/api/Player', {
            headers: {
                Authorization: `Bearer ${cookies()
                    .get('AuthToken')?.value}`,
            },
        });
        return new NextResponse(JSON.stringify(res.data));
    } catch (e) {
        return new NextResponse(e.response.data, { status: e.response.status });
    }
}
