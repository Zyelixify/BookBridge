import { z } from 'zod'
import { shieldedProcedure } from '../procedures'
import { createRouter } from '~/server/trpc/trpc'
import { createBookSchema, querySchema, updateBookSchema } from '~/schemas'

export const router = createRouter({
  findManyBook: shieldedProcedure.input(querySchema).query(({ input, ctx }) => ctx.prisma.book.findMany({ where: input.where, select: input.select })),
  findOneBook: shieldedProcedure.input(z.string()).query(({ input, ctx }) => ctx.prisma.book.findUniqueOrThrow({ where: { id: input } })),
  createBook: shieldedProcedure.input(createBookSchema).mutation(({ input, ctx }) => {
    const { groups, tags, ...data } = input
    return ctx.prisma.book.create({
      data: {
        ...data,
        groups: { connect: groups?.map(id => ({ id })) },
        tags: { connect: tags?.map(id => ({ id })) },
      }
    })
  }),
  updateBook: shieldedProcedure.input(updateBookSchema).mutation(({ input, ctx }) => {
    const { id, groups, tags, ...data } = input
    return ctx.prisma.book.update({
      where: { id },
      data: {
        ...data,
        groups: { set: groups?.map(id => ({ id })) },
        tags: { set: tags?.map(id => ({ id })) }
      }
    })
  }),
})
