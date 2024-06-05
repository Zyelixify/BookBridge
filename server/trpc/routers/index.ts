import { createRouter } from '../trpc'
import { router as account } from './account'
import { router as book } from './book'

export const appRouter = createRouter({
  account,
  book
})

// export type definition of API
export type AppRouter = typeof appRouter
