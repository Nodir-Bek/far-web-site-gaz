// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-27",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "nuxt-swiper",
    "@nuxtjs/color-mode",
    "nuxt-pdfmake",
    "@nuxtjs/seo",
    "@zadigetvoltaire/nuxt-gtm",
    "@nuxtjs/sitemap",
  ],

  css: ["./assets/style.css", "./assets/fonts/Roboto/stylesheet.css"],
  i18n: {
    vueI18n: "./i18n.config.ts", 
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  gtm: {
    id: "GTM-WSMW393W",  
    enabled: true,  
    debug: true,
  }, 
  site: {
    url: "https://farhududgaz.uz",
  },
  sitemap: {
    enabled: true,
    autoI18n: true,
    defaults: {
      changefreq: "daily",
      priority: 0.7,
    },
  
  },
  colorMode: {
    preference: "light",
    fallback: "light", // add this line to disable dark mode
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { name: "slide-left", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Hududgaz Farg'ona gaz ta'miniot filiali",
      meta: [
        {
          name: "keywords",
          content:
            "Hududgaz Farg'ona, gaz ta'minoti, gaz tariflari, Farg'ona viloyati gaz, gaz xizmatlari, gaz bo'yicha ma'lumotlar, gaz yetkazib berish, gaz ta'minot tashkiloti, gaz muammolari",
          property: "keywords",
        },
      ],
    },
  },
});
