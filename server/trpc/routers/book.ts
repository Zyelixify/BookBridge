import { z } from 'zod'
import { shieldedProcedure } from '../procedures'
import type { Context } from '../context'
import { createRouter } from '~/server/trpc/trpc'
import { createBookSchema, updateBookSchema } from '~/schemas'

const defaultSelect = {
  id: true,
  title: true,
  author: true,
  publishedAt: true,
  status: true,
  price: true,
  image: true,
  tags: { select: { id: true, name: true } },
  groups: { select: { id: true, name: true } },
  createdAt: true,
}

export const router = createRouter({
  findManyBook: shieldedProcedure.input(z.any(z.object({}))).query(async ({ input, ctx }) => {
    await loadBooks(ctx)
    const [data, count] = await ctx.prisma.$transaction([
      ctx.prisma.book.findMany({ ...input, select: defaultSelect }),
      ctx.prisma.book.count({ where: input.where }),
    ])
    return { data, count }
  }),
  findOneBook: shieldedProcedure.input(z.any(z.object({}))).query(({ input, ctx }) => ctx.prisma.book.findUniqueOrThrow({ select: defaultSelect, ...input })),
  createBook: shieldedProcedure.input(createBookSchema).mutation(({ input, ctx }) => {
    const { groups, ...data } = input
    return ctx.prisma.book.create({
      data: {
        ...data,
        groups: { connect: groups?.map(id => ({ id })) },
      }
    })
  }),
  updateBook: shieldedProcedure.input(updateBookSchema).mutation(({ input, ctx }) => {
    const { id, groups, ...data } = input
    return ctx.prisma.book.update({
      where: { id },
      data: {
        ...data,
        groups: { set: groups?.map(id => ({ id })) },
      }
    })
  }),
})

async function loadBooks(ctx: Context) {
  const existingCount = await ctx.prisma.book.count()
  if (existingCount > 0) { return }

  const response = await fetch('http://openlibrary.org/subjects/fiction.json?limit=51')
  const data = await response.json()
  const booksData = data.works

  const formattedBooks = booksData.map((book: any) => {
    // Attempt to find an ISBN 13 or ISBN 10 from the book's identifiers
    const isbn13 = book.identifiers?.isbn_13?.[0] // Taking the first ISBN 13 if available
    const isbn10 = book.identifiers?.isbn_10?.[0] // Taking the first ISBN 10 if available
    const isbn = isbn13 || isbn10 // Prefer ISBN 13 over ISBN 10

    return {
      isbn: isbn || `N/A`, // Use 'N/A' if no ISBN is available
      title: book.title,
      author: book.authors[0]?.name || 'Unknown Author',
      tags: {
        connectOrCreate: book.subject?.map((name: string) => ({
          where: { name },
          create: { name },
        })),
      },
      image: book.cover_id ? `http://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : null,
      price: Math.random() * 100, // Generating a random price.
      publishedAt: new Date(`${book.first_publish_year}-01-01`),
      createdAt: new Date(),
      status: 'available',
      rating: 0,
    }
  })

  ctx.prisma.$transaction(formattedBooks.map((book: any) => ctx.prisma.book.create({ data: book })))
}
