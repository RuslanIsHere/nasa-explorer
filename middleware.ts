import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function middleware(request: NextRequest) {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!auth|_next/static|_next/image|favicon.ico).*)'],
};