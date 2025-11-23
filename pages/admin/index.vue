<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
          Admin Dashboard
        </h1>
        <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6] max-w-2xl mx-auto">
          Manage users, posts, and system settings
        </p>
      </div>

      <!-- Admin Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
          <h3 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">Total Users</h3>
          <p class="text-3xl font-bold text-[#1E6DFF]">{{ stats.totalUsers }}</p>
        </div>
        <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
          <h3 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">Pending Posts</h3>
          <p class="text-3xl font-bold text-[#FFCB2F]">{{ stats.pendingPosts }}</p>
        </div>
        <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
          <h3 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">Reports</h3>
          <p class="text-3xl font-bold text-[#2ECC71]">{{ stats.totalReports }}</p>
        </div>
      </div>

      <!-- User Info -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47] mb-8">
        <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">User Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center space-x-4">
            <img 
              :src="authStore.user?.photo" 
              :alt="authStore.user?.name"
              class="w-16 h-16 rounded-full"
            />
            <div>
              <h3 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ authStore.user?.name }}</h3>
              <p class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ authStore.user?.email }}</p>
              <p class="text-sm text-[#1E6DFF] font-medium">Role: {{ authStore.user?.role }}</p>
            </div>
          </div>
          <div class="flex items-center justify-end space-x-4">
            <button
              @click="goToEdit"
              class="px-6 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-colors"
            >
              Create Post
            </button>
            <button
              @click="authStore.logout"
              class="px-6 py-3 border border-[#E2E8F0] dark:border-[#313B47] text-[#5A6A85] dark:text-[#A9B4C6] rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-[#1A1F27] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
        <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-6">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            @click="goToEdit"
            class="p-4 bg-[#F5F8FF] dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:border-[#1E6DFF] transition-colors text-left"
          >
            <div class="w-10 h-10 bg-[#1E6DFF] rounded-lg flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-1">Create Post</h3>
            <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">Create a new community post</p>
          </button>

          <button
            @click="goToDashboard"
            class="p-4 bg-[#F5F8FF] dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:border-[#1E6DFF] transition-colors text-left"
          >
            <div class="w-10 h-10 bg-[#2ECC71] rounded-lg flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-1">Dashboard</h3>
            <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">View your dashboard</p>
          </button>

          <button
            @click="viewReports"
            class="p-4 bg-[#F5F8FF] dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:border-[#1E6DFF] transition-colors text-left"
          >
            <div class="w-10 h-10 bg-[#FFCB2F] rounded-lg flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-1">View Reports</h3>
            <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">Check water condition reports</p>
          </button>

          <button
            @click="manageUsers"
            class="p-4 bg-[#F5F8FF] dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:border-[#1E6DFF] transition-colors text-left"
          >
            <div class="w-10 h-10 bg-[#FF4E4E] rounded-lg flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-1">Manage Users</h3>
            <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">User management panel</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();

// Stats data
const stats = ref({
  totalUsers: 0,
  pendingPosts: 0,
  totalReports: 0
});

// Navigation methods
const goToEdit = () => {
  navigateTo('/edit');
};

const goToDashboard = () => {
  navigateTo('/dashboard');
};

const viewReports = () => {
  navigateTo('/reports');
};

const manageUsers = () => {
  // Will implement user management later
  alert('User management feature coming soon!');
};

// Fetch admin stats
onMounted(async () => {
  // Check if user is admin
  if (authStore.user?.role !== 'admin') {
    // Redirect non-admin users to dashboard
    navigateTo('/dashboard');
    return;
  }
  
  // TODO: Fetch actual stats from backend
  stats.value = {
    totalUsers: 42,
    pendingPosts: 5,
    totalReports: 128
  };
});
</script>