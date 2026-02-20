<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-[#0E1117] dark:to-[#1A2A27] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <!-- Success Icon -->
      <div class="mx-auto w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-[#10B981] dark:to-[#059669] rounded-full flex items-center justify-center shadow-2xl mb-8 animate-bounce">
        <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <!-- Success Message -->
      <div class="space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-[#F1F5FF]">
          {{ $t('success') }}!
        </h1>
        <p class="text-xl text-gray-600 dark:text-[#A9B4C6]">
          {{ $t('successMessage') }}
        </p>
      </div>

      <!-- User Info Card -->
      <div v-if="user" class="bg-white dark:bg-[#1A1F27] rounded-2xl shadow-lg border border-gray-200 dark:border-[#313B47] p-6">
        <div class="flex items-center gap-4 mb-4">
          <img :src="user.picture" :alt="user.name" class="w-16 h-16 rounded-full border-2 border-green-200 dark:border-green-800" />
          <div class="text-left">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-[#F1F5FF]">{{ user.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-[#A9B4C6]">{{ user.email }}</p>
          </div>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-[#A9B4C6]">{{ $t('accountStatus') }}:</span>
          <span class="px-3 py-1 rounded-full text-sm font-medium" :class="roleBadgeClass">
            {{ roleText }}
          </span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="bg-white dark:bg-[#1A1F27] rounded-2xl shadow-lg border border-gray-200 dark:border-[#313B47] p-8">
        <div class="flex items-center justify-center gap-3">
          <div class="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-gray-600 dark:text-[#A9B4C6]">{{ $t('loadingUserData') }}</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4 pt-6">
        <NuxtLink 
          :to="homeUrl" 
          class="block w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-[#10B981] dark:to-[#059669] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold text-lg"
        >
          {{ $t('goToHomepage') }}
        </NuxtLink>
        
        <div class="grid grid-cols-2 gap-4">
          <NuxtLink 
            :to="profileUrl" 
            class="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
          >
            {{ $t('viewProfile') }}
          </NuxtLink>
          <button 
            @click="refreshAuth" 
            class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium"
          >
            {{ $t('refreshStatus') }}
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-3 gap-4 pt-8">
        <div class="text-center p-4 bg-white dark:bg-[#1A1F27] rounded-xl shadow-md">
          <div class="text-2xl font-bold text-green-500 dark:text-green-400">✓</div>
          <div class="text-sm text-gray-600 dark:text-[#A9B4C6] mt-1">{{ $t('authenticated') }}</div>
        </div>
        <div class="text-center p-4 bg-white dark:bg-[#1A1F27] rounded-xl shadow-md">
          <div class="text-2xl font-bold text-blue-500 dark:text-blue-400">🔒</div>
          <div class="text-sm text-gray-600 dark:text-[#A9B4C6] mt-1">{{ $t('secured') }}</div>
        </div>
        <div class="text-center p-4 bg-white dark:bg-[#1A1F27] rounded-xl shadow-md">
          <div class="text-2xl font-bold text-purple-500 dark:text-purple-400">👤</div>
          <div class="text-sm text-gray-600 dark:text-[#A9B4C6] mt-1">{{ $t('active') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, isAuthenticated, checkAuthStatus, refreshUserRole } = useGoogleAuth()
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const roleText = computed(() => {
  if (!user.value?.role) return 'User'
  switch (user.value.role) {
    case 0: return 'User'
    case 1: return 'Editor'
    case 2: return 'Admin'
    default: return 'User'
  }
})

const homeUrl = computed(() => {
  if (locale.value === 'en') return '/'
  if (locale.value === 'ru') return '/ru/'
  if (locale.value === 'kk') return '/kk/'
  return '/'
});
const profileUrl = computed(() => {
  if (locale.value === 'en') return '/profile'
  if (locale.value === 'ru') return '/ru/profile'
  if (locale.value === 'kk') return '/kk/profile'
  return '/profile'
});
const termsUrl = computed(() => {
  if (locale.value === 'en') return '/terms'
  if (locale.value === 'ru') return '/ru/terms'
  if (locale.value === 'kk') return '/kk/terms'
  return '/terms'
});

const roleBadgeClass = computed(() => {
  if (!user.value?.role) return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  switch (user.value.role) {
    case 0: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    case 1: return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
    case 2: return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }
})

// Refresh auth status
const refreshAuth = async () => {
  console.log('🔄 Refreshing authentication status...')
  await checkAuthStatus()
  await refreshUserRole()
  console.log('✅ Authentication status refreshed')
}

// Auto-refresh on page load
onMounted(async () => {
  console.log('🎉 Success page mounted, refreshing auth state...')
  await refreshAuth()
  
  // Auto-redirect to home after 5 seconds
//   setTimeout(() => {
//     if (isAuthenticated.value) {
//       console.log('🔄 Auto-redirecting to homepage...')
//       navigateTo('/')
//     }
//   }, 5000)
})

// Add translations
const { $i18n } = useNuxtApp()

// English translations
$i18n.mergeLocaleMessage('en', {
  success: 'Success',
  successMessage: 'You have successfully signed in to your account',
  accountStatus: 'Account Status',
  loadingUserData: 'Loading user data...',
  goToHomepage: 'Go to Homepage',
  viewProfile: 'View Profile',
  refreshStatus: 'Refresh Status',
  authenticated: 'Authenticated',
  secured: 'Secured',
  active: 'Active'
})

// Russian translations
$i18n.mergeLocaleMessage('ru', {
  success: 'Успех',
  successMessage: 'Вы успешно вошли в свой аккаунт',
  accountStatus: 'Статус аккаунта',
  loadingUserData: 'Загрузка данных пользователя...',
  goToHomepage: 'На главную страницу',
  viewProfile: 'Профиль',
  refreshStatus: 'Обновить статус',
  authenticated: 'Аутентифицирован',
  secured: 'Защищено',
  active: 'Активен'
})

// Kazakh translations
$i18n.mergeLocaleMessage('kk', {
  success: 'Сәтті',
  successMessage: 'Сіз өз аккаунтыңызға сәтті кірдіңіз',
  accountStatus: 'Аккаунт күйі',
  loadingUserData: 'Пайдаланушы деректері жүктелуде...',
  goToHomepage: 'Басты бетке өту',
  viewProfile: 'Профильді қарау',
  refreshStatus: 'Күйді жаңарту',
  authenticated: 'Аутентификацияланған',
  secured: 'Қорғалған',
  active: 'Белсенді'
})
</script>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>