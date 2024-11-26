<template>
  <slot-modal v-model="isModalOpen" title="Titre de la modal">
    <login-form @validate="isModalOpen=false"/>
  </slot-modal>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Boolean, default: false }
});
const emit = defineEmits(['update:modelValue']);
const isModalOpen = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  isModalOpen.value = newVal;
}, { immediate: true });

watch(isModalOpen, (newVal) => {
  emit('update:modelValue', newVal);
});
</script>


<style lang='scss' scoped></style>