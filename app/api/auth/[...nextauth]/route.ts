import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import authOptions from "@/auth.config"

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };