import { z } from 'zod'

const idObjectSchema = z.object({ id: z.string() })

// Account
export const accountRoleSchema = z.enum(['admin', 'employee', 'user'])
export const createAccountSchema = z.object({
  email: z.string().email(),
  role: accountRoleSchema,
})
export const updateAccountSchema = createAccountSchema.merge(idObjectSchema)

// Book
export const bookStatusSchema = z.enum(['available', 'borrowed', 'lost'])
export const bookTagSchema = z.enum(['fiction', 'non-fiction', 'biography'])
export const createBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.number(),
  status: bookStatusSchema,
  groups: z.array(z.string()).optional(),
  tags: z.array(bookTagSchema).optional(),
  publishedAt: z.date(),
})
export const updateBookSchema = createBookSchema.merge(idObjectSchema)
