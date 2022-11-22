process.env.DEBUG = 'nuxt:*';

export default {
  debug: true,
  ssr: true,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Shop',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'keywords', name: 'keywords', content: '' },
      { name: 'theme-color', content: '#fff' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'icon', type: 'image/png', href: 'favicon.ico' },
    ],
    script: [
      { hid: 'emailsender', src: '//cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js', defer: true },
    ],
  },
  router: {
    base: '/',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['./assets/styles/main.scss', 'swiper/css/swiper.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '@/plugins/emailsender', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',
    ['cookie-universal-nuxt', { parseJSON: false }],
    // '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    // https://github.com/nuxt-community/gtm-module
    // '@nuxtjs/gtm',
    // https://www.npmjs.com/package/nuxt-facebook-pixel-module
    // 'nuxt-facebook-pixel-module',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyB3r7ebBnzpGdxlVYA1aSmQOcgTAhIaeHw',
          authDomain: 'shop-972a3.firebaseapp.com',
          projectId: 'shop-972a3',
          storageBucket: 'shop-972a3.appspot.com',
          messagingSenderId: '787754965690',
          appId: '1:787754965690:web:ca64a78518d8f09cbfc083',
        },
        services: {
          auth: true,
          firestore: true,
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  axios: {
    debug: false,
  },
  pwa: {
    manifest: {
      lang: 'ru',
    },
  },
  loading: '~/components/_ui/a_loader/a_loader.vue',

  build: {
    transpile: ['gsap'],
  },

  env: {
    SITE_FB_PIXEL: process.env.SITE_FB_PIXEL,
    SITE_GTM: process.env.SITE_GTM,
  },

  publicRuntimeConfig: {
    SITE_URL: process.env.SITE_URL,
  },

  // robots.txt
  robots: {
    UserAgent: '*',
    Disallow: '/admin',
    Allow: '*',
  },

  i18n: {
    defaultLocale: 'ru',
    locales: [
      {
        code: 'ru',
        iso: 'ru-RU',
        // domain: localeDomains.ru
      },
      {
        code: 'en',
        iso: 'en-US',
        // domain: localeDomains.en
      },
    ],
    differentDomains: false,
    vueI18nLoader: true,
    detectBrowserLanguage: false,
  },

  // GTM
  gtm: {
    id: process.env.SITE_GTM,
  },

  // Facebook pixel
  facebook: {
    /* module options */
    track: 'PageView',
    pixelId: process.env.SITE_FB_PIXEL,
    autoPageView: true,
    disabled: false,
  },
};
