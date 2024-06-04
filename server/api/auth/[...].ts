import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import { getPrisma } from '~/server/middleware/0.prisma'
import { NuxtAuthHandler } from '#auth'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  type: z.enum(['login', 'signup']),
})
export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'testSecret',
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      authorize: async (credentials: any) => {
        const { email, password, type } = loginSchema.parse(credentials)
        const user = type === 'login'
          ? await getPrisma().account.findUniqueOrThrow({
            where: { email },
            select: { id: true, password: true },
          })
          : await getPrisma().account.create({
            data: { email, password },
            select: { id: true, password: true },
          })

        if (user.password === password) {
          return { id: user.id }
        }
        return createError({ statusCode: 403, statusMessage: 'unauthorized' })
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id || ''
      }
      return token
    },
    session: async ({ session, token }) => {
      try {
        const account = await getPrisma().account.findUniqueOrThrow({
          where: { id: z.string().parse(token.id) },
          select: {
            role: true,
            email: true,
          },
        })
        return {
          ...session,
          account
        }
      }
      catch (error) {
        console.error(error)
        throw error
      }
    },
  },
})
