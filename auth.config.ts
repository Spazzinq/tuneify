import SpotifyProvider from "next-auth/providers/spotify";
import { Account, NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Spotify from "next-auth/providers/spotify";

async function refreshAccessToken(token: JWT): Promise<JWT> {
    Spotify
    try {
        const basicAuth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString(
            'base64'
        )
        const { data } = await fetch(
            process.env.SPOTIFY_REFRESH_TOKEN_URL || '', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken || '',
            })
        }).then((res) => res.json())
        return {
            ...token,
            accessToken: data.access_token,
            accessTokenExpires: Date.now() + data.expires_in * 1000,
        }
    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
}

const authConfig: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID || '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
            authorization: {
                params: {
                    scope: process.env.SPOTIFY_SCOPES,
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }: { token: JWT, account: any, user: User }) {
            // Persist the OAuth access_token to the token right after signin
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: account.expires_at * 1000,
                    user,
                }
            }
            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
                return token
            }
            const newToken = await refreshAccessToken(token)
            return newToken
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            session.accessToken = token.accessToken
            session.error = token.error
            session.user = token.user
            return session
        }
    }
};

export default authConfig;
