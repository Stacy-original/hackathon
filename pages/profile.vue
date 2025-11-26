<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">Profile</h1>
      <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-2">Manage your account information</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Card -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white dark:bg-[#0E1117] rounded-lg shadow-sm border border-[#E2E8F0] dark:border-[#313B47] p-6">
          <h2 class="text-xl font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">Personal Information</h2>
          
          <div class="flex items-center gap-6 mb-6">
            <img 
              :src="user?.picture" 
              :alt="user?.name" 
              class="w-20 h-20 rounded-full border-2 border-[#E2E8F0] dark:border-[#313B47]"
            />
            <div>
              <h3 class="text-lg font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">{{ user?.name }}</h3>
              <p class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ user?.email }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-[#5A6A85] dark:text-[#A9B4C6] mb-1">First Name</label>
              <p class="text-[#1A1A1A] dark:text-[#F1F5FF] font-medium">{{ user?.given_name || 'Not provided' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#5A6A85] dark:text-[#A9B4C6] mb-1">Last Name</label>
              <p class="text-[#1A1A1A] dark:text-[#F1F5FF] font-medium">{{ user?.family_name || 'Not provided' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#5A6A85] dark:text-[#A9B4C6] mb-1">User ID</label>
              <p class="text-sm font-mono text-[#1A1A1A] dark:text-[#F1F5FF]">{{ user?.id }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#5A6A85] dark:text-[#A9B4C6] mb-1">Account Type</label>
              <p class="text-[#1A1A1A] dark:text-[#F1F5FF] font-medium">Google Account</p>
            </div>
          </div>
        </div>

        <!-- Session Information -->
        <div class="bg-white dark:bg-[#0E1117] rounded-lg shadow-sm border border-[#E2E8F0] dark:border-[#313B47] p-6">
          <h2 class="text-xl font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">Session Information</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">Login Method</span>
              <span class="text-[#1A1A1A] dark:text-[#F1F5FF] font-medium">Google OAuth</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">Status</span>
              <span class="inline-flex items-center gap-1">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                <span class="text-green-600 dark:text-green-400 font-medium">Active</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions Sidebar -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-[#0E1117] rounded-lg shadow-sm border border-[#E2E8F0] dark:border-[#313B47] p-6">
          <h3 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">Actions</h3>
          <div class="space-y-3">
            <button 
              @click="refreshProfile"
              class="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#5A6A85] dark:text-[#A9B4C6] hover:bg-[#F5F8FF] dark:hover:bg-[#313B47] rounded-md transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh Profile
            </button>
            <button 
              @click="signOut"
              class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Sign Out
            </button>
          </div>
        </div>

        <!-- Account Stats -->
        <div class="bg-white dark:bg-[#0E1117] rounded-lg shadow-sm border border-[#E2E8F0] dark:border-[#313B47] p-6">
          <h3 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">Account</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">Member since</span>
              <span class="text-[#1A1A1A] dark:text-[#F1F5FF] text-sm">{{ joinDate }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">Email verified</span>
              <span class="text-green-600 dark:text-green-400 text-sm">Yes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, signOut, checkAuthStatus } = useGoogleAuth()
import { computed, onMounted } from 'vue'
definePageMeta({
  middleware: 'auth'
})

const joinDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const refreshProfile = () => {
  checkAuthStatus()
  // You can add a toast notification here
  console.log('Profile refreshed')
}
onMounted(() => {
  refreshProfile()
})
</script>