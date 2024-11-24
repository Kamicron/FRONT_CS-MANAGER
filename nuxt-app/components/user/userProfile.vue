<template>
  <div class="user-profile">
    <button @click="authStore.logout">Déconnexion</button>
    <div class="user-profile__profile">
      <p><span>{{ authStore.user.username }}</span> (Niveau : {{ authStore.user.level }})</p>
      <!-- <p v-if="authStore.user.isAdmin" class="admin-badge">Admin</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore'

const authStore = useAuthStore()
</script>

<style scoped lang="scss">
.user-profile {
  color: $color-text-main;
  display: flex;
  gap: $spacing-m;

  &__profile {
    display: flex;
    flex-direction: column;
  }
}

.user-profile span {
  font-weight: bold;
  color: $color-accent;
}

.admin-badge {
  font-size: 0.9rem;
  color: $color-accent;
}

button {
  background-color: $color-error;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  color: $color-text-main;
  cursor: pointer;
  color: $color-dark;
  transition: background-color 0.3s;
}

button:hover {
  background-color: $color-error-hover;
}
</style>
