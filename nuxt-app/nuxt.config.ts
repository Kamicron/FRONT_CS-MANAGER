// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: { 
    global: true, // Charge tous les composants sans les préfixer avec le nom des dossiers
    dirs: [{ path: '~/components/', pathPrefix: false },],
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: {
    port: 8000, // Changez ici le port pour 8000
  },
  css: [
    '~/assets/css/reset.css'
  ]
})
