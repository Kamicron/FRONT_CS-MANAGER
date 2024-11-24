<template>
  <transition name="modal-fade">
    <div v-if="isVisible" class="modal-overlay" @click="handleOutsideClick">
      <transition name="modal-zoom">
        <div class="modal" @click.stop :style="`max-width: ${maxWidth}`">
          <header class="modal__header">
            <h2 class="modal__header--title">{{ title }}</h2>
            <button class="modal__header--close" @click="closeModal"><i
                class="fa-duotone fa-regular fa-xmark"></i></button>
          </header>
          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  maxWidth : {
    type: String,
    default: '300px'
  }
});

const emit = defineEmits(["update:modelValue"]);

const isVisible = ref(true);

watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal;
}, {immediate: true});

function closeModal() {
  isVisible.value = false;
  emit("update:modelValue", false);
}

function handleOutsideClick() {
  closeModal();
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.modal-overlay.modal-fade-enter-active,
.modal-overlay.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-overlay.modal-fade-enter-from,
.modal-overlay.modal-fade-leave-to {
  opacity: 0;
}

.modal {
  background: $color-primary;
  max-width: 600px;
  width: 90%;
  max-height: 80%;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transform: scale(1);
  opacity: 1;
}

.modal.modal-zoom-enter-active,
.modal.modal-zoom-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal.modal-zoom-enter-from,
.modal.modal-zoom-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #4e4e4e;

  &--title {
    margin: 0;
    font-size: 1.2rem;
  }

  &--close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: white
  }
}

.modal-content {
  padding: 16px;
}
</style>
