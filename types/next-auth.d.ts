import NextAuth, { DefaultSession, Account as NextAuthAccount } from 'next-auth'
import { JWT as NextAuthJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string
    error?: string
    user?: {
      userId: string
      accessToken: string
    }
  }
  interface Account extends NextAuthAccount {
    expires_at: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends NextAuthJWT {
    token?: { 
        id: string
        accessToken: string
        refreshToken: string
        expires: string
    }
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string
    user?: Session['user']
  }
}