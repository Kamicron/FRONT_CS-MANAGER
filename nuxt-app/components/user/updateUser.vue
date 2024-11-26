<template>
  <div>
    <form @submit.prevent="updateUser">
      <div>
        <label for="username">Nouveau nom d'utilisateur</label>
        <input type="text" v-model="formData.username" id="username" placeholder="Nom d'utilisateur" />
      </div>

      <div>
        <label for="currentPassword">Mot de passe actuel</label>
        <input type="password" v-model="formData.currentPassword" id="currentPassword" placeholder="Mot de passe actuel" />
      </div>

      <div>
        <label for="newPassword">Nouveau mot de passe</label>
        <input type="password" v-model="formData.newPassword" id="newPassword" placeholder="Nouveau mot de passe" />
      </div>

      <div>
        <label for="confirmPassword">Confirmer le mot de passe</label>
        <input type="password" v-model="formData.confirmPassword" id="confirmPassword" placeholder="Confirmer le mot de passe" />
      </div>

      <button type="submit">Mettre à jour</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore'

const authStore = useAuthStore()

const props = defineProps({
  userId: { type: String, default: "" },
});


const formData = ref({
  username: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const errorMessage = ref("");
const successMessage = ref("");

const updateUser = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (formData.value.newPassword && formData.value.newPassword !== formData.value.confirmPassword) {
    errorMessage.value = "Les mots de passe ne correspondent pas.";
    return;
  }

  try {
    const token = localStorage.getItem("access_token");
    const body: Record<string, string> = { currentPassword: formData.value.currentPassword };

    if (formData.value.username) body.username = formData.value.username;
    if (formData.value.newPassword) body.newPassword = formData.value.newPassword;

    const response = await $fetch(`http://localhost:3000/users/${props.userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (formData.value.username) {
      authStore.user.username = formData.value.username; // Mise à jour du store
    }

    successMessage.value = "Profil mis à jour avec succès.";
  } catch (error) {
    errorMessage.value = error.message || "Une erreur s'est produite.";
  }
};
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
