import { NextRequest, NextResponse } from 'next/server';

// TODO replace with request to server
export function middleware(request: NextRequest) {
    if (!request.cookies.has('ScoretableAuth')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/home',
};
