import { z } from 'zod'
import { shieldedProcedure } from '../procedures'
import { createRouter } from '~/server/trpc/trpc'
import { createBookSchema, updateBookSchema } from '~/schemas'

const defaultSelect = {
  id: true,
  title: true,
  author: true,
  publishedAt: true,
  status: true,
  price: true,
  tags: true,
  groups: true,
  createdAt: true,
}
const fullSelect = {
  ...defaultSelect,
  description: true,
  image: true,
}

export const router = createRouter({
  findManyBook: shieldedProcedure.input(z.any(z.object({}))).query(({ input, ctx }) => ctx.prisma.book.findMany({ select: defaultSelect, ...input })),
  findOneBook: shieldedProcedure.input(z.any(z.object({}))).query(({ input, ctx }) => ctx.prisma.book.findUniqueOrThrow({ select: fullSelect, ...input })),
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
