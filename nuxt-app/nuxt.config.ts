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
  routeRules: {
    // Applique le middleware à toutes les routes
    '/**': { ssr: false },
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
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/scss/style.scss' // Styles Core de FontAwesome
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/_variables.scss" as *;
            @use "@/assets/scss/_mixins.scss" as *;
          `,
        },
      },
    },
  },
  plugins: ['~/plugins/fontawesome.js'],
  modules: ['@pinia/nuxt'],
  // pinia: {
  //   autoImports: [
  //     // Auto-import `defineStore` depuis Pinia
  //     'defineStore',
  //   ],
  // },
})
