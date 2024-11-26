import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const isAdmin = ref(false)
  const user = ref<IUser | null>()

  const fetchUserData = async () => {
    // if (process.client) { // Vérifie si on est côté client
    //   const token = localStorage.getItem('access_token')
    //   if (token) {
    //     try {
    //       const decoded = JSON.parse(atob(token.split('.')[1]))

    //       console.log('decoded', decoded);
          
    //       user.value = await $fetch(`http://localhost:3000/users/${decoded.sub}`, {
    //         headers: { Authorization: `Bearer ${token}` },
    //       })
  
    //       isAdmin.value = user.value.isAdmin // Vérifie si l'utilisateur est admin
    //       isAuthenticated.value = true
    //     } catch (error) {
    //       console.error('Erreur lors de la récupération des données utilisateur :', error)
    //       logout() // Nettoie en cas d'erreur
    //     }
    //   }
    // }
  }
  
  const initializeFromToken = () => {
    const token = process.client ? localStorage.getItem('access_token') : null
    console.log('token', token);
    
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])) // Décodage du payload du JWT
        isAuthenticated.value = true
        console.log('isAuthentificated.value', isAuthenticated.value);
        
        isAdmin.value = decoded.isAdmin || false // Récupère l'information "isAdmin"
        console.log('decoded', decoded)
        user.value = { username: decoded.username, level: decoded.level, _id:decoded.sub } // Stocke d'autres données utiles
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error)
        logout()
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

  const serverInitialize = async () => {
    if (process.server) {
      const token = useRequestHeaders()['cookie']?.split('access_token=')[1]
      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split('.')[1]))
          isAuthenticated.value = true
          isAdmin.value = decoded.isAdmin || false
          user.value = { username: decoded.username, level: decoded.level }
        } catch (error) {
          console.error('Erreur lors de l\'initialisation côté serveur:', error)
        }
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    isAuthenticated.value = false
    isAdmin.value = false
    user.value = null
  }

  return {
    isAuthenticated,
    isAdmin,
    user,
    fetchUserData,
    serverInitialize,
    initializeFromToken,
    login,
    logout,
  }
})
