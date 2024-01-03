import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function POST() {
    cookies()
        .delete('AuthToken');

    return new NextResponse(null, { status: 200 });
}
