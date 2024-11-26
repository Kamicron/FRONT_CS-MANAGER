<template>
  <div class="getAllUser">
    <button @click="fetchAllUsers">Voir tous les utilisateurs</button>

    <div v-if="users.length > 0">
      <h3>Liste des utilisateurs :</h3>
      <ul>
        <li v-for="user in users">
          {{ user.username }} - Niveau {{ user.level }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun utilisateur trouvé.</p>
    </div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
const users = ref<IUser[]>([])

const errorMessage = ref<string>('')

const fetchAllUsers = async () => {
  if (process.client) { 
    const token = localStorage.getItem('access_token') 
    if (token) {
      try {
        const response = await $fetch<IUser[]>('http://localhost:3000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        users.value = response 
      } catch (error) {
        console.error(error)
        errorMessage.value = 'Impossible de récupérer la liste des utilisateurs.'
      }
    } else {
      errorMessage.value = 'Token non trouvé. Veuillez vous reconnecter.'
    }
  }
}
</script>

<style lang="scss" scoped>
.getAllUser {
  &__button {
    margin-bottom: 1rem;
  }

  &__error {
    color: red;
    margin-top: 1rem;
  }
}
</style>