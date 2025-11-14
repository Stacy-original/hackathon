<template>
  <div>
    <header class="z-50 sm:fixed flex flex-row w-full max-sm:justify-between min-h-16 max-sm:relative overscroll-none bg-[#FFFFFF] dark:bg-[#0E1117] border-b border-[#E2E8F0] dark:border-[#313B47]">
      <Sidebar :sidebar="sidebar" @update:sidebar="sidebar = $event" @close-sidebar="sidebar = false"/>
      <div class="flex-1 flex items-center justify-start px-8 max-sm:px-4 max-sm:flex-initial select-none">
        <NuxtLink to="/">
          <img v-if="colorMode.value === 'light'" src="/assets/images/logoblack.png" class="w-36 h-16" alt="Logo"/>
          <img v-else src="/assets/images/logowhite.png" class="w-36 h-16" alt="Logo"/>
        </NuxtLink>
      </div>
      <div class="px-3 py-2 flex items-center justify-center bg-[#F5F8FF] dark:bg-[#1A1F27] hover:bg-[#E2E8F0] dark:hover:bg-[#313B47] cursor-pointer border border-[#E2E8F0] dark:border-[#313B47] rounded-3xl  transition-colors mx-4 my-2" @click="toggleTheme">
        <span class="text-xl">
          <svg v-if="colorMode.value === 'dark'" class="w-5 h-5 text-[#F1F5FF]" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
          </svg>
          <svg v-else class="w-5 h-5 text-[#5A6A85]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
          </svg>
        </span>
      </div>
    </header>
    <main class="min-h-screen transition-none sm:pt-16 bg-[#F5F8FF] dark:bg-[#1A1F27] text-[#1A1A1A] dark:text-[#F1F5FF]" :class="{ 'ml-64 max-sm:overflow-hidden max-sm:h-screen max-sm:hidden': sidebar }">
      <div class="container mx-auto w-full">
        <slot />
      </div>
    </main>
    <footer class="flex flex-row w-full pt-2 pb-2 min-h-16 items-center justify-center px-4 gap-4 bg-[#FFFFFF] dark:bg-[#0E1117] border-b border-[#E2E8F0] dark:border-[#313B47]">
            <a href="https://github.com/">
            <img v-if="colorMode.value === 'light'" src="/assets/images/githubblack.png" class="w-10 h-10" alt="GitHub"/>
            <img v-else src="/assets/images/githubwhite.png" class="w-10 h-10" alt="GitHub"/>
            </a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <img v-if="colorMode.value === 'light'" src="/assets/images/youtubeblack.png" class="w-10 h-10" alt="YouTube"/>
            <img v-else src="/assets/images/youtubewhite.png" class="w-10 h-10" alt="YouTube"/>
            </a>
            <a href="https://www.facebook.com/">
            <img v-if="colorMode.value === 'light'" src="/assets/images/facebookblack.png" class="w-10 h-10" alt="Facebook"/>
            <img v-else src="/assets/images/facebookwhite.png" class="w-10 h-10" alt="Facebook"/>
            </a>
          </footer>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#app";
import { ref } from "vue";

const colorMode = useColorMode();
  
function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

const sidebar = ref<boolean>(false);
</script>