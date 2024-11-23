<template>
  <div class="getAllUser">
    <!-- Bouton pour récupérer la liste des utilisateurs -->
    <button @click="fetchAllUsers">Voir tous les utilisateurs</button>

    <!-- Affichage des utilisateurs récupérés -->
    <div >
      <h3>Liste des utilisateurs :</h3>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.username }} - Niveau {{ user.level }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>

const errorMessage = ref('')

const user = ref(null)

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
</script>

<style lang='scss' scoped></style>