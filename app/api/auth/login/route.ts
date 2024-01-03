import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import { scoreTableApiV1 } from '@/app/api/scoreTableApiV1';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            email,
            password,
        } = body;

        const serverResponse = await scoreTableApiV1.post('/login', {
            email,
            password,
        });

        const serialized = serialize('AuthToken', serverResponse.data.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: serverResponse.data.expiresIn,
            path: '/',
        });

        return new NextResponse('Authorized', {
            status: 200,
            headers: { 'Set-Cookie': serialized },
        });
    } catch (e: any) {
        return new NextResponse(e.response.data, { status: e.response.status });
    }
}
