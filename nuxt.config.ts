// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/leaflet',
    '@nuxtjs/color-mode'
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
   runtimeConfig: {
    // Private keys (server-side only)
    userApiKey: process.env.USER_API_KEY,
    editorApiKey: process.env.EDITOR_API_KEY,
    adminApiKey: process.env.ADMIN_API_KEY,
    
    // Public keys (client-side)
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://skogeohydro-backend.onrender.com',
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      // Default to user API key for public access
      defaultApiKey: process.env.USER_API_KEY || 'user_key_123',
    }
  },
   app: {
    head: {
      title: 'SKO GeoHydro Portal',
      link: [
        { rel: 'icon', type:'image/png', href: '/newfavicon.png'}
      ],
    },
  },
  ssr: false
})