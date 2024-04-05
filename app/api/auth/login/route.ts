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

        const serverResponse = await scoreTableApiV1.post('/user/login', {
            email,
            password,
        });

        const serialized = serialize('AuthToken', serverResponse.data.authentication_token.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(serverResponse.data.authentication_token.expiry),
            path: '/',
        });

        return new NextResponse('Authorized', {
            status: 200,
            headers: { 'Set-Cookie': serialized },
        });
    } catch (e: any) {
        return new NextResponse(e.response, { status: e.response.status });
    }
}
