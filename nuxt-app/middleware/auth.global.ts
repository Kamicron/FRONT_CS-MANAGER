import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()

  if (process.server) {
    await authStore.serverInitialize()
  }

  if (process.client) {
    authStore.initializeFromToken()
  }
})
