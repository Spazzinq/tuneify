import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // console.log(`Middleware called: ${req.url}`);
  try {
    const token = await getToken({ req });

    return token ? NextResponse.next() : NextResponse.redirect(new URL("/", req.nextUrl));
  } catch (error) {
    // console.log("Error in middleware");
    // console.log(error);
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  };
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/protected/:path*',
}