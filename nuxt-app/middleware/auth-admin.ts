// middleware/auth-admin.ts
import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Si l'utilisateur n'est pas authentifié, récupère les données utilisateur
  if (!authStore.isAuthenticated) {
    await authStore.initializeFromToken()
  }

  // Vérifie si l'utilisateur est admin après la mise à jour des données
  if (!authStore.isAdmin) {
    return navigateTo('/') // Redirige vers la page d'accueil
  }
})
