import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth';

 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = auth();
    console.log('session', session);

    return !session ? NextResponse.redirect('/') : NextResponse.next()
}
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }