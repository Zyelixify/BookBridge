import { createRouter } from '../trpc'
import { router as account } from './account'
import { router as book } from './book'
import { router as bookOwnership } from './bookOwnerships'

export const appRouter = createRouter({
  account,
  book,
  bookOwnership,
})

// export type definition of API
export type AppRouter = typeof appRouter
