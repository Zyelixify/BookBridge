import { z } from 'zod'
import { shieldedProcedure } from '../procedures'
import { createRouter } from '~/server/trpc/trpc'
import { querySchema } from '~/schemas'

const defaultSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
}

export const router = createRouter({
  findManyAccount: shieldedProcedure.input(querySchema).query(({ input, ctx }) => ctx.prisma.account.findMany({ select: defaultSelect, ...input })),
  findOneAccount: shieldedProcedure.input(z.any(z.object({}))).query(({ input, ctx }) => ctx.prisma.account.findUniqueOrThrow({ select: defaultSelect, ...input })),
})
