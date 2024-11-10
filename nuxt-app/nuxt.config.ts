// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: {
    port: 8000, // Changez ici le port pour 8000
  },
  css: [
    '~/assets/css/reset.css'
  ]
})
