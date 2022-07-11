import Sass from 'sass'

export default {
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SugiShio Portfolio',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'
      },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/stylesheets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    ['@nuxtjs/google-gtag', { id: 'G-2XJS4FDNQ2' }]
  ],

  firebase: {
    config: {
      apiKey: 'AIzaSyCeDLqLfXOgEWoLRP-gIKbWmVslay8hEaE',
      authDomain: 'sugishio-portfolio.firebaseapp.com',
      projectId: 'sugishio-portfolio',
      storageBucket: 'sugishio-portfolio.appspot.com',
      messagingSenderId: '366955785394',
      appId: '1:366955785394:web:eac5a93645a4520e486dab',
      measurementId: 'G-2XJS4FDNQ2'
    },
    services: {
      auth: true,
      firestore: true,
      storage: true
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: Sass
      }
    }
  },

  styleResources: {
    scss: [
      '@/assets/stylesheets/variables.scss',
      '@/assets/stylesheets/utils.scss'
    ]
  },

  router: {
    middleware: 'setDefaultMetaInformation'
  }
}
