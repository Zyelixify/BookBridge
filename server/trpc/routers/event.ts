import { z } from 'zod'
import { shieldedProcedure } from '../procedures'
import { createRouter } from '~/server/trpc/trpc'

const defaultEventInclude = {
  account: true,
  book: true,
}

export const router = createRouter({
  findManyEvent: shieldedProcedure.input(z.any(z.object({}))).query(({ input, ctx }) => {
    return ctx.prisma.event.findMany({ ...input, include: defaultEventInclude, orderBy: { createdAt: 'desc' } })
  }),
})
