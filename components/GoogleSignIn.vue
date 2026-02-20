<template>
  <div class="google-auth">
    <div ref="googleButtonRef" class="google-button-container"></div>
    
    <div v-if="isAuthenticated" class="user-info mt-4 p-4 bg-green-50 rounded-lg">
      <img :src="user?.picture" :alt="user?.name" class="user-avatar" />
      <span class="text-green-800">Welcome, {{ user?.name }}! Redirecting...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const googleButtonRef = ref<HTMLElement>()
const { user, isAuthenticated, signIn, renderGoogleButton } = useGoogleAuth()

onMounted(async () => {
  await signIn()
  
  if (googleButtonRef.value) {
    // Wait for next tick to ensure DOM is ready
    nextTick(() => {
      renderGoogleButton(googleButtonRef.value!)
    })
  }
})
</script>

<style scoped>
.google-button-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>