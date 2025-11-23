<!-- layouts/auth-loader.vue -->
<template>
  <div>
    <!-- Global auth loading overlay -->
    <div 
      v-if="showGlobalLoader" 
      class="fixed inset-0 bg-white dark:bg-[#1A1F27] flex items-center justify-center z-50 transition-opacity duration-300"
    >
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E6DFF] mb-4"></div>
        <p class="text-[#5A6A85] dark:text-[#A9B4C6]">Loading your session...</p>
      </div>
    </div>
    
    <!-- Main content -->
    <div :class="{'opacity-0': showGlobalLoader, 'opacity-100': !showGlobalLoader, 'transition-opacity duration-300': true}">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const route = useRoute();

// Show global loader only during initial app auth check
const showGlobalLoader = ref(true);

onMounted(async () => {
  console.log('🚀 App mounted - initializing auth...');
  
  // Initialize auth when app starts
  if (!authStore.initialized) {
    try {
      await authStore.initializeAuth();
      console.log('✅ Auth initialization completed');
    } catch (error) {
      console.error('❌ Auth initialization failed:', error);
    }
  }
  
  // Hide global loader after a brief delay to ensure smooth transition
  setTimeout(() => {
    showGlobalLoader.value = false;
  }, 500);
});

// Watch for route changes to handle auth on navigation
watch(() => route.path, (newPath) => {
  console.log('🔄 Route changed to:', newPath);
  
  // Re-check auth for protected routes
  if (newPath.includes('/dashboard') || newPath.includes('/admin')) {
    authStore.checkAuth();
  }
});
</script>