// i18n.config.ts
export default defineI18nConfig(() => {
  // This will be handled by Nuxt i18n automatically with the JSON files
  return {
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en'
  }
})