[file name]: layouts/default.vue
[file content begin]
<template>
  <div class="overscroll-none font-sans transition-colors duration-300">
    <div>
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
          <!-- Language Switcher Button - Show only when NOT authenticated -->
          <div v-if="!isAuthenticated" class="px-3 py-2.5 flex items-center justify-center bg-[#F5F8FF] dark:bg-[#1A1F27] hover:bg-[#E2E8F0] dark:hover:bg-[#313B47] cursor-pointer border border-[#E2E8F0] dark:border-[#313B47] rounded-3xl transition-colors max-sm:mx-1 sm:mx-2 " @click="switchLanguage">
            <span class="text-sm font-medium text-[#5A6A85] dark:text-[#A9B4C6]">
              {{ currentLanguage }}
            </span>
          </div>
          
          <!-- Theme Toggle Button - Show only when NOT authenticated -->
          <div v-if="!isAuthenticated" class="px-3 py-2.5 flex items-center justify-center bg-[#F5F8FF] dark:bg-[#1A1F27] hover:bg-[#E2E8F0] dark:hover:bg-[#313B47] cursor-pointer border border-[#E2E8F0] dark:border-[#313B47] rounded-3xl transition-colors max-sm:mx-1 sm:mx-2 my-2" @click="toggleTheme">
            <span class="text-xl">
              <svg v-if="colorMode.value === 'dark'" class="w-5 h-5 text-[#F1F5FF]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
              </svg>
              <svg v-else class="w-5 h-5 text-[#5A6A85]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
              </svg>
            </span>
          </div>

          <!-- User Account Button -->
          <div class="relative">
            <!-- Authenticated User Button -->
            <div v-if="isAuthenticated" class="px-3 py-2 flex items-center justify-center bg-[#F5F8FF] dark:bg-[#1A1F27] hover:bg-[#E2E8F0] dark:hover:bg-[#313B47] cursor-pointer border border-[#E2E8F0] dark:border-[#313B47] rounded-3xl transition-colors max-sm:mx-1 sm:mx-2 my-2" @click="toggleUserMenu">
              <div class="flex items-center gap-2">
                <img :src="user?.picture" :alt="user?.name" crossorigin="anonymous" class="w-6 h-6 rounded-full" />
                <span class="text-sm font-medium text-[#5A6A85] dark:text-[#A9B4C6] max-sm:hidden">
                  {{ user?.name }}
                </span>
                <!-- Role badge -->
                <span class="text-xs px-1.5 py-0.5 rounded-full" 
                      :class="roleBadgeClass">
                  {{ roleText }}
                </span>
                <svg class="w-4 h-4 text-[#5A6A85] dark:text-[#A9B4C6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            <!-- Login Button -->
            <NuxtLink v-else to="/login" class="px-3 py-2 flex items-center justify-center bg-[#F5F8FF] dark:bg-[#1A1F27] hover:bg-[#E2E8F0] dark:hover:bg-[#313B47] cursor-pointer border border-[#E2E8F0] dark:border-[#313B47] rounded-3xl transition-colors max-sm:mx-1 sm:mx-2 my-2">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-[#5A6A85] dark:text-[#A9B4C6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span class="text-sm font-medium text-[#5A6A85] dark:text-[#A9B4C6] max-sm:hidden">
                  Login
                </span>
              </div>
            </NuxtLink>

            <!-- User Dropdown Menu -->
            <div v-if="showUserDropdown && isAuthenticated" class="absolute top-16 right-0 mt-2 w-72 bg-white dark:bg-[#1A1F27] rounded-lg shadow-lg border border-[#E2E8F0] dark:border-[#313B47] z-50">
              <!-- User Info Section -->
              <div class="p-4 border-b border-[#E2E8F0] dark:border-[#313B47]">
                <p class="text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">{{ user?.name }}</p>
                <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6] truncate">{{ user?.email }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs px-2 py-1 rounded-full" :class="roleBadgeClass">
                    {{ roleText }}
                  </span>
                </div>
              </div>
              
              <!-- Settings Section -->
              <div class="p-2 space-y-1">
                <!-- Theme Toggle in Dropdown -->
                <button 
                  @click="toggleTheme"
                  class="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#5A6A85] dark:text-[#A9B4C6] hover:bg-[#F5F8FF] dark:hover:bg-[#313B47] rounded-md transition-colors"
                >
                  <span class="text-xl">
                    <svg v-if="colorMode.value === 'dark'" class="w-4 h-4 text-[#F1F5FF]" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
                    </svg>
                    <svg v-else class="w-4 h-4 text-[#5A6A85]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                    </svg>
                  </span>
                  <span>{{ colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}</span>
                </button>

                <!-- Language Switcher in Dropdown -->
                <button 
                  @click="switchLanguage"
                  class="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#5A6A85] dark:text-[#A9B4C6] hover:bg-[#F5F8FF] dark:hover:bg-[#313B47] rounded-md transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                  </svg>
                  <span>Language: {{ currentLanguage }}</span>
                </button>

                <!-- Profile Link -->
                <NuxtLink 
                  :to="profileUrl" 
                  class="flex items-center gap-2 px-3 py-2 text-sm text-[#5A6A85] dark:text-[#A9B4C6] hover:bg-[#F5F8FF] dark:hover:bg-[#313B47] rounded-md transition-colors"
                  @click="showUserDropdown = false"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Profile
                </NuxtLink>
                
                <!-- Editor Panel - Show only for role 1 (Editor) or 2 (Admin) -->
                <NuxtLink 
                  v-if="user?.role && user.role >= 1"
                  :to="editUrl" 
                  class="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                  @click="showUserDropdown = false"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Editor Panel
                </NuxtLink>
                
                <!-- Admin Panel - Show only for role 2 (Admin) -->
                <NuxtLink 
                  v-if="user?.role && user.role === 2"
                  :to="adminUrl" 
                  class="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
                  @click="showUserDropdown = false"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Admin Panel
                </NuxtLink>
              </div>

              <!-- Sign Out Section -->
              <div class="p-2 border-t border-[#E2E8F0] dark:border-[#313B47]">
                <button 
                  @click="handleSignOut"
                  class="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
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

    <!-- Overlay for closing dropdown -->
    <div 
      v-if="showUserDropdown" 
      class="fixed inset-0 z-40" 
      @click="showUserDropdown = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const { locale, locales, setLocale } = useI18n();
const sidebar = ref<boolean>(false);
const showUserDropdown = ref<boolean>(false);
const route = useRoute();

const { user, isAuthenticated, signOut, checkAuthStatus, isAdmin, isEditor, refreshUserRole } = useGoogleAuth()

const showGlobalLoader = ref(true);

onMounted(async () => {
  setTimeout(() => {
    showGlobalLoader.value = false;
  }, 500);
  
  await checkAuthStatus()
  
  // Force role refresh on mount for admin users
  if (isAuthenticated.value && user.value?.role === 0) {
    console.log('🔄 Force refreshing role for potential admin user...')
    await refreshUserRole()
  }
  
  // Verify role every 2 minutes to prevent tampering
  setInterval(async () => {
    if (isAuthenticated.value) {
      await refreshUserRole()
    }
  }, 2 * 60 * 1000) // 2 minutes
});

watch(() => route.path, async (newPath, oldPath) => {
  console.log('🔄 Route changed, refreshing auth state...', { from: oldPath, to: newPath });
  
  // Refresh auth status when navigating between pages
  await checkAuthStatus();
  
  // If user just logged in (coming from login/success pages), refresh role
  if (oldPath.includes('/login') || oldPath.includes('/success')) {
    console.log('🔐 User likely just logged in, refreshing role...');
    await refreshUserRole();
  }
});

// NEW: Also watch for auth state changes from other components
watch(isAuthenticated, async (newAuthState, oldAuthState) => {
  console.log('🔐 Auth state changed:', { from: oldAuthState, to: newAuthState });
  if (newAuthState) {
    // If user just became authenticated, refresh their role
    await refreshUserRole();
  }
});

// Role-based computed properties - NOW USING VERIFIED ROLES
const roleText = computed(() => {
  if (!user.value?.role) return 'User'
  switch (user.value.role) {
    case 0: return 'User'
    case 1: return 'Editor'
    case 2: return 'Admin'
    default: return 'User'
  }
})

const roleBadgeClass = computed(() => {
  if (!user.value?.role) return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  switch (user.value.role) {
    case 0: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    case 1: return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
    case 2: return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }
})

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
};

function toggleUserMenu() {
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }
  showUserDropdown.value = !showUserDropdown.value
}

async function handleSignOut() {
  await signOut()
  showUserDropdown.value = false
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
const profileUrl = computed(() => {
  if (locale.value === 'en') return '/profile'
  if (locale.value === 'ru') return '/ru/profile'
  if (locale.value === 'kk') return '/kk/profile'
  return '/profile'
});
const adminUrl = computed(() => {
  if (locale.value === 'en') return '/admin'
  if (locale.value === 'ru') return '/ru/admin'
  if (locale.value === 'kk') return '/kk/admin'
  return '/admin'
});
const editUrl = computed(() => {
  if (locale.value === 'en') return '/edit'
  if (locale.value === 'ru') return '/ru/edit'
  if (locale.value === 'kk') return '/kk/edit'
  return '/edit'
});

</script>
[file content end]