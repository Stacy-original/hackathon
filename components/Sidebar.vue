<template>
  <div>
    <!-- sidebar button -->
    <div
      class="self-center rounded-full w-14 ml-3 mt-2 h-12 duration-200 flex items-center justify-center select-none max-sm:z-50 hover:bg-opacity-20 hover:bg-[#1E6DFF] dark:hover:bg-[#6CA8FF] max-sm:border-2 max-sm:border-[#E2E8F0] dark:max-sm:border-[#313B47] max-sm:bg-white dark:max-sm:bg-[#1A1F27] max-sm:shadow-sm"
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
      class="flex flex-col min-h-[calc(100vh-64px)] top-16 left-0 w-64 sm:fixed text-center transition-all duration-300 ease-in-out max-sm:absolute max-sm:top-16 max-sm:left-0 max-sm:w-full max-sm:h-[calc(100vh-64px)] max-sm:z-40 shadow-xl border-t
      dark:bg-[#1A1F27] dark:text-[#F1F5FF] dark:border-[#313B47]
      bg-[#F5F8FF] text-[#1A1A1A] border-[#E2E8F0]"
    >
      <!-- Searchbar-->
      <!-- <div class="p-4 border-b dark:border-[#313B47] border-[#E2E8F0] max-sm:block hidden">
        <div class="relative">
          <input
            type="text"
            :placeholder="$t('search')"
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
      </div> -->

      <div class="pt-2 border-[#E2E8F0] dark:border-[#313B47]"></div>

      <!-- Mobile enhanced menu items -->
      <!-- Home menu -->
      <NuxtLink
        :to="homeUrl"
        @click="closeSidebar"
        class="ml-2 mr-2 text-center text-xl cursor-pointer select-none max-sm:text-center flex items-center justify-start gap-3 px-4 py-4 mx-3 mt-3 transition-[transform,shadow,opacity] duration-300 group border-l-4 border-transparent
        dark:hover:bg-[#6CA8FF] dark:hover:shadow-lg dark:hover:scale-[1.02] dark:hover:border-[#8CB9FF]
        hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:text-[#1A1A1A] hover:border-[#1E6DFF]
        max-sm:border-b-2 max-sm:border-x-2 max-sm:rounded-2xl max-sm:border-[#E2E8F0] dark:max-sm:border-[#313B47] max-sm:bg-white dark:max-sm:bg-[#212832] max-sm:shadow-sm max-sm:min-h-16 max-sm:items-center max-sm:justify-start"
      >
        <svg
          class="w-6 h-6 transition-transform duration-300 group-hover:scale-110 max-sm:w-7 max-sm:h-7"
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
        <span class="font-medium transition-[transform,shadow,opacity] duration-300 group-hover:translate-x-1 max-sm:text-lg max-sm:font-semibold">{{ $t('home') }}</span>
      </NuxtLink>
      
      <!-- Map -->
      <NuxtLink
        :to="mapUrl"
        @click="closeSidebar"
        class="ml-2 mr-2 text-center text-xl cursor-pointer select-none max-sm:text-center flex items-center justify-start gap-3 px-4 py-4 mx-3 mt-3 transition-[transform,shadow,opacity] duration-300 group border-l-4 border-transparent
        dark:hover:bg-[#6CA8FF] dark:hover:shadow-lg dark:hover:scale-[1.02] dark:hover:border-[#8CB9FF]
        hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:text-[#1A1A1A] hover:border-[#1E6DFF]
        max-sm:border-b-2 max-sm:border-x-2 max-sm:rounded-2xl max-sm:border-[#E2E8F0] dark:max-sm:border-[#313B47] max-sm:bg-white dark:max-sm:bg-[#212832] max-sm:shadow-sm max-sm:min-h-16 max-sm:items-center max-sm:justify-start"
      >
        <svg
          class="w-6 h-6 transition-transform duration-300 group-hover:scale-110 max-sm:w-7 max-sm:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <span class="font-medium transition-[transform,shadow,opacity] duration-300 group-hover:translate-x-1 max-sm:text-lg max-sm:font-semibold">{{ $t('map') }}</span>
      </NuxtLink>
      
      <!-- Reports -->
      <NuxtLink
        :to="reportsUrl"
        @click="closeSidebar"
        class="ml-2 mr-2 text-center text-xl cursor-pointer select-none max-sm:text-center flex items-center justify-start gap-3 px-4 py-4 mx-3 mt-3 transition-[transform,shadow,opacity] duration-300 group border-l-4 border-transparent
        dark:hover:bg-[#6CA8FF] dark:hover:shadow-lg dark:hover:scale-[1.02] dark:hover:border-[#8CB9FF]
        hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:text-[#1A1A1A] hover:border-[#1E6DFF]
        max-sm:border-b-2 max-sm:border-x-2 max-sm:rounded-2xl max-sm:border-[#E2E8F0] dark:max-sm:border-[#313B47] max-sm:bg-white dark:max-sm:bg-[#212832] max-sm:shadow-sm max-sm:min-h-16 max-sm:items-center max-sm:justify-start"
      >
        <svg
          class="w-6 h-6 transition-transform duration-300 group-hover:scale-110 max-sm:w-7 max-sm:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span class="font-medium transition-[transform,shadow,opacity] duration-300 group-hover:translate-x-1 max-sm:text-lg max-sm:font-semibold">{{ $t('report') }}</span>
      </NuxtLink>

      <!-- Coordinates -->
      <NuxtLink
        :to="coordinatesUrl"
        @click="closeSidebar"
        class="ml-2 mr-2 text-center text-xl cursor-pointer select-none max-sm:text-center flex items-center justify-start gap-3 px-4 py-4 mx-3 mt-3 transition-[transform,shadow,opacity] duration-300 group border-l-4 border-transparent
        dark:hover:bg-[#6CA8FF] dark:hover:shadow-lg dark:hover:scale-[1.02] dark:hover:border-[#8CB9FF]
        hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:text-[#1A1A1A] hover:border-[#1E6DFF]
        max-sm:border-b-2 max-sm:border-x-2 max-sm:rounded-2xl max-sm:border-[#E2E8F0] dark:max-sm:border-[#313B47] max-sm:bg-white dark:max-sm:bg-[#212832] max-sm:shadow-sm max-sm:min-h-16 max-sm:items-center max-sm:justify-start"
      >
        <svg
          class="w-6 h-6 transition-transform duration-300 group-hover:scale-110 max-sm:w-7 max-sm:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span class="font-medium transition-[transform,shadow,opacity] duration-300 group-hover:translate-x-1 max-sm:text-lg max-sm:font-semibold">{{ $t('coordinates') }}</span>
      </NuxtLink>

      <!-- Pathogens -->
      <!-- <NuxtLink
        :to="pathogensUrl"
        @click="closeSidebar"
        class="ml-2 mr-2 text-center text-xl cursor-pointer select-none max-sm:text-center flex items-center justify-start gap-3 px-4 py-4 mx-3 mt-3 transition-[transform,shadow,opacity] duration-300 group border-l-4 border-transparent
        dark:hover:bg-[#6CA8FF] dark:hover:shadow-lg dark:hover:scale-[1.02] dark:hover:border-[#8CB9FF]
        hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:text-[#1A1A1A] hover:border-[#1E6DFF]
        max-sm:border-b-2 max-sm:border-x-2 max-sm:rounded-2xl max-sm:border-[#E2E8F0] dark:max-sm:border-[#313B47] max-sm:bg-white dark:max-sm:bg-[#212832] max-sm:shadow-sm max-sm:min-h-16 max-sm:items-center max-sm:justify-start"
      >
        <svg
          class="w-6 h-6 transition-transform duration-300 group-hover:scale-110 max-sm:w-7 max-sm:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
        <span class="font-medium transition-[transform,shadow,opacity] duration-300 group-hover:translate-x-1 max-sm:text-lg max-sm:font-semibold">{{ $t('pathogens') }}</span>
      </NuxtLink> -->

      <!-- Lab Menu -->
      <div class="max-sm:text-center mt-2 rounded-xl overflow-hidden max-sm:mx-0">
        <div
          class="relative ml-2 mr-2 text-center text-xl flex items-center justify-start gap-3 px-4 py-4 rounded-xl transition-[transform,shadow,opacity] duration-300 group cursor-pointer select-none border-l-4
          dark:hover:bg-[#212832] dark:border-transparent dark:hover:border-[#6CA8FF]
          hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:border-[#1E6DFF]
          max-sm:border-b-2 max-sm:border-x-2 max-sm:rounded-2xl max-sm:border-[#E2E8F0] dark:max-sm:border-[#313B47] max-sm:bg-white dark:max-sm:bg-[#212832] max-sm:shadow-sm max-sm:min-h-16 max-sm:items-center max-sm:justify-start"
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
            class="w-6 h-6 transition-transform duration-300 max-sm:w-7 max-sm:h-7"
            :class="{ 'rotate-90 scale-110': submenu, 'group-hover:scale-110': !submenu }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <span class="font-medium transition-[transform,shadow,opacity] duration-300 max-sm:text-lg max-sm:font-semibold">{{ $t('maps') }}</span>
          <svg
            class="w-5 h-5 ml-auto transition-transform duration-300 max-sm:w-6 max-sm:h-6"
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
          class="transition-all duration-500 ease-out overflow-hidden mx-2 rounded-lg select-none
          dark:bg-[#0E1117] dark:bg-opacity-50
          bg-[#FFFFFF] bg-opacity-80"
          :class="{ 'max-h-0': !submenu, 'min-h-70': submenu }"
          @mouseleave="closeWithDelay"
          @mouseenter="cancelClose"
        >
          <div class="flex flex-col text-center space-y-1 py-1 px-3">
            <NuxtLink v-for="lab in localizedLabs" :key="lab.path" :to="lab.url" @click="closeSidebar"
                class="relative group flex items-center gap-3 px-3 py-3 rounded-lg transition-[transform,shadow,opacity] duration-300 border-l-2 border-transparent
                dark:hover:bg-[#6CA8FF] dark:hover:border-[#75B9FF]
                hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:border-[#1E6DFF]
                max-sm:border-b max-sm:border-x max-sm:rounded-xl max-sm:border-[#E2E8F0] dark:max-sm:border-[#313B47] max-sm:bg-white dark:max-sm:bg-[#1A1F27] max-sm:shadow-sm max-sm:min-h-12 max-sm:mx-2">
                <div class="w-2 h-2 rounded-full transition-transform duration-300 dark:bg-[#75B9FF] bg-[#1E6DFF] max-sm:w-3 max-sm:h-3"></div>
                <span class="font-medium max-sm:text-base">{{ $t(lab.nameKey) }}</span>
            </NuxtLink>
            </div>

        </div>
      </div>

      <!-- Information Button -->
      <NuxtLink
        :to="termsUrl"
        @click="closeSidebar"
        class="ml-2 mr-2 text-center text-xl cursor-pointer select-none max-sm:text-center flex items-center justify-start gap-3 px-4 py-4 mx-3 mt-3 transition-[transform,shadow,opacity] duration-300 group border-l-4 border-transparent
        dark:hover:bg-[#6CA8FF] dark:hover:shadow-lg dark:hover:scale-[1.02] dark:hover:border-[#8CB9FF]
        hover:bg-[#1E6DFF] hover:bg-opacity-10 hover:text-[#1A1A1A] hover:border-[#1E6DFF]
        max-sm:border-b-2 max-sm:border-x-2 max-sm:rounded-2xl max-sm:border-[#E2E8F0] dark:max-sm:border-[#313B47] max-sm:bg-white dark:max-sm:bg-[#212832] max-sm:shadow-sm max-sm:min-h-16 max-sm:items-center max-sm:justify-start"
      >
        <svg
          class="w-6 h-6 transition-transform duration-300 group-hover:scale-110 max-sm:w-7 max-sm:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="font-medium transition-[transform,shadow,opacity] duration-300 group-hover:translate-x-1 max-sm:text-lg max-sm:font-semibold">{{ $t('information') }}</span>
      </NuxtLink>

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
          <div class="text-xs dark:text-[#5A6A85] text-[#5A6A85]">{{ $t('allRightsReserved') }}</div>

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
const { locale } = useI18n();

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

const homeUrl = computed(() => {
  if (locale.value === 'en') return '/'
  if (locale.value === 'ru') return '/ru/'
  if (locale.value === 'kk') return '/kk/'
  return '/'
});

const mapUrl = computed(() => {
  if (locale.value === 'en') return '/map'
  if (locale.value === 'ru') return '/ru/map'
  if (locale.value === 'kk') return '/kk/map'
  return '/map'
});

const reportsUrl = computed(() => {
  if (locale.value === 'en') return '/reports'
  if (locale.value === 'ru') return '/ru/reports'
  if (locale.value === 'kk') return '/kk/reports'
  return '/reports'
});

const coordinatesUrl = computed(() => {
  if (locale.value === 'en') return '/coords'
  if (locale.value === 'ru') return '/ru/coords'
  if (locale.value === 'kk') return '/kk/coords'
  return '/coords'
});

const pathogensUrl = computed(() => {
  if (locale.value === 'en') return '/inform'
  if (locale.value === 'ru') return '/ru/inform'
  if (locale.value === 'kk') return '/kk/inform'
  return '/inform'
});

const termsUrl = computed(() => {
  if (locale.value === 'en') return '/terms'
  if (locale.value === 'ru') return '/ru/terms'
  if (locale.value === 'kk') return '/kk/terms'
  return '/terms'
});

const labs = [
  { path: 'lab3', nameKey: 'levelOfWater' },
  { path: 'lab4', nameKey: 'transparency' },
  { path: 'lab5', nameKey: 'temperatureShort' },
  { path: 'lab6', nameKey: 'electricalConductivityShort' },
  { path: 'inform', nameKey: 'pathogens' }

];

const localizedLabs = computed(() => {
  return labs.map(lab => ({
    ...lab,
    url: locale.value === 'en' ? `/${lab.path}` : `/${locale.value}/${lab.path}`
  }))
});

// Define translations for this component only
const { $i18n } = useNuxtApp()

$i18n.mergeLocaleMessage('en', {
  home: 'Home',
  map: 'Map',
  report: 'Report',
  coordinates: 'Coordinates',
  pathogens: 'Pathogens',
  information: 'Information',
  maps: 'Maps',
  levelOfWater: 'Level of Water',
  transparency: 'Transparency',
  temperatureShort: 'Temperature',
  electricalConductivityShort: 'Electrical Conductivity',
  search: 'Search...',
  allRightsReserved: 'All rights reserved'
})

$i18n.mergeLocaleMessage('ru', {
  home: 'Главная',
  map: 'Карта',
  report: 'Отчет',
  coordinates: 'Координаты',
  pathogens: 'Патогены',
  information: 'Информация',
  maps: 'Карты',
  levelOfWater: 'Уровень воды',
  transparency: 'Прозрачность',
  temperatureShort: 'Температура',
  electricalConductivityShort: 'Электропроводность',
  search: 'Поиск...',
  allRightsReserved: 'Все права защищены'
})

$i18n.mergeLocaleMessage('kk', {
  home: 'Басты',
  map: 'Карта',
  report: 'Есеп',
  coordinates: 'Координаттар',
  pathogens: 'Патогендер',
  information: 'Ақпарат',
  maps: 'Карталар',
  levelOfWater: 'Су деңгейі',
  transparency: 'Өткізгіштік',
  temperatureShort: 'Температура',
  electricalConductivityShort: 'Электр өткізгіштік',
  search: 'Іздеу...',
  allRightsReserved: 'Барлық құқықтар қорғалған'
})
</script>