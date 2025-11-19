<template>
  <footer class="w-full py-8 bg-[#FFFFFF] dark:bg-[#0E1117] border-t border-[#E2E8F0] dark:border-[#313B47]">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            
            <div>
              <h3 class="text-lg font-bold dark:text-[#F1F5FF] text-[#1A1A1A]">SKO GEOHYDRO PORTAL</h3>
              <p class="text-sm dark:text-[#A9B4C6] text-[#5A6A85] mt-1">
                Advanced hydrogeological monitoring and data analysis platform
              </p>
            </div>
          </div>
          <p class="text-sm dark:text-[#A9B4C6] text-[#5A6A85] max-w-md">
            Comprehensive platform for environmental research and water resource management with real-time monitoring capabilities and advanced analytics.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold dark:text-[#F1F5FF] text-[#1A1A1A] mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink :to="homeUrl" class="text-sm dark:text-[#A9B4C6] text-[#5A6A85] hover:text-[#1E6DFF] dark:hover:text-[#6CA8FF] transition-colors">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="reportsUrl" class="text-sm dark:text-[#A9B4C6] text-[#5A6A85] hover:text-[#1E6DFF] dark:hover:text-[#6CA8FF] transition-colors">Reports</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="informUrl" class="text-sm dark:text-[#A9B4C6] text-[#5A6A85] hover:text-[#1E6DFF] dark:hover:text-[#6CA8FF] transition-colors">Pathogens</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="mapsUrl" class="text-sm dark:text-[#A9B4C6] text-[#5A6A85] hover:text-[#1E6DFF] dark:hover:text-[#6CA8FF] transition-colors">Map</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Social -->
        <div>
          <h4 class="font-semibold dark:text-[#F1F5FF] text-[#1A1A1A] mb-4">Connect With Us</h4>
          <div class="flex gap-4 mb-4">
            <a 
              href="https://github.com/" 
              class="p-2 rounded-lg transition-all duration-300 hover:scale-110
                     dark:hover:bg-[#6CA8FF] dark:hover:bg-opacity-20
                     hover:bg-[#1E6DFF] hover:bg-opacity-10"
            >
              <img 
                v-if="colorMode.value === 'light'" 
                src="/assets/images/githubblack.png" 
                class="w-6 h-6" 
                alt="GitHub"
              />
              <img 
                v-else 
                src="/assets/images/githubwhite.png" 
                class="w-6 h-6" 
                alt="GitHub"
              />
            </a>
            <a 
              href="https://www.youtube.com/" 
              class="p-2 rounded-lg transition-all duration-300 hover:scale-110
                     dark:hover:bg-[#6CA8FF] dark:hover:bg-opacity-20
                     hover:bg-[#1E6DFF] hover:bg-opacity-10"
            >
              <img 
                v-if="colorMode.value === 'light'" 
                src="/assets/images/youtubeblack.png" 
                class="w-6 h-6" 
                alt="YouTube"
              />
              <img 
                v-else 
                src="/assets/images/youtubewhite.png" 
                class="w-6 h-6" 
                alt="YouTube"
              />
            </a>
            <a 
              href="https://www.facebook.com/" 
              class="p-2 rounded-lg transition-all duration-300 hover:scale-110
                     dark:hover:bg-[#6CA8FF] dark:hover:bg-opacity-20
                     hover:bg-[#1E6DFF] hover:bg-opacity-10"
            >
              <img 
                v-if="colorMode.value === 'light'" 
                src="/assets/images/facebookblack.png" 
                class="w-6 h-6" 
                alt="Facebook"
              />
              <img 
                v-else 
                src="/assets/images/facebookwhite.png" 
                class="w-6 h-6" 
                alt="Facebook"
              />
            </a>
          </div>
          <p class="text-xs dark:text-[#5A6A85] text-[#5A6A85]">
            Get in touch with our team for support and inquiries
          </p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t dark:border-[#313B47] border-[#E2E8F0] mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="text-sm dark:text-[#A9B4C6] text-[#5A6A85] flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span>© 2025 SKO GEOHYDRO PORTAL. All rights reserved.</span>
        </div>
        <div class="flex gap-6 text-xs dark:text-[#5A6A85] text-[#5A6A85]">
          <NuxtLink :to="soonUrl" class="hover:text-[#1E6DFF] dark:hover:text-[#6CA8FF] transition-colors">Privacy Policy</NuxtLink>
          <NuxtLink :to="termsUrl" class="hover:text-[#1E6DFF] dark:hover:text-[#6CA8FF] transition-colors">Terms of Service</NuxtLink>
          <NuxtLink :to="soonUrl" class="hover:text-[#1E6DFF] dark:hover:text-[#6CA8FF] transition-colors">Contact</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { locale } = useI18n()

const homeUrl = computed(() => {
  if (locale.value === 'en') return '/'
  if (locale.value === 'ru') return '/ru/'
  if (locale.value === 'kk') return '/kk/'
  return '/'
});

const reportsUrl = computed(() => {
  if (locale.value === 'en') return '/reports'
  if (locale.value === 'ru') return '/ru/reports'
  if (locale.value === 'kk') return '/kk/reports'
  return '/reports'
});

const informUrl = computed(() => {
  if (locale.value === 'en') return '/inform'
  if (locale.value === 'ru') return '/ru/inform'
  if (locale.value === 'kk') return '/kk/inform'
  return '/inform'
});

const mapsUrl = computed(() => {
  if (locale.value === 'en') return '/map'
  if (locale.value === 'ru') return '/ru/map'
  if (locale.value === 'kk') return '/kk/map'
  return '/maps'
});

const termsUrl = computed(() => {
  if (locale.value === 'en') return '/terms'
  if (locale.value === 'ru') return '/ru/terms'
  if (locale.value === 'kk') return '/kk/terms'
  return '/terms'
});

const soonUrl = computed(() => {
  if (locale.value === 'en') return '/soon'
  if (locale.value === 'ru') return '/ru/soon'
  if (locale.value === 'kk') return '/kk/soon'
  return '/soon'
});
</script>