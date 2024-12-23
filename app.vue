<template>
  <div class="w-full h-full transition-all duration-300 ease-in-out">
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-WSMW393W"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe>
    </noscript>
    <LoaderScreen />
    <modal
      :modal-body-name="modalBodyName"
      :modal-data="modalData"
      :preview-image-animate="previewImageAnimate"
      :show-modal="store.showModal"
    />
    <div>
      <div
        v-if="previewImage"
        class="w-full h-[100vh] fixed bg-[#38405599] left-0 top-0 z-[100] backdrop-blur-[0px] flex justify-center items-center"
      >
        <div
          @click="() => handlePreview()"
          class="w-[35px] h-[35px] border absolute right-[20px] top-[20px] z-[1000] rounded-full cursor-pointer flex justify-center items-center"
        >
          <Icon name="ic:sharp-clear" size="25" class="text-[#fff]" />
        </div>
        <div
          :class="previewImageAnimate ? 'scale-100' : 'scale-0'"
          class="max-w-full max-h-full relative overflow-hidden w-full h-full transition-all duration-300 ease-in-out flex justify-center items-center"
        >
          <UiSlider
            :slides="imagesListData"
            :current-image="previewImage"
            :onPreview="true"
          />
        </div>
      </div>
    </div>
    <accessibility-menu
      :is-open="accessibilityMode().showAccessibilityModal"
      @toggle-button="accessibilityMode().toggleAccessibilityModal"
    />
    <div
      v-if="accessibilityMode().showAccessibilityModal"
      class="overlay w-full h-full"
    ></div>

    <ScrollToTop
      :class="showScrollToTopbtn ? 'scale-100' : 'scale-0'"
      class="fixed bottom-10 right-5 z-[9999] transition-all duration-300 ease-in-out print:hidden"
    />
    <NuxtLoadingIndicator />
    <div
      id="layout"
      class="w-full flex flex-col min-h-screen overflow-x-hidden bg-white dark:bg-white mx-auto relative z-10"
    >
      <SiteHeader :about-data="commonDatasAboutUs" />
      <NuxtPage class="flex-grow" />
      <Footer :about-data="commonDatasAboutUs" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { setLocale, t } = useI18n();
useSeoMeta({
  title: "Hududgaz Farg'ona",
  ogTitle: "Hududgaz Farg'ona gaz ta'minot filiali",
  description: t("og_description"),
  ogDescription: t("og_description").slice(0, 160),
  keywords: t("og_keywords"),
  ogImage: "https://farhududgaz.uz/images/hududgaz.jpg",
  viewport: "width=device-width, initial-scale=1.0",
  googleSiteVerification: "mA68xDpmOKiKu8hHB5XOc3CmWbRLHc9wpLKjBrwKh_s",
  twitterCard: "summary_large_image",
  ogLocale: "uz_UZ",
  ogSiteName: "Hududgaz Farg'ona",
  ogUrl: "https://farhududgaz.uz",
});

useHead({
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});

import "swiper/swiper-bundle.css";
import { AboutUsService } from "./services/pages";
import { messengersService } from "./services/home";
import { storeToRefs } from "pinia";

const localeLang = useCookiesComposable();
const layoutRef = ref<HTMLElement | null>(null);
const scrollProgress = ref(0);
const showRating = ref<boolean>(false);
const isLoading = ref(true);

const store = previewImageMode();
const {
  previewImage,
  previewImageAnimate,
  modalBodyName,
  modalData,
  imagesListData,
} = storeToRefs(store);
const { handlePreview } = store;
const { setSocialLinks } = baseStore();

const showScrollToTopbtn = ref<boolean>(false);

const { data: aboutUs } = await AboutUsService.getAllData();
const commonDatasAboutUs = computed(() => aboutUs?.value && aboutUs?.value[0]);

const { data: socials, status: socialsStatus } =
  await messengersService.getAllMessengers();

