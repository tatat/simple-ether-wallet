module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Simple Ether Wallet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'web3',
      'element-ui',
      'element-ui/lib/locale/lang/ja',
      'moment',
      'easytimer.js'
    ],

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
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
    { src: '~/plugins/nuxt-client-init.js', ssr: false },
    '~/plugins/element-ui',
    '~/plugins/interval',
    '~/plugins/message-box'
  ],

  css: [
    'normalize.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  env: {
    WEB3_PROVIDER_URL: process.env.WEB3_PROVIDER_URL || 'ws://0.0.0.0:8546'
  }
}
