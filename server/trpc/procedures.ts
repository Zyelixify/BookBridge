import { allow, and, deny, or, rule, shield } from 'trpc-shield'
import { publicProcedure, t } from './trpc'
import type { Context } from '~/server/trpc/context'

const isAuth = rule<Context>()(ctx => !!ctx.session?.user)
const permissions = shield<Context>({
  query: {
    // Account
    findOneAccount: isAuth,
    findManyAccount: isAuth,

    // Book
    findOneBook: isAuth,
    findManyBook: isAuth,
  },
  mutation: {
    createBook: isAuth,
    updateBook: isAuth,
  },
}, { fallbackRule: deny })

export const shieldedProcedure = publicProcedure.use(t.middleware(permissions))
