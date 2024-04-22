// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Curhapps",
      link: [{ rel: "icon", type: "image/x-icon", href: "/icon.svg" }],
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image", "nuxt-icon"],
  plugins: [
    "~/plugins/vue-toastification.js",
    "~/plugins/apexchart.client.js",
    "~/plugins/axios.js",
    "~/plugins/vue-awesome-paginate.js",
  ],
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  image: {
    dir: "public",
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    MODE: process.env.NUXT_MODE, // important
    public: {
      BASE_URL_PUBLIC: process.env.NUXT_BASE_URL_PUBLIC,
      TOKEN_EXPIRES_IN_PUBLIC: Number(process.env.NUXT_TOKEN_EXPIRES_IN_PUBLIC), // important
    },
  },
  ssr: false,
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
    compressPublicAssets: true,
  },
  vite: {
    define: {
      "process.env.WEBSOCKET": JSON.stringify(
        process.env.NUXT_BASE_URL_WEBSOCKET
      ),
    },
  },
  devServer: {
    // host: "192.168.137.94",
    port: 4000,
  },
});
