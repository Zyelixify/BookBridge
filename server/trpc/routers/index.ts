import { createRouter } from '../trpc'
import { router as account } from './account'

export const appRouter = createRouter({
  account,
})

// export type definition of API
export type AppRouter = typeof appRouter
