import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // console.log(`Middleware called: ${req.url}`);
  try {
    const token = await getToken({ req });

    return token
      ? NextResponse.next() : NextResponse.redirect(new URL("/", req.nextUrl));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  };
}

// Only allow access to authenticated users
export const config = {
  matcher: '/protected/:path*',
}