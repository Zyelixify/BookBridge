import { z } from 'zod'
import { shieldedProcedure } from '../procedures'
import type { Context } from '../context'
import { createRouter } from '~/server/trpc/trpc'
import { createBookSchema, updateBookSchema } from '~/schemas'

const defaultInclude = {
  tags: true
}

export const router = createRouter({
  findManyBook: shieldedProcedure.input(z.any(z.object({}))).query(async ({ input, ctx }) => {
    await loadBooks(ctx)
    const [data, count] = await ctx.prisma.$transaction([
      ctx.prisma.book.findMany({ ...input, include: defaultInclude }),
      ctx.prisma.book.count({ where: input.where }),
    ])
    return { data, count }
  }),
  findOneBook: shieldedProcedure.input(z.any(z.object({}))).query(({ input, ctx }) => ctx.prisma.book.findUniqueOrThrow({ include: defaultInclude, ...input })),
  createBook: shieldedProcedure.input(createBookSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.book.create({
      data: {
        ...input,
      }
    })
  }),
  updateBook: shieldedProcedure.input(updateBookSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.book.update({
      where: { id: input.id },
      data: {
        ...input
      }
    })
  }),
})

async function loadBooks(ctx: Context) {
  const existingCount = await ctx.prisma.book.count()
  if (existingCount > 0) {
    return
  }

  const response = await fetch('http://openlibrary.org/subjects/fiction.json?limit=51')
  const data = await response.json()
  const booksData = data.works

  const formattedBooks = booksData.map((book: any) => {
    const isbn13 = book.identifiers?.isbn_13?.[0]
    const isbn10 = book.identifiers?.isbn_10?.[0]
    const isbn = isbn13 || isbn10

    return {
      isbn: isbn || `N/A`,
      title: book.title,
      author: book.authors[0]?.name || 'Unknown Author',
      image: book.cover_id ? `http://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : null,
      price: Math.random() * 100,
      publishedAt: new Date(`${book.first_publish_year}-01-01`),
      createdAt: new Date(),
      status: 'available',
      rating: 0,
    }
  })

  await ctx.prisma.book.createMany({
    data: formattedBooks
  })
}
