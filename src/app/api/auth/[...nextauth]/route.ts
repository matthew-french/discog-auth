import NextAuth, { NextAuthOptions } from 'next-auth'
import DiscogsProvider from '@/providers/DiscogAuthProvider'
import { NextApiRequest, NextApiResponse } from 'next'

export const authOptions: NextAuthOptions = {
  providers: [
    DiscogsProvider({
      clientId: process.env.DISCOGS_CONSUMER_KEY ? process.env.DISCOGS_CONSUMER_KEY : '',
      clientSecret: process.env.DISCOG_SECRET ? process.env.DISCOG_SECRET : '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(data) {
      const { account, token } = data

      if (account) {
        token.id = account.providerAccountId
        token.accessToken = account.oauth_token
        token.tokenSecret = account.oauth_token_secret
      }

      return token
    },
    async session(data) {
      const { session, token } = data

      session.user = token

      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions)

export { handler as GET, handler as POST }
