module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Pokédex Searcher ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Search Pokemons in pokedex' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  telemetry: false,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-socket-io',
  ],
  io: {
    // Options
    sockets: [
      {
        default: true, // make this the default socket
        name: "main", // give it a name that we can later use to choose this socket in the .vue file
        url:
          process.env.NODE_ENV === "production"
            ? "https://pokedex-searcher.herokuapp.com/"
            : "http://localhost:3000",
      },
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Pokédex Searcher',
      short_name: 'Pokédex',
      start_url: "/",
      display: 'standalone',
      lang: 'en',
    },
    icon: {
      iconSrc: '/pokeball.png',
    },
    meta: {
      name: 'Pokédex Searcher',
      description: 'Search for Pokémon by name or number',
      theme_color: '#f5f5f5',
      lang: 'en',
      og: {
        type: 'website',
        locale: 'en_US',
        title: 'Pokédex Searcher',
        description: 'Search for Pokémon by name or number',
        url: 'https://pokedex-searcher.herokuapp.com/',
        image: '/pokeball.png',
      },

    
    }

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
