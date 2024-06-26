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
        }, {
            headers: {
                Authorization: `Bearer ${cookies()
                    .get('AuthToken')?.value}`,
            },
        });

        const created = JSON.stringify(res.data);

        return new NextResponse(created, { status: 201 });
    } catch (e: any) {
        return new NextResponse(e.response.data, { status: e.response.status });
    }
}

export async function GET() {
    try {
        if (!cookies()
            .has('AuthToken')) {
            return new NextResponse(null, { status: 401 });
        }
        const res = await scoreTableApiV1.get('/player', {
            headers: {
                Authorization: `Bearer ${cookies()
                    .get('AuthToken')?.value}`,
            },
        });

        return NextResponse.json(res.data);
    } catch (e: any) {
        return NextResponse.json(e.response.data);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        const res = await scoreTableApiV1.delete(`api/Player?id=${id}`, {
            headers: {
                Authorization: `Bearer ${request.cookies.get('AuthToken')?.value}`,
            },
        });

        return new NextResponse(null, { status: res.status });
    } catch (e: any) {
        return NextResponse.json(e.response.data, { status: e.response.status });
    }
}
