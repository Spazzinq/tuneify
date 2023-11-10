import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: process.env.SPOTIFY_SCOPES,
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
        token.refreshToken = account.refresh_token
      }
      return token
    },
    async session({session, token}) {
      // Send properties to the client, like an access_token from a provider.
      session.user.userId = token.id;
      session.user.accessToken = token.accessToken;

      // Check if access token has expired
      const currentDate = new Date();
      const tokenExpirationDate = new Date(token.expires);
      if (tokenExpirationDate < currentDate) {
        // Access token has expired, refresh it
        const refreshedTokens = await SpotifyProvider.refreshAccessToken(
          process.env.SPOTIFY_CLIENT_ID,
          process.env.SPOTIFY_CLIENT_SECRET,
          token.refreshToken
        );
        token.accessToken = refreshedTokens.access_token;
        token.refreshToken = refreshedTokens.refresh_token;
      }

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