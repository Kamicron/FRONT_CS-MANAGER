<template>
  <div class="user-list">
    <div v-if="users.length">
      <DynamicTable :columns="columns" :rows="rows" :rowsPerPage="10" @refresh="fetchAllUsers" @clickRow="clickedRow" />
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const users = ref([])
const errorMessage = ref('')

const columns = [
  { key: 'username', title: 'Nom utilisateur', width: '25%' },
  { key: 'level', title: 'Niveau', width: '15%' },
  { key: 'created_at', title: 'Date de création', width: '30%' },
  { key: 'last_login', title: 'Dernière connexion', width: '30%' },
]

const rows = computed(() =>
  users.value.map((user) => ({
    id: user._id,
    backgroundColor: user.isAdmin
      ? '#e3f2fd' // Bleu pâle
      : user.deleted_at
        ? '#fdecea' // Rouge pâle
        : '#e8f5e9', // Vert pâle
    cells: {
      username: { display: user.username, title: 'Nom utilisateur' },
      level: { display: user.level.toString(), title: 'Niveau de l’utilisateur' },
      created_at: {
        display: user.created_at ? new Date(user.created_at).toLocaleString() : 'Inconnue',
        title: 'Date de création',
      },
      last_login: {
        display: user.last_login ? new Date(user.last_login).toLocaleString() : 'Jamais connecté',
        title: 'Dernière connexion',
      },
    },
  }))
)

const fetchAllUsers = async () => {
  const token = localStorage.getItem('access_token')
  if (token) {
    try {
      users.value = await $fetch('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log('users', users)

      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Erreur de récupération des utilisateurs.'
    }
  }
}

// Appelle fetchAllUsers lors du montage du composant
onMounted(() => {
  fetchAllUsers()
})

const clickedRow = (id: string | number) => {
  console.log('Row clicked, ID:', id) // Affiche l'ID de la ligne cliquée
}
</script>

<style scoped lang="scss">
.user-list {
  margin: 1rem 0;
}

.error {
  color: red;
}
</style>
