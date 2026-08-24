import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ssr: false,
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'Марія & Сергій - історія кохання',
      meta: [
        {
          name: 'description',
          content: 'Інтерактивна сайт-новела про історію кохання Марії та Сергія.'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: 'favicon.ico'
        }
      ]
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})
