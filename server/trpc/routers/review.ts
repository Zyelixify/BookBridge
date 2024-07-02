import { shieldedProcedure } from '../procedures'
import { createRouter } from '~/server/trpc/trpc'
import { createReviewSchema } from '~/schemas'

export const router = createRouter({
  createReview: shieldedProcedure.input(createReviewSchema).mutation(async ({ input, ctx }) => {
    const book = await ctx.prisma.book.findUnique({ where: { id: input.bookId }, select: { title: true } })
    if (!book) { return }

    await ctx.prisma.event.create({
      data: {
        type: 'Review',
        message: `You reviewed '${book.title}' ${input.recommend ? 'positively' : 'negatively'}`,
        bookId: input.bookId,
        accountId: input.accountId,
      }
    })
    return ctx.prisma.review.create({ data: input })
  }),
})