if (socialsStatus.value === "success") {
  const socialsData = socials?.value && socials?.value[0];
  if (socialsData) {
    const result = socialsConstructor(socialsData);
    setSocialLinks(result);
  }
}

onMounted((): void => {
  layoutRef.value = document.getElementById("layout");
});

const classes = {
  blackWhite: "grayscale(100%)",
  hightContrast: "grayscale(100%) invert(100%)",
};

const screenZoom = (initialZoom: number) => {
  const values = {
    10: "0.1",
    20: "0.3",
    30: "0.5",
    40: "0.7",
    50: "1.0",
    60: "1.1",
    70: "1.2",
    80: "1.3",
    90: "1.4",
    100: "1.5",
  };
  return values[initialZoom as keyof typeof values];
};

const calcTextSize = (size: number) => {
  const values = {
    0: -6,
    10: -5,
    20: -4,
    30: -3,
    40: -2,
    50: 0,
    60: 2,
    70: 3,
    80: 5,
    90: 6,
    100: 7,
  };
  return 16 + values[size as keyof typeof values];
};

watch(accessibilityMode().$state, () => {
  if (layoutRef.value) {
    if (accessibilityMode().$state.filterColor !== "default") {
      layoutRef.value.style.filter =
        classes[accessibilityMode().$state.filterColor as keyof typeof classes];
    } else {
      layoutRef.value?.style.removeProperty("filter");
    }
    if (accessibilityMode().$state.screenZomm > 1) {
      layoutRef.value.style.zoom = screenZoom(
        accessibilityMode().$state.screenZomm
      );
    }
    if (accessibilityMode().$state.textSize >= 0) {
      const finallyValue = calcTextSize(accessibilityMode().$state.textSize);
      document.documentElement.style.setProperty(
        "--base-font-size",
        finallyValue + "px"
      );
    }
  }
});

//  Accessibilitys

// For loader screen
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});

onMounted(() => {
  const activeLanguage = localeLang.value;
  if (activeLanguage) {
    setLocale(activeLanguage);
  }
});

// Function to handle button click event
onMounted(() => {
  const userIsRated = localStorage.getItem("userIsRated");
  // For scroll progress bar
  window.addEventListener("scroll", updateScrollProgress);

  if (!userIsRated) {
    setTimeout(() => {
      showRating.value = true;
    }, 3000);
  }
});

const updateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = (scrollTop / docHeight) * 100;

  if (scrollTop > 200) {
    showScrollToTopbtn.value = true;
  } else {
    showScrollToTopbtn.value = false;
  }
};

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollProgress);
});

// Google Analytics
if (process.client) {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-D2QGQFW276";
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window?.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-D2QGQFW276");
  };
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap");

:root {
  --navbar-height: 84px;
  --site-header-height: 60px;
  --primary-color: #f0f2f8;
  --main-color: #ef7f1a;
  --main-color-hover: #ef7f1ad8;
  /* For Image swiper */
  --swiper-image-ratio: 33.3%;
  --swiper-width: 50%;
  --swiper-inactive-scale: 0.85;
  --swiper-mobile-width: 90%;
  --swiper-mobile-inactive-scale: 0.95;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  font-family: "Roboto";
  font-weight: normal;
  font-style: normal;
}

::selection {
  background: var(--main-color);
  color: #fff;
}
::-webkit-scrollbar {
  scroll-margin-right: 50px;
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #e4d5d5;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: var(--main-color);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  border-radius: 2px;
}

.no-image {
  /* background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%); */
  background: linear-gradient(270deg, #92d0ff 0%, #066978 100%);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}

.pdf-content {
  /* opacity: 0;
  position: absolute;
  pointer-events: none; */
  position: absolute;
  left: -9999px;
  top: -9999px;
  width: 210mm; /* A4 o'lchami */
}

/* div {
  page-break-inside: avoid; 
  page-break-after: always;
} */
</style>
