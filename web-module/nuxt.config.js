// eslint-disable-next-line no-unused-vars
import { NuxtConfig } from '@nuxt/types'

/**
 * @type {NuxtConfig}
 */
const nuxtOption = {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,
  mode: 'spa',

  srcDir: './web-module',

  server: {
    port: 8080,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'web-module',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: []
  },

  router: {
    mode: 'hash'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  render: {
    resourceHints: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: 'assets',
  },
  generate: {
    dir: 'dist/web',
    subFolders: false,
  },
}

export default nuxtOption;