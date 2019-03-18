const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-start',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  transition: {
    name: 'slide',
  },
  env: {
    dbURL: process.env.DB_URL || "http://localhost:3004"
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'animate.css/animate.min.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/css/main.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      "axios",
      "jquery",
      // "popper",
      "bootstrap", // js
      "bootstrap-datepicker",
      "dropzone",
      "epic-spinners",
      "flatpickr",
      "medium-editor",
      "vue2-medium-editor",
      "selectric",
      "text-mask-addons",
      "vue-js-toggle-button",
      "vue-text-mask",
      "vuelidate",
      // "vuex", // не нужно устанавливать и подключать, он идёт из коробки
      "vuex-cache",
    ],
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        // Popper: 'popper.js',
        // 'window.Popper': 'popper.js',
      })
    ],
    cssSourceMap: false,
    /*
    ** Run ESLint on save
    */
    // extend(config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // },
    transpile: ['epic-spinners'],
    // in nuxt-edge was removed isClient https://github.com/nuxt/nuxt.js/issues/3216
    extend(config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    // { src: '~/plugins/jquery', ssr: false },
    // { src: '~/plugins/popper', ssr: false },
    { src: '~/plugins/bootstrap', ssr: false },
    // { src: '~/plugins/vuelidate', ssr: false },
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/vue-js-toggle-button', ssr: false },
    { src: '~/plugins/vue-medium-editor', ssr: false },
  ]
}

