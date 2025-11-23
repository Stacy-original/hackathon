<template>
  <div class="overscroll-none font-sans transition-colors duration-300">
    <!-- Global auth loader -->
    <div 
      v-if="showGlobalLoader" 
      class="fixed inset-0 bg-white dark:bg-[#1A1F27] flex items-center justify-center z-[6000] transition-opacity duration-300"
    >
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E6DFF] mb-4"></div>
        <p class="text-[#5A6A85] dark:text-[#A9B4C6]">Loading your session...</p>
      </div>
    </div>
    
    <!-- Main content -->
    <div :class="{'opacity-0': showGlobalLoader, 'opacity-100': !showGlobalLoader, 'transition-opacity duration-300': true}">
      <header class="z-[5000] sm:fixed flex flex-row w-full max-sm:justify-between min-h-16 max-sm:relative overscroll-none bg-[#FFFFFF] dark:bg-[#0E1117] border-b border-[#E2E8F0] dark:border-[#313B47]">
        <Sidebar :sidebar="sidebar" @update:sidebar="sidebar = $event" @close-sidebar="sidebar = false"/>
        <div class="flex-1 flex items-center justify-start px-8 max-sm:px-4 max-sm:flex-initial select-none">
          <NuxtLink :to="homeUrl">
            <img v-if="colorMode.value === 'light'" src="/assets/images/logoblack.png" class="w-36 h-16" alt="Logo"/>
            <img v-else src="/assets/images/logowhite.png" class="w-36 h-16" alt="Logo"/>
          </NuxtLink>
        </div>
        
        <!-- Buttons Container -->
        <div class="flex items-center max-sm:gap-2 sm:gap-0 max-sm:pr-4">
          <!-- Language Switcher Button -->
          <div class="px-3 py-2 flex items-center justify-center bg-[#F5F8FF] dark:bg-[#1A1F27] hover:bg-[#E2E8F0] dark:hover:bg-[#313B47] cursor-pointer border border-[#E2E8F0] dark:border-[#313B47] rounded-3xl transition-colors max-sm:mx-1 sm:mx-2 my-2" @click="switchLanguage">
            <span class="text-sm font-medium text-[#5A6A85] dark:text-[#A9B4C6]">
              {{ currentLanguage }}
            </span>
          </div>
          
          <!-- Theme Toggle Button -->
          <div class="px-3 py-2 flex items-center justify-center bg-[#F5F8FF] dark:bg-[#1A1F27] hover:bg-[#E2E8F0] dark:hover:bg-[#313B47] cursor-pointer border border-[#E2E8F0] dark:border-[#313B47] rounded-3xl transition-colors max-sm:mx-1 sm:mx-4 my-2" @click="toggleTheme">
            <span class="text-xl">
              <svg v-if="colorMode.value === 'dark'" class="w-5 h-5 text-[#F1F5FF]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
              </svg>
              <svg v-else class="w-5 h-5 text-[#5A6A85]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
              </svg>
            </span>
          </div>

          <!-- Auth Button -->
          <div class="flex items-center max-sm:mx-1 sm:mx-2 my-2">
            <div v-if="authStore.isAuthenticated && authStore.user" class="flex items-center gap-3">
              <!-- User Avatar and Name -->
              <div class="flex items-center gap-2 px-3 py-2 bg-[#F5F8FF] dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-3xl">
                <img 
                  :src="authStore.user.photo" 
                  :alt="authStore.user.name"
                  class="w-6 h-6 rounded-full"
                />
                <span class="text-sm font-medium text-[#5A6A85] dark:text-[#A9B4C6] max-sm:hidden">
                  {{ authStore.user.name }}
                </span>
              </div>
              <!-- Logout Button -->
              <button
                @click="authStore.logout"
                class="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                Logout
              </button>
            </div>
            <button
              v-else
              @click="login"
              class="px-4 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Login
            </button>
          </div>
        </div>
      </header>
      <main class="min-h-screen transition-none sm:pt-16 bg-[#F5F8FF] dark:bg-[#1A1F27] text-[#1A1A1A] dark:text-[#F1F5FF]" :class="{ 'ml-64 max-sm:overflow-hidden max-sm:h-screen max-sm:hidden': sidebar }">
        <div class="mx-auto">
          <slot />
        </div>
      </main>
      <Footer />
    </div>

    <!-- Debug component (remove in production) -->
    <ClientOnly>
      <AuthStatus v-if="false" /> <!-- Set to true temporarily for debugging -->
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const { locale, locales, setLocale } = useI18n();
const sidebar = ref<boolean>(false);

// Auth store
const authStore = useAuthStore();
const showGlobalLoader = ref(true);

// Initialize auth when component mounts
onMounted(async () => {
  console.log('🔄 Default layout mounted - initializing auth...');
  
  try {
    // Use initializeAuth if available, otherwise fall back to checkAuth
    if (typeof authStore.initializeAuth === 'function') {
      await authStore.initializeAuth();
    } else {
      await authStore.checkAuth();
    }
    console.log('✅ Auth initialization completed in layout');
  } catch (error) {
    console.error('❌ Auth initialization failed:', error);
  } finally {
    // Hide global loader
    setTimeout(() => {
      showGlobalLoader.value = false;
    }, 500);
  }
});

function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

function switchLanguage() {
  const rawLocales = (locales as any)?.value ?? (locales as any) ?? [];
  const availableLocales = Array.isArray(rawLocales)
    ? rawLocales.map((loc: any) => (typeof loc === 'string' ? loc : loc?.code)).filter(Boolean)
    : [];

  if (!availableLocales.length) return;

  const current = (locale as any)?.value ?? '';
  const currentCode = typeof current === 'string' ? current : current?.code ?? '';
  const currentIndex = availableLocales.indexOf(currentCode);
  const nextIndex = (currentIndex >= 0 ? currentIndex + 1 : 0) % availableLocales.length;

  setLocale(availableLocales[nextIndex]);
}

// Login function
function login() {
  window.location.href = authStore.getLoginUrl();
}

const currentLanguage = computed(() => {
  switch (locale.value) {
    case 'en': return 'EN';
    case 'ru': return 'RU';
    case 'kk': return 'KZ';
    default: return 'EN';
  }
});

const homeUrl = computed(() => {
  if (locale.value === 'en') return '/'
  if (locale.value === 'ru') return '/ru/'
  if (locale.value === 'kk') return '/kk/'
  return '/'
});
</script>