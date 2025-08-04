export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  plugins: ['~/plugins/apollo.client.ts'],
  imports: {
    dirs: ['~/composables'],
  },

})
