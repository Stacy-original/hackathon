// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/leaflet'
  ],
   colorMode: {
    classSuffix: '', // makes it use 'dark' instead of 'dark-mode'
    preference: 'system', // default theme
    fallback: 'light', // fallback when preference not available
    storageKey: 'nuxt-color-mode', // localStorage key
  },
  app: {
    head: {
      title: 'HACKATHON',
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },,
        { rel: 'icon', type: 'image/png', href: '/favicon.png'}
      ],
    },
  },
})