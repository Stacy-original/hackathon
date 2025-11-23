<!-- components/AuthStatus.vue -->
<template>
  <div class="fixed top-4 right-4 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow-lg border border-yellow-300 max-w-sm z-[6000]">
    <h3 class="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Auth Debug</h3>
    <div class="text-sm space-y-1">
      <p><strong>Authenticated:</strong> {{ authStore.isAuthenticated ? '✅' : '❌' }}</p>
      <p><strong>User:</strong> {{ authStore.user?.name || 'None' }}</p>
      <p><strong>Role:</strong> {{ authStore.user?.role || 'None' }}</p>
      <p><strong>Initialized:</strong> {{ authStore.initialized ? '✅' : '❌' }}</p>
      <p><strong>Loading:</strong> {{ authStore.isLoading ? '🔄' : '✅' }}</p>
    </div>
    <div class="flex gap-2 mt-2">
      <button 
        @click="authStore.checkAuth()" 
        class="flex-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors"
      >
        Check Auth
      </button>
      <button 
        @click="authStore.logout()" 
        class="flex-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs transition-colors"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
</script>