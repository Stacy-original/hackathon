// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/leaflet'
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
      redirectOn: 'root'
    },
    vueI18n: './i18n.config.ts' // Remove this line completely
  },
  app: {
    head: {
      title: 'HACKATHON',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png'}
      ],
    },
  },
  routeRules: {
    '/admin-reports': { 
      // This will help with client-side protection
    }
  },
})