import { createRouter } from '../trpc'
import { router as account } from './account'
import { router as book } from './book'
import { router as bookOwnership } from './bookOwnership'
import { router as event } from './event'
import { router as review } from './review'

export const appRouter = createRouter({
  account,
  book,
  bookOwnership,
  event,
  review
})

// export type definition of API
export type AppRouter = typeof appRouter
