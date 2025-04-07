import NextAuth from 'next-auth'
import TwitchProvider from 'next-auth/providers/twitch'

const handler = NextAuth({
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid user:read:email' // Puedes ajustar los scopes
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development' // Para ver logs en desarrollo
})

export { handler as GET, handler as POST }
