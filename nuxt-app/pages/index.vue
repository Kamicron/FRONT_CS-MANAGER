<template>
  <div>
    <h2>Login</h2>

    <div v-if="isAuthenticated">
      <p>Vous êtes connecté en tant que {{ user?.username }}.</p>
      <p>Vous êtes level {{ user?.level }}</p>
      <p v-if="user?.isAdmin">Vous êtes admin</p>
      <button @click="logout">Déconnexion</button>

      <!-- Bouton pour récupérer la liste des utilisateurs -->
      <button @click="fetchAllUsers">Voir tous les utilisateurs</button>

      <!-- Affichage des utilisateurs récupérés -->
      <div v-if="users.length">
        <h3>Liste des utilisateurs :</h3>
        <ul>
          <li v-for="user in users" :key="user.id">
            {{ user.username }} - Niveau {{ user.level }}
          </li>
        </ul>
      </div>
    </div>

    <form v-else @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <get-user-id />

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isAuthenticated = ref(false)
const user = ref(null)
const users = ref([]) // Nouvelle propriété pour stocker la liste des utilisateurs

// Fonction pour décoder le token
function decodeToken(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
  return JSON.parse(jsonPayload)
}

// Récupérer les informations de l'utilisateur si connecté
const fetchUserData = async () => {
  if (process.client) {
    const token = localStorage.getItem('access_token')
    if (token) {
      const userId = decodeToken(token).sub
      user.value = await $fetch(`http://localhost:3000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      isAuthenticated.value = true
    }
  }
}

// Récupérer la liste de tous les utilisateurs
const fetchAllUsers = async () => {
  if (process.client) {
    const token = localStorage.getItem('access_token')
    if (token) {
      try {
        users.value = await $fetch('http://localhost:3000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        errorMessage.value = 'Impossible de récupérer la liste des utilisateurs.'
      }
    }
  }
}

const login = async () => {
  try {
    const response = await $fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    })

    if (response.access_token && process.client) {
      localStorage.setItem('access_token', response.access_token)
      await fetchUserData() // Charger les données utilisateur
    }
  } catch (error) {
    errorMessage.value = 'Erreur de login. Veuillez vérifier vos identifiants.'
  }
}

const logout = () => {
  if (process.client) {
    localStorage.removeItem('access_token')
    isAuthenticated.value = false
    user.value = null
    users.value = [] // Réinitialiser la liste des utilisateurs lors de la déconnexion
  }
}

// Initialisation côté client pour éviter l’erreur de rendu côté serveur
onMounted(() => {
  if (process.client && localStorage.getItem('access_token')) {
    fetchUserData()
  }
})
</script>

<style scoped>
.error {
  color: red;
}
</style>
