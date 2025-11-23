// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/leaflet',
    '@pinia/nuxt'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'nuxt-color-mode',
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US' },
      { code: 'ru', name: 'Русский', iso: 'ru-RU' },
      { code: 'kk', name: 'Қазақша', iso: 'kk-KZ' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      fallbackLocale: 'en'
    }
  },
  // FIXED: Remove autoImports from pinia config
  pinia: {
    // Pinia Nuxt module handles auto-imports automatically
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://skogeohydro-backend.onrender.com'
    }
  },
  app: {
    head: {
      title: 'SKO GeoHydro Portal',
      link: [
        { rel: 'icon', type: 'image/png', href: '/newfavicon.png'}
      ],
    },
  },
  routeRules: {
    '/admin-reports': { 
      // This will help with client-side protection
    }
  }
})