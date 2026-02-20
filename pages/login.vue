<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-[#0E1117] dark:to-[#1A1F27] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto w-24 h-24 bg-gradient-to-br from-[#1E6DFF] to-[#4DA3FF] dark:from-[#1458CC] dark:to-[#1E6DFF] rounded-2xl flex items-center justify-center shadow-xl mb-6">
          <span class="text-4xl text-white">🔐</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-[#F1F5FF] mb-2">
          {{ $t('signIn') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-[#A9B4C6]">
          {{ $t('signInDescription') }}
        </p>
      </div>

      <!-- Login Card -->
      <div class="bg-white dark:bg-[#1A1F27] rounded-2xl shadow-xl border border-gray-200 dark:border-[#313B47] p-8">
        <!-- Google Sign In -->
        <div class="mb-6">
          <GoogleSignIn />
        </div>

        <!-- Divider -->
        <div class="relative mb-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-[#313B47]"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white dark:bg-[#1A1F27] text-gray-500 dark:text-[#A9B4C6]">
              {{ $t('secureAuthentication') }}
            </span>
          </div>
        </div>

        <!-- Features -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p class="text-sm text-gray-600 dark:text-[#A9B4C6]">
              {{ $t('secureAccess') }}
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <p class="text-sm text-gray-600 dark:text-[#A9B4C6]">
              {{ $t('encryptedData') }}
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <p class="text-sm text-gray-600 dark:text-[#A9B4C6]">
              {{ $t('roleBasedAccess') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="text-center">
        <p class="text-sm text-gray-500 dark:text-[#A9B4C6]">
          {{ $t('needHelp') }}
          <a href="#" class="text-[#1E6DFF] dark:text-[#6CA8FF] hover:underline font-medium">
            {{ $t('contactSupport') }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default', // Use the default layout instead of false
  middleware: 'auth'
})

// Add translations
const { $i18n } = useNuxtApp()

// English translations
$i18n.mergeLocaleMessage('en', {
  signIn: 'Sign In',
  signInDescription: 'Access your water monitoring dashboard',
  secureAuthentication: 'Secure Authentication',
  secureAccess: 'Secure access to water monitoring data',
  encryptedData: 'Encrypted data protection',
  roleBasedAccess: 'Role-based access control',
  needHelp: 'Need help signing in?',
  contactSupport: 'Contact Support'
})

// Russian translations
$i18n.mergeLocaleMessage('ru', {
  signIn: 'Войти',
  signInDescription: 'Доступ к панели мониторинга воды',
  secureAuthentication: 'Безопасная аутентификация',
  secureAccess: 'Безопасный доступ к данным мониторинга воды',
  encryptedData: 'Защита данных с шифрованием',
  roleBasedAccess: 'Контроль доступа на основе ролей',
  needHelp: 'Нужна помощь при входе?',
  contactSupport: 'Связаться с поддержкой'
})

// Kazakh translations
$i18n.mergeLocaleMessage('kk', {
  signIn: 'Кіру',
  signInDescription: 'Су мониторингі панеліне қол жеткізу',
  secureAuthentication: 'Қауіпсіз аутентификация',
  secureAccess: 'Су мониторингі деректеріне қауіпсіз қол жеткізу',
  encryptedData: 'Шифрленген деректерді қорғау',
  roleBasedAccess: 'Рөлге негізделген қатынау бақылауы',
  needHelp: 'Кіру кезінде көмек керек пе?',
  contactSupport: 'Қолдау қызметіне хабарласыңыз'
})
</script>

<style scoped>
/* Add smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}
</style>