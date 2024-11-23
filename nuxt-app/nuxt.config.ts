// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://site-assets.fontawesome.com/releases/v6.4.2/css/all.css',
        },
      ],
    },
  },
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
    '~/assets/css/reset.css', // Fichier CSS de réinitialisation local
    '@fortawesome/fontawesome-svg-core/styles.css', // Styles Core de FontAwesome
  ],
  plugins: ['~/plugins/fontawesome.js'],
})
