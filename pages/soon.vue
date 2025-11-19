<template>
  <div class="min-h-screen bg-[#F5F8FF] dark:bg-[#1A1F27] text-[#1A1A1A] dark:text-[#F1F5FF] flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- Main Content -->
      <h1 class="text-2xl font-bold mb-4">
        Coming Soon
      </h1>
      
      <p class="text-[#5A6A85] dark:text-[#A9B4C6] mb-8">
        We're working on this page. Check back later.
      </p>

      <!-- Back Home Button -->
      <NuxtLink 
        :to="homeUrl" 
        class="inline-flex items-center px-6 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] dark:bg-[#6CA8FF] dark:hover:bg-[#8CB9FF] text-white rounded-lg transition-colors duration-200 font-medium"
      >
        
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const homeUrl = computed(() => {
  if (locale.value === 'en') return '/'
  if (locale.value === 'ru') return '/ru/'
  if (locale.value === 'kk') return '/kk/'
  return '/'
});
</script>