<template>
  <transition name="fade">
    <div v-if="isVisible" class="message-modal-overlay" @click.self="closeModal">
      <div class="message-modal-content">
        <h3 class="modal-title">{{ title }}</h3>
        <p class="modal-message">{{ message }}</p>
        <button class="modal-close-button" @click="closeModal">OK</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MessageModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Notification',
    },
    message: {
      type: String,
      default: 'This is a custom message.',
    },
  },
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false); // Emit event to update parent prop
    },
  },
};
</script>

<style scoped>
.message-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's above other content */
}

.message-modal-content {
  background: linear-gradient(135deg, #1A202C 0%, #2D3748 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  max-width: 400px;
  width: 90%;
  text-align: center;
  border: 1px solid rgba(212, 175, 55, 0.3);
  position: relative;
  overflow: hidden;
}

.modal-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #D4AF37; /* Gold color */
  margin-bottom: 15px;
}

.modal-message {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 25px;
  color: rgba(255, 255, 255, 0.9);
}

.modal-close-button {
  background: linear-gradient(135deg, #D4AF37 0%, #F5D033 100%);
  border: none;
  padding: 10px 25px;
  border-radius: 6px;
  color: #1A202C;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.modal-close-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* Transition styles */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
