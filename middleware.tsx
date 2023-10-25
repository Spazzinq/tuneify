import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // console.log(`Middleware called: ${req.url}`);
  try {
    const token = await getToken({ req });
    if (token) {
      return NextResponse.next();
    } else {
      // console.log("User not authenticated");
      return new NextResponse(
        JSON.stringify({ success: false, message: "not authenticated" }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }
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