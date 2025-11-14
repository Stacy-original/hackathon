<template>
  <div>
    <!-- sidebar button -->
    <div
      class="self-center rounded-full w-14 ml-3 mt-2 h-12 transition-colors duration-200 flex items-center justify-center select-none max-sm:z-50 hover:bg-opacity-20 hover:bg-[#b38b6d] dark:hover:bg-gray-500"
      role="button"
      tabindex="0"
      @click="switch_sidebar"
    >
      <div class="flex flex-col justify-between items-center w-6 h-4">
        <span
          class="h-[2px] w-full bg-[#3a2a1a] dark:bg-white transition-all duration-300"
          :class="{ 'rotate-45 translate-y-[7px]': sidebar }"
        ></span>
        <span
          class="h-[2px] w-full bg-[#3a2a1a] dark:bg-white transition-all duration-300"
          :class="{ 'opacity-0': sidebar }"
        ></span>
        <span
          class="h-[2px] w-full bg-[#3a2a1a] dark:bg-white transition-all duration-300"
          :class="{ '-rotate-45 -translate-y-[7px]': sidebar }"
        ></span>
      </div>
    </div>

    <!-- Sidebar guts -->
    <div
      v-show="sidebar"
      class="flex flex-col min-h-[calc(100vh-64px)] top-16 left-0 w-64 sm:fixed text-center transition-all duration-300 ease-in-out max-sm:absolute max-sm:top-16 max-sm:left-0 max-sm:w-full max-sm:h-[calc(100vh-64px)] max-sm:z-40 shadow-xl border-t
      dark:bg-gray-800 dark:text-white dark:border-gray-700
      bg-[#d9c5b2] text-[#3a2a1a] border-[#b38b6d]"
    >
      <!-- Searchbar-->
      <div class="p-4 border-b dark:border-gray-700 border-[#b38b6d] max-sm:block hidden">
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="w-full px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent
            dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-gray-200
            bg-[#e7d7c1] text-[#4b2e05] border-[#b38b6d] placeholder-[#7b4b26]"
          />
          <svg
            class="absolute left-3 top-2.5 w-4 h-4 text-[#7b4b26] dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div class="pt-2 border-[#b38b6d] dark:border-gray-700"></div>

      <!-- Home menu -->
      <NuxtLink
        to="/"
        @click="closeSidebar"
        class="ml-2 mr-2 h-12 text-center text-xl pt-2 p-2 cursor-pointer select-none max-sm:text-center flex items-center justify-start gap-3 px-4 py-3 mx-3 mt-3 rounded-xl transition-all duration-300 group border-l-4 border-transparent
        dark:hover:bg-blue-600 dark:hover:shadow-lg dark:hover:scale-[1.02] dark:hover:border-blue-400
        hover:bg-[#c9ad92] hover:text-[#3a2a1a] hover:border-[#a1744c]"
      >
        <svg
          class="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span class="font-medium transition-all duration-300 group-hover:translate-x-1">Home</span>
      </NuxtLink>

      <!-- Gamehub -->
      <NuxtLink
        to="/gamehub"
        @click="closeSidebar"
        class="ml-2 mr-2 h-12 text-center text-xl pt-2 p-2 cursor-pointer select-none max-sm:text-center flex items-center justify-start gap-3 px-4 py-3 mx-2 mt-2 rounded-xl transition-all duration-300 group border-l-4 border-transparent
        dark:hover:bg-blue-600 dark:hover:shadow-lg dark:hover:scale-[1.02] dark:hover:border-blue-400
        hover:bg-[#c9ad92] hover:text-[#3a2a1a] hover:border-[#a1744c]"
      >
        <svg
          class="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
          />
        </svg>
        <span class="font-medium transition-all duration-300 group-hover:translate-x-1">Games</span>
      </NuxtLink>

      <!-- Lab Menu -->
      <div class="max-sm:text-center mt-2 rounded-xl overflow-hidden max-sm:mx-0">
        <div
          class="relative ml-2 mr-2 h-12 text-center text-xl pt-2 p-2 flex items-center justify-start gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer select-none border-l-4
          dark:hover:bg-gray-800 dark:border-transparent dark:hover:border-blue-400
          hover:bg-[#c9ad92] dark:hover-text-white hover:border-[#a1744c]"
          :class="{
            'dark:bg-blue-600 dark:shadow-lg dark:scale-[1.02] dark:border-blue-400': submenu,
            'bg-[#b38b6d] bg-opacity-40 scale-[1.02] border-[#a1744c]': submenu && colorMode.value === 'light',
          }"
          @click="switch_submenu"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          role="button"
          tabindex="0"
        >
          <svg
            class="w-5 h-5 transition-transform duration-300"
            :class="{ 'rotate-90 scale-110': submenu, 'group-hover:scale-110': !submenu }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span class="font-medium transition-all duration-300">Labs</span>
          <svg
            class="w-4 h-4 ml-auto transition-transform duration-300"
            :class="{ 'rotate-180': submenu }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <!-- Submenu -->
        <div
          class="transition-all duration-500 ease-out overflow-hidden select-none
          dark:bg-gray-900 dark:bg-opacity-50
          bg-[#e7d7c1] bg-opacity-60"
          :class="{ 'max-h-0': !submenu, 'max-h-64': submenu }"
          @mouseleave="closeWithDelay"
          @mouseenter="cancelClose"
        >
          <div class="flex flex-col text-center space-y-1 py-2 px-3">
            <NuxtLink
              v-for="lab in ['lab3', 'lab4', 'lab5', 'lab6']"
              :key="lab"
              :to="`/lab/${lab}`"
              @click="closeSidebar"
              class="relative group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 border-l-2 border-transparent
              dark:hover:bg-blue-500 dark:hover:border-blue-300
              hover:bg-[#c9ad92] hover:border-[#a1744c]"
            >
              <div
                class="w-2 h-2 rounded-full transition-transform duration-300
                dark:bg-blue-400 bg-[#a1744c]"
              ></div>
              <span class="font-medium"> {{ lab.toUpperCase() }} </span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Login + Logout -->
      <div
        class="transition-all duration-500 ease-out overflow-hidden mt-2 max-sm:mx-0"
        :class="{ 'max-h-0': submenu, 'max-h-40': !submenu }"
      >
        <NuxtLink
          to="/login"
          @click="closeSidebar"
          class="ml-2 mr-2 h-12 text-center text-xl pt-2 p-2 flex items-center justify-start gap-3 px-4 py-3 rounded-xl transition-all duration-300 group border-l-4 border-transparent
          dark:hover:bg-blue-600 dark:hover:border-green-400
          hover:bg-[#b38b6d] hover:text-[#3a2a1a] hover:border-[#8d6548]"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
          </svg>
          <span class="font-medium transition-all duration-300 group-hover:translate-x-1">Log in</span>
        </NuxtLink>

        <NuxtLink
          to="/logout"
          @click="closeSidebar"
          class="ml-2 mr-2 h-12 text-center text-xl pt-2 p-2 flex items-center justify-start gap-3 px-4 py-3 rounded-xl transition-all duration-300 group border-l-4 border-transparent
          dark:hover:bg-blue-600 dark:hover:border-red-400
          hover:bg-[#b38b6d] hover:text-[#3a2a1a] hover:border-[#8d6548]"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span class="font-medium transition-all duration-300 group-hover:translate-x-1">Log out</span>
        </NuxtLink>
      </div>

      

      <!-- Footer -->
      <div
        class="mt-auto py-6 border-t-2 dark:border-gray-700 border-[#b38b6d] bg-[#e7d7c1] dark:bg-gray-900 bg-opacity-70"
      >
        <div class="text-sm dark:text-gray-400 text-[#4b2e05] flex flex-col items-center gap-1">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>© 2025 KASYAK</span>
          </div>
          <div class="text-xs dark:text-gray-500 text-[#6b4226]">All rights reserved</div>

          <footer class="flex flex-row mt-2 w-full items-center justify-center px-4 gap-4">
            <a href="https://github.com/"><img src="#" class="w-8 h-8" /></a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="#" class="w-8 h-8" /></a>
            <a href="https://www.facebook.com/"><img src="#" class="w-8 h-8" /></a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();



const props = defineProps<{ sidebar: boolean }>();
const emit = defineEmits<{ "update:sidebar": [value: boolean]; "close-sidebar": [] }>();

const submenu = ref<boolean>(false);

const switch_sidebar = () => {
  emit("update:sidebar", !props.sidebar);
};
const switch_submenu = () => {
  submenu.value = !submenu.value;
};
const closeSidebar = () => {
  emit("close-sidebar");
};

let closeTimeout: ReturnType<typeof setTimeout> | null = null;
const closeWithDelay = () => {
  closeTimeout = setTimeout(() => {
    submenu.value = false;
  }, 350);
};
const cancelClose = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
};

let openTimeout: ReturnType<typeof setTimeout> | null = null;
const openWithDelay = () => {
  openTimeout = setTimeout(() => {
    submenu.value = true;
  }, 150);
};
const cancelOpen = () => {
  if (openTimeout) {
    clearTimeout(openTimeout);
    openTimeout = null;
  }
};

const handleMouseLeave = () => {
  if (submenu.value) {
    closeWithDelay();
  } else {
    cancelOpen();
  }
};
const handleMouseEnter = () => {
  cancelClose();
  openWithDelay();
};
</script>
