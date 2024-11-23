import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)

  const fetchUserData = async () => {
    const token = localStorage.getItem('access_token')
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        user.value = await $fetch(`http://localhost:3000/users/${decoded.sub}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        isAuthenticated.value = true
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error)
        logout() // Nettoie en cas d'erreur
      }
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await $fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: { username, password },
      })
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token)
        await fetchUserData()
      }
    } catch (error) {
      throw new Error('Erreur de connexion')
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    isAuthenticated.value = false
    user.value = null
  }

  return {
    isAuthenticated,
    user,
    fetchUserData,
    login,
    logout,
  }
})
