<template>
  <div class="overscroll-none font-sans transition-colors duration-300">
    <!-- HEADER -->
    <header class="sm:fixed flex flex-row w-full max-sm:justify-between max-sm:relative overscroll-none z-50 dark:bg-gray-950 bg-[#d9c5b2] border-b border-[#b38b6d] dark:border-gray-800">
      <!-- Sidebar Component -->
      <Sidebar :sidebar="sidebar" @update:sidebar="sidebar = $event" @close-sidebar="sidebar = false"/>

      <!-- Logo -->
      <div class="flex-1 flex items-center justify-start px-8 max-sm:px-4 max-sm:flex-initial select-none">
        <NuxtLink to="/">
          <img v-if="colorMode.value === 'light'" src="/assets/images/logoblack.png" class="w-36 h-16" alt="Logo"/>
          <img v-else src="/assets/images/logowhite.png" class="w-36 h-16" alt="Logo"/>
        </NuxtLink>
      </div>

      <!-- Search Bar Desktop -->
      <div class="flex-1 mt-2.5 flex justify-center max-sm:hidden">
        <div class="max-w-md w-full">
          <div class="relative">
            <input type="text" placeholder="Search..."
              class="w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-700 focus:ring-gray-200 bg-[#F5F8FF] text-[#1A1A1A] placeholder-[#5A6A85] border-[#E2E8F0]"/>
            <svg class="absolute left-3 top-2.5 w-4 h-4 text-[#5A6A85] dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Language Switcher + Theme Toggle -->
      <div class="flex-1 flex mr-5 justify-end items-center pr-4 max-sm:pr-2 relative gap-2">
        <!-- Language Switcher Button -->
        <div class="px-3 py-2 flex items-center justify-center bg-[#F5F8FF] dark:bg-[#1A1F27] hover:bg-[#E2E8F0] dark:hover:bg-[#313B47] cursor-pointer border border-[#E2E8F0] dark:border-[#313B47] rounded-3xl transition-colors" @click="switchLanguage">
          <span class="text-sm font-medium text-[#5A6A85] dark:text-[#A9B4C6]">
            {{ currentLanguage }}
          </span>
        </div>

        <!-- Theme Toggle Button -->
        <div class="px-3 py-2 flex items-center justify-center bg-[#F5F8FF] dark:bg-[#1A1F27] hover:bg-[#E2E8F0] dark:hover:bg-[#313B47] cursor-pointer border border-[#E2E8F0] dark:border-[#313B47] rounded-3xl transition-colors" @click="toggleTheme">
          <span class="text-xl">
            <svg v-if="colorMode.value === 'dark'" class="w-5 h-5 text-[#F1F5FF]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-5 h-5 text-[#5A6A85]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          </span>
        </div>
      </div>
    </header>

    <!-- Overlay for mobile sidebar -->
    <div
      v-if="sidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 max-sm:block sm:hidden"
      @click="sidebar = false"
    ></div>

    <!-- MAIN -->
    <main
      class="min-h-screen transition-all duration-300
      dark:bg-[#1A1F27] dark:text-[#F1F5FF]
      bg-[#F5F8FF] text-[#1A1A1A]
      max-sm:pt-2 sm:pt-16"
      :class="{ 'sm:ml-64': sidebar }"
    >
      <div class="mx-auto">
        <slot />
      </div>
    </main>

    <!-- FOOTER -->
    <footer
      class="flex flex-row w-full items-center justify-center px-4 py-2 gap-4
      dark:bg-[#0E1117] bg-[#FFFFFF] border-t border-[#E2E8F0] dark:border-[#313B47]"
    >
      <a href="https://github.com/">
        <img v-if="colorMode.value === 'light'" src="/assets/images/githubblack.png" class="w-8 h-8" alt="GitHub"/>
        <img v-else src="/assets/images/githubwhite.png" class="w-8 h-8" alt="GitHub"/>
      </a>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        <img v-if="colorMode.value === 'light'" src="/assets/images/youtubeblack.png" class="w-8 h-8" alt="YouTube"/>
        <img v-else src="/assets/images/youtubewhite.png" class="w-8 h-8" alt="YouTube"/>
      </a>
      <a href="https://www.facebook.com/">
        <img v-if="colorMode.value === 'light'" src="/assets/images/facebookblack.png" class="w-8 h-8" alt="Facebook"/>
        <img v-else src="/assets/images/facebookwhite.png" class="w-8 h-8" alt="Facebook"/>
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#app";
import { ref, computed } from "vue";

useHead({
  script: [
    {
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-1KQZZ47Z6Q",
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-1KQZZ47Z6Q');
      `,
      type: "text/javascript",
    },
  ],
  _dangerouslyDisableSanitizersByTagID: {
    gtag: ["innerHTML"],
  },
});

const colorMode = useColorMode();
const { locale, locales, setLocale } = useI18n();
const sidebar = ref<boolean>(false);

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

const currentLanguage = computed(() => {
  switch (locale.value) {
    case 'en': return 'EN';
    case 'ru': return 'RU';
    case 'kk': return 'KZ';
    default: return 'EN';
  }
});
</script>