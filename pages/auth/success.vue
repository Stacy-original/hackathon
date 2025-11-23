<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F5F8FF] dark:bg-[#1A1F27]">
    <div class="max-w-md w-full bg-white dark:bg-[#212832] rounded-2xl p-8 shadow-lg border border-[#E2E8F0] dark:border-[#313B47] text-center">
      <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h1 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
        Authentication Successful!
      </h1>
      
      <p class="text-[#5A6A85] dark:text-[#A9B4C6] mb-6">
        You have successfully signed in to your account.
      </p>

      <div v-if="authStore.user" class="mb-6">
        <img 
          :src="authStore.user.photo" 
          :alt="authStore.user.name"
          class="w-16 h-16 rounded-full mx-auto mb-3"
        />
        <h2 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF]">
          {{ authStore.user.name }}
        </h2>
        <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
          {{ authStore.user.email }}
        </p>
      </div>

      <div class="flex gap-3">
        <button
          @click="goHome"
          class="flex-1 px-4 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-colors"
        >
          Go Home
        </button>
        <button
          @click="goToDashboard"
          class="flex-1 px-4 py-2 bg-[#2ECC71] hover:bg-[#27AE60] text-white rounded-lg font-medium transition-colors"
        >
          Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

onMounted(async () => {
  // Check auth status
  await authStore.checkAuth();
  
  // Redirect to home after 3 seconds if user doesn't click anything
  setTimeout(() => {
    navigateTo('/');
  }, 3000);
});

const goHome = () => {
  navigateTo('/');
};

const goToDashboard = () => {
  navigateTo('/dashboard');
};
</script>