import { z } from 'zod'
import { shieldedProcedure } from '../procedures'
import { createRouter } from '~/server/trpc/trpc'
import { createBookOwnershipSchema, updateBookOwnershipSchema } from '~/schemas'

const defaultBookOwnershipInclude = {
  account: true,
  book: true,
}

export const router = createRouter({
  findManyBook: shieldedProcedure.input(z.any(z.object({}))).query(({ input, ctx }) => {
    return ctx.prisma.bookOwnership.findMany({ ...input, include: defaultBookOwnershipInclude })
  }),
  findOneBook: shieldedProcedure.input(z.any(z.object({}))).query(({ input, ctx }) => ctx.prisma.bookOwnership.findUniqueOrThrow({ include: defaultBookOwnershipInclude, ...input })),
  createBook: shieldedProcedure.input(createBookOwnershipSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.bookOwnership.create({
      data: {
        ...input,
      }
    })
  }),
  updateBook: shieldedProcedure.input(updateBookOwnershipSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.bookOwnership.update({
      where: { id: input.id },
      data: {
        ...input,
      }
    })
  }),
})
