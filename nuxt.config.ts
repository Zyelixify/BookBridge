// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-naiveui',
    '@sidebase/nuxt-auth',
    'nuxt-icon'
  ],
  build: {
    transpile: [
      'trpc-nuxt'
    ],
  },
  typescript: {
    shim: false
  },
  auth: {
    provider: {
      type: 'authjs',
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },
})
