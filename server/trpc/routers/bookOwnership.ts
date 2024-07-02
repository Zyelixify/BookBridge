import { z } from 'zod'
import { shieldedProcedure } from '../procedures'
import { createRouter } from '~/server/trpc/trpc'
import { createBookOwnershipSchema, updateBookOwnershipSchema } from '~/schemas'

const defaultBookOwnershipInclude = {
  account: true,
  book: true,
}

export const router = createRouter({
  findManyBookOwnership: shieldedProcedure.input(z.any(z.object({}))).query(({ input, ctx }) => {
    return ctx.prisma.bookOwnership.findMany({ ...input, include: defaultBookOwnershipInclude, orderBy: { dateCreated: 'desc' } })
  }),
  findOneBookOwnership: shieldedProcedure.input(z.any(z.object({}))).query(({ input, ctx }) => ctx.prisma.bookOwnership.findUniqueOrThrow({ include: defaultBookOwnershipInclude, ...input })),
  createBookOwnership: shieldedProcedure.input(createBookOwnershipSchema).mutation(async ({ input, ctx }) => {
    const book = await ctx.prisma.book.findUnique({ where: { id: input.bookId }, select: { title: true } })
    if (!book) { return }

    await ctx.prisma.event.create({
      data: {
        type: 'Booking',
        message: `You booked '${book.title}'`,
        bookId: input.bookId,
        accountId: input.accountId,
        createdAt: new Date(),
      }
    })
    return ctx.prisma.bookOwnership.create({
      data: {
        ...input,
        dateCreated: new Date(),
      }
    })
  }),
  updateBookOwnership: shieldedProcedure.input(updateBookOwnershipSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.bookOwnership.update({
      where: { id: input.id },
      data: {
        ...input,
      }
    })
  }),
})
