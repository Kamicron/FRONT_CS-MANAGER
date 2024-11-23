<template>
  <div class="user-list">
    <button @click="fetchAllUsers">Voir tous les utilisateurs</button>
    <DynamicTable
    :columns="columns"
    :rows="rows"
    :initial-sort="initialSort"
    :initial-filters="initialFilters"
    @update:filters="handleFilters"
    @update:sort="handleSort"
    @clickRow="handleRowClick"
  />

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
      console.log('users', users);

      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Erreur de récupération des utilisateurs.'
    }
  }
}

const clickedRow = (id: string | number) => {
  console.log('Row clicked, ID:', id); // Vérifie si l'ID est bien affiché
};


const initialSort = { column: 'name', order: 'asc' };
const initialFilters = { name: '' };

const handleFilters = filters => {
  console.log('Filtres mis à jour :', filters);
};

const handleSort = sort => {
  console.log('Tri mis à jour :', sort);
};
</script>

<style scoped lang="scss">
.user-list {
  margin: 1rem 0;
}

.error {
  color: red;
}
</style>
