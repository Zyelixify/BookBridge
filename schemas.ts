import { z } from 'zod'

export const objectSchema = z.any().default({})
export const querySchema = z.object({ where: objectSchema, select: objectSchema })

// Account
export const accountRoleSchema = z.enum(['admin', 'employee', 'user'])
export const createAccountSchema = z.object({
  email: z.string().email(),
  role: accountRoleSchema,
})
export const updateAccountSchema = z.any(z.object({}))

// Book
export const bookStatusSchema = z.enum(['available', 'borrowed', 'lost'])
export const createBookSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.number(),
  status: bookStatusSchema,
  groups: z.array(z.string()).optional(),
  publishedAt: z.date(),
})
export const updateBookSchema = z.any(z.object({}))

// Book Ownership
export const bookOwnershipStateSchema = z.enum(['active', 'returned', 'lost'])
export const createBookOwnershipSchema = z.object({
  bookId: z.string(),
  accountId: z.string(),
  state: bookOwnershipStateSchema.default('active'),
  dateCreated: z.date().default(new Date()),
  dateReceived: z.date().optional(),
  expiresAt: z.date().optional(),
  dateReturned: z.date().optional(),
})
export const updateBookOwnershipSchema = z.any(z.object({}))
