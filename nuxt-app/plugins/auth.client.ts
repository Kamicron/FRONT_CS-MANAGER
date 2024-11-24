import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()

  if (process.server && nuxtApp.ssrContext?.event) {
    const headers = useRequestHeaders(['cookie']) // Récupère les headers
    const cookies = headers.cookie || '' // Accède aux cookies depuis les headers
    const token = cookies
      .split('; ')
      .find((c) => c.startsWith('access_token='))
      ?.split('=')[1] // Récupère le token "access_token"

    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        authStore.isAuthenticated = true
        authStore.isAdmin = decoded.isAdmin || false
        authStore.user = { username: decoded.username, level: decoded.level } as any // Ajoute un cast pour éviter les erreurs de type
      } catch (error) {
        console.error('Erreur dans le plugin d\'auth:', error)
      }
    }
  }
})
