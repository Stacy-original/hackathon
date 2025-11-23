<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
          My Dashboard
        </h1>
        <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6] max-w-2xl mx-auto">
          Welcome back, {{ authStore.user?.name }}! Here's your activity overview.
        </p>
      </div>

      <!-- User Info Card -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47] mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <img 
              :src="authStore.user?.photo" 
              :alt="authStore.user?.name"
              class="w-16 h-16 rounded-full"
            />
            <div>
              <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ authStore.user?.name }}</h2>
              <p class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ authStore.user?.email }}</p>
              <p class="text-sm font-medium" :class="authStore.user?.role === 'admin' ? 'text-[#FF4E4E]' : 'text-[#1E6DFF]'">
                {{ authStore.user?.role?.toUpperCase() }}
              </p>
            </div>
          </div>
          <div class="flex space-x-4">
            <button
              @click="goToEdit"
              class="px-6 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-colors"
            >
              Create Post
            </button>
            <button
              v-if="authStore.user?.role === 'admin'"
              @click="goToAdmin"
              class="px-6 py-3 bg-[#FF4E4E] hover:bg-[#DC2626] text-white rounded-lg font-medium transition-colors"
            >
              Admin Panel
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
          <h3 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">My Posts</h3>
          <p class="text-3xl font-bold text-[#1E6DFF]">{{ userStats.myPosts }}</p>
        </div>
        <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
          <h3 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">Reports Made</h3>
          <p class="text-3xl font-bold text-[#2ECC71]">{{ userStats.reportsMade }}</p>
        </div>
        <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
          <h3 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">Member Since</h3>
          <p class="text-3xl font-bold text-[#FFCB2F]">{{ userStats.memberSince }}</p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
        <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-6">Recent Activity</h2>
        <div class="space-y-4">
          <div 
            v-for="activity in recentActivity" 
            :key="activity.id"
            class="flex items-center space-x-4 p-4 bg-[#F5F8FF] dark:bg-[#1A1F27] rounded-lg"
          >
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center', activity.bgColor]">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="activity.icon"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ activity.title }}</h3>
              <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">{{ activity.description }}</p>
            </div>
            <span class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">{{ activity.time }}</span>
          </div>
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

// User stats
const userStats = ref({
  myPosts: 0,
  reportsMade: 0,
  memberSince: '2024'
});

// Recent activity
const recentActivity = ref([
  {
    id: 1,
    title: 'Account Created',
    description: 'You joined SKO GeoHydro Portal',
    time: 'Just now',
    bgColor: 'bg-[#1E6DFF]',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    id: 2,
    title: 'First Login',
    description: 'Successfully authenticated with Google',
    time: '2 min ago',
    bgColor: 'bg-[#2ECC71]',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
]);

// Navigation methods
const goToEdit = () => {
  navigateTo('/edit');
};

const goToAdmin = () => {
  navigateTo('/admin');
};

// Initialize dashboard data
onMounted(async () => {
  // TODO: Fetch user-specific stats from backend
  userStats.value = {
    myPosts: 3,
    reportsMade: 7,
    memberSince: '2024'
  };
});
</script>