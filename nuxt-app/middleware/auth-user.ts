import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    await authStore.initializeFromToken()
  }

  if (!authStore.isAuthenticated) {
    return navigateTo('/') 
  }
})
