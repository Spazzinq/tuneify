import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: process.env.SPOTIFY_SCOPES
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.id = account.providerAccountId
        token.accessToken = account.access_token
      }
      return token
    },
    async session({session, token}) {
      // Send properties to the client, like an access_token from a provider.
      session.user.userId = token.id;
      session.user.accessToken = token.accessToken;
      return session
    },
    async redirect({url, baseUrl}) {
      // console.log('url', url);
      // console.log('baseUrl', baseUrl);
      return url;
    }
  }
  // signIn('google', { callbackUrl: 'http://localhost:3000/bar' })
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };