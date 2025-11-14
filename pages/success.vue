<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F5F8FF] dark:bg-[#1A1F27]">
    <div class="text-center">
      <div class="text-6xl mb-4">✅</div>
      <h1 class="text-3xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
        Report Submitted Successfully!
      </h1>
      <p class="text-[#5A6A85] dark:text-[#A9B4C6] mb-8">
        Thank you for your contribution to water quality monitoring.
      </p>
      <NuxtLink 
        to="/reports" 
        class="px-6 py-3 bg-[#1E6DFF] text-white rounded-lg hover:bg-[#1458CC] transition-colors"
      >
        Submit Another Report
      </NuxtLink>
    </div>
  </div>
</template>