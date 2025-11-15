<template>
  <div>
    <!-- sidebar button -->
    <div
      class="self-center rounded-full w-14 ml-3 mt-2 h-12  duration-200 flex items-center justify-center select-none max-sm:z-50 hover:bg-opacity-20 hover:bg-[#1E6DFF] dark:hover:bg-[#6CA8FF]"
      role="button"
      tabindex="0"
      @click="switch_sidebar"
    >
      <div class="flex flex-col justify-between items-center w-6 h-4">
        <span
          class="h-[2px] w-full bg-[#1A1A1A] dark:bg-[#F1F5FF]"
          :class="{ 'rotate-45 translate-y-[7px]': sidebar }"
        ></span>
        <span
          class="h-[2px] w-full bg-[#1A1A1A] dark:bg-[#F1F5FF]"
          :class="{ 'opacity-0': sidebar }"
        ></span>
        <span
          class="h-[2px] w-full bg-[#1A1A1A] dark:bg-[#F1F5FF]"
          :class="{ '-rotate-45 -translate-y-[7px]': sidebar }"
        ></span>
      </div>
    </div>

    <!-- Sidebar guts -->
    <div
      v-show="sidebar"
      class="flex flex-col min-h-[calc(100vh-64px)] top-16 left-0 w-64 sm:fixed text-center transition-[transform,shadow,opacity] duration-300 ease-in-out max-sm:absolute max-sm:top-16 max-sm:left-0 max-sm:w-full max-sm:h-[calc(100vh-64px)] max-sm:z-40 shadow-xl border-t
      dark:bg-[#1A1F27] dark:text-[#F1F5FF] dark:border-[#313B47]
      bg-[#F5F8FF] text-[#1A1A1A] border-[#E2E8F0]"
    >
      <!-- Searchbar-->
      <div class="p-4 border-b dark:border-[#313B47] border-[#E2E8F0] max-sm:block hidden">
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="w-full px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent
            dark:bg-[#212832] dark:text-[#F1F5FF] dark:border-[#313B47] dark:focus:ring-[#6CA8FF]
            bg-[#FFFFFF] text-[#1A1A1A] border-[#E2E8F0] placeholder-[#5A6A85] focus:ring-[#1E6DFF]"
          />
          <svg
            class="absolute left-3 top-2.5 w-4 h-4 text-[#5A6A85] dark:text-[#A9B4C6]"
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

      <div class="pt-2 border-[#E2E8F0] dark:border-[#313B47]"></div>

      <!-- Home menu -->
      <NuxtLink
        to="/"
        @click="closeSidebar"
        class="ml-2 mr-2 h-12 text-center text-xl pt-2 p-2 cursor-pointer select-none max-sm:text-center flex items-center justify-start gap-3 px-4 py-3 mx-3 mt-3 rounded-xl transition-[transform,shadow,opacity] duration-300 group border-l-4 border-transparent
        dark:hover:bg-[#6CA8FF] dark:hover:shadow-lg dark:hover:scale-[1.02] dark:hover:border-[#8CB9FF]
        hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:text-[#1A1A1A] hover:border-[#1E6DFF]"
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
        <span class="font-medium transition-[transform,shadow,opacity] duration-300 group-hover:translate-x-1">Home</span>
      </NuxtLink>
      <!-- Reports -->
      <NuxtLink
        to="/reports"
        @click="closeSidebar"
        class="ml-2 mr-2 h-12 text-center text-xl pt-2 p-2 cursor-pointer select-none max-sm:text-center flex items-center justify-start gap-3 px-4 py-3 mx-3 mt-3 rounded-xl transition-[transform,shadow,opacity] duration-300 group border-l-4 border-transparent
        dark:hover:bg-[#6CA8FF] dark:hover:shadow-lg dark:hover:scale-[1.02] dark:hover:border-[#8CB9FF]
        hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:text-[#1A1A1A] hover:border-[#1E6DFF]"
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
        <span class="font-medium transition-[transform,shadow,opacity] duration-300 group-hover:translate-x-1">Report</span>
      </NuxtLink>
      <!-- Gamehub -->
      <NuxtLink
        to="/inform"
        @click="closeSidebar"
        class="ml-2 mr-2 h-12 text-center text-xl pt-2 p-2 cursor-pointer select-none max-sm:text-center flex items-center justify-start gap-3 px-4 py-3 mx-2 mt-2 rounded-xl transition-[transform,shadow,opacity] duration-300 group border-l-4 border-transparent
        dark:hover:bg-[#6CA8FF] dark:hover:shadow-lg dark:hover:scale-[1.02] dark:hover:border-[#8CB9FF]
        hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:text-[#1A1A1A] hover:border-[#1E6DFF]"
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
        <span class="font-medium transition-[transform,shadow,opacity] duration-300 group-hover:translate-x-1">Information</span>
      </NuxtLink>

      <!-- Lab Menu -->
      <div class="max-sm:text-center mt-2 rounded-xl overflow-hidden max-sm:mx-0">
        <div
          class="relative ml-2 mr-2 h-12 text-center text-xl pt-2 p-2 flex items-center justify-start gap-3 px-4 py-3 rounded-xl transition-[transform,shadow,opacity] duration-300 group cursor-pointer select-none border-l-4
          dark:hover:bg-[#212832] dark:border-transparent dark:hover:border-[#6CA8FF]
          hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:border-[#1E6DFF]"
          :class="{
            'dark:bg-[#6CA8FF] dark:shadow-lg dark:scale-[1.02] dark:border-[#8CB9FF]': submenu,
            'bg-[#1E6DFF] bg-opacity-20 scale-[1.02] border-[#1E6DFF]': submenu && colorMode.value === 'light',
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
          <span class="font-medium transition-[transform,shadow,opacity] duration-300">Maps</span>
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
          class="transition-[transform,shadow,opacity] duration-500 ease-out overflow-hidden select-none
          dark:bg-[#0E1117] dark:bg-opacity-50
          bg-[#FFFFFF] bg-opacity-80"
          :class="{ 'max-h-0': !submenu, 'max-h-64': submenu }"
          @mouseleave="closeWithDelay"
          @mouseenter="cancelClose"
        >
          <div class="flex flex-col text-center space-y-1 py-2 px-3">
            <NuxtLink v-for="lab in labs" :key="lab.path" :to="`/${lab.path}`" @click="closeSidebar"
                class="relative group flex items-center gap-3 px-3 py-2 rounded-lg transition-[transform,shadow,opacity] duration-300 border-l-2 border-transparent
                dark:hover:bg-[#6CA8FF] dark:hover:border-[#75B9FF]
                hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:border-[#1E6DFF]">
                <div class="w-2 h-2 rounded-full transition-transform duration-300 dark:bg-[#75B9FF] bg-[#1E6DFF]"></div>
                <span class="font-medium">{{ lab.name }}</span>
            </NuxtLink>
            </div>

        </div>
      </div>

      <!-- Login + Logout -->
      <!-- <div
        class="transition-[transform,shadow,opacity] duration-500 ease-out overflow-hidden mt-2 max-sm:mx-0"
        :class="{ 'max-h-0': submenu, 'max-h-40': !submenu }"
      >
        <NuxtLink
          to="/login"
          @click="closeSidebar"
          class="ml-2 mr-2 h-12 text-center text-xl pt-2 p-2 flex items-center justify-start gap-3 px-4 py-3 rounded-xl transition-[transform,shadow,opacity] duration-300 group border-l-4 border-transparent
          dark:hover:bg-[#6CA8FF] dark:hover:border-[#38E39A]
          hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:text-[#1A1A1A] hover:border-[#1E6DFF]"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
          </svg>
          <span class="font-medium transition-[transform,shadow,opacity] duration-300 group-hover:translate-x-1">Log in</span>
        </NuxtLink>

        <NuxtLink
          to="/logout"
          @click="closeSidebar"
          class="ml-2 mr-2 h-12 text-center text-xl pt-2 p-2 flex items-center justify-start gap-3 px-4 py-3 rounded-xl transition-[transform,shadow,opacity] duration-300 group border-l-4 border-transparent
          dark:hover:bg-[#6CA8FF] dark:hover:border-[#FF6B6B]
          hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:text-[#1A1A1A] hover:border-[#1E6DFF]"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span class="font-medium transition-[transform,shadow,opacity] duration-300 group-hover:translate-x-1">Log out</span>
        </NuxtLink>
      </div> -->

      <!-- Footer -->
      <div
        class="mt-auto py-6 border-t-2 dark:border-[#313B47] border-[#E2E8F0] bg-[#FFFFFF] dark:bg-[#0E1117] bg-opacity-80"
      >
        <div class="text-sm dark:text-[#A9B4C6] text-[#5A6A85] flex flex-col items-center gap-1">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>© 2025 SKO GEOHYDRO PORTAL</span>
          </div>
          <div class="text-xs dark:text-[#5A6A85] text-[#5A6A85]">All rights reserved</div>

          <footer class="flex flex-row mt-2 w-full items-center justify-center px-4 gap-4">
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

const labs = [
  { path: 'lab3', name: 'Level of Water' },
  { path: 'lab4', name: 'Transparency' },
  { path: 'lab5', name: 'Temperature' },
  { path: 'lab6', name: 'Electrical Conductivity' }
];
</script>