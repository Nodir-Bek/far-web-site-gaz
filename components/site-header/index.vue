<script setup lang="ts">
import { menuItems } from "../navbar/helper";
const { socialLinks } = baseStore();

const isMobileMenuOpen = ref(false);
const route = useRoute();
defineProps({
  aboutData: Object,
});

const loopingText = ref(null);
const container = ref(null);
const handleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const $t = useI18n().t;
onMounted(() => {
  if (typeof window !== "undefined") {
    const text = loopingText.value;
    const containerWidth = container?.value?.clientWidth; // Konteyner kengligi
    let x = containerWidth;

    function moveText() {
      x -= 1;
      text.style.transform = `translateX(${x}px)`;

      if (x < -text.offsetWidth) {
        x = containerWidth;
      }
      requestAnimationFrame(moveText);
    }

    moveText();
  }
});

const { showModal } = previewImageMode();

const handleSearch = () => {
  showModal("SearchNews", null);
};
</script>
<template>
  <div
    class="w-full"
    ref="container"
    :class="route.path === '/' ? 'absolute top-0 z-40' : 'static '"
  >
    <div
      :class="route.path === '/' ? 'text-white' : 'text-main-text-color'"
      class="absolute whitespace-nowrap text-[1rem] z-50 bg-inherit"
      ref="loopingText"
    >
      {{ $t("test_mode") }}
    </div>
    <div
      class="h-[64px] sm:h-[102px] flex flex-col justify-center w-full print:hidden bg-[#F6F6F6]"
      :class="
        route.path === '/'
          ? 'bg-[#FFFFFF17] backdrop-blur-[16px]'
          : 'bg-[#F6F6F6]'
      "
    >
      <UiContainer class="flex-col">
        <div class="w-full flex justify-between items-center gap-x-[50px]">
          <NuxtLink to="/" class="shrink-0">
            <img
              v-if="route.path === '/'"
              src="/images/logo.png"
              alt="logo"
              class="w-[147px] h-[21px] sm:w-[187px] sm:h-[27px] xl:w-[286px] xl:h-[42px] object-contain"
            />
            <img
              v-else
              src="/images/logo_dark.png"
              alt="logo"
              class="w-[147px] h-[21px] sm:w-[187px] sm:h-[27px] xl:w-[286px] xl:h-[42px] object-contain"
            />
          </NuxtLink>
          <div class="flex items-center gap-x-[32px]">
            <MyIcon
              name="SearchIcon"
              :color="route.path === '/' ? '#fff' : '#052939'"
              class="hidden min-[480px]:block cursor-pointer"
              @click="handleSearch"
            />
            <MyIcon
              class="cursor-pointer"
              name="EyeGlasses"
              @click="accessibilityMode().toggleAccessibilityModal"
              :color="route.path === '/' ? '#fff' : '#052939'"
              :is-dark="route.path === '/' ? false : true"
            />
            <div
              class="hidden min-[480px]:flex justify-start items-center left_item z-50 text-white"
            >
              <UiLangSelect />
            </div>

            <div class="flex items-center gap-x-[40px]">
              <div
                class="hidden lg:flex justify-center items-center gap-[16px]"
              >
                <MyIcon
                  name="CallIcon"
                  :is-dark="route.path === '/' ? false : true"
                />
                <div
                  class="text-white flex flex-col gap-y-[6px] justify-center items-start"
                >
                  <span
                    class="font-medium text-13px leading-13px"
                    :class="
                      route.path === '/'
                        ? 'text-white/50'
                        : 'text-main-text-color/40'
                    "
                  >
                    {{ $t("hotline_phone") }}
                  </span>
                  <a
                    :href="`tel:${aboutData?.phone}`"
                    class="font-bmediumold text-[1.25rem] leading-5"
                    :class="
                      route.path === '/' ? 'text-white' : 'text-main-text-color'
                    "
                  >
                    {{ aboutData?.phone }}
                  </a>
                </div>
              </div>
              <NuxtLink
                to="https://cabinetaskug.hududgaz.uz/"
                target="_blank"
                class="py-[15px] px-[16px] border-white hover:border-primary-color text-primary-color bg-transparent border hover:bg-primary-color hover:text-white font-medium active:bg-press-color"
                :class="route.path === '/' ? 'hidden lg:flex' : 'hidden'"
              >
                <div class="flex items-center gap-x-[10px]">
                  <span class="text-15px leading-15px text-white">{{
                    $t("cabinet")
                  }}</span>
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.8335 14.6666L14.1668 6.33325M14.1668 6.33325H5.8335M14.1668 6.33325V14.6666"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </NuxtLink>

              <button
                class="block lg:hidden px-[8px] py-[12px] bg-primary-color transition-all uppercase active:bg-press-color"
                @click="isMobileMenuOpen = !isMobileMenuOpen"
              >
                <svg
                  width="24"
                  height="16"
                  viewBox="0 0 24 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 16H24V13.3333H0V16ZM0 9.33333H24V6.66667H0V9.33333ZM0 0V2.66667H24V0H0Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </UiContainer>
    </div>

    <NavbarMobileMenu
      :open="isMobileMenuOpen"
      :menus="menuItems"
      :social-links="socialLinks"
      @togglefn="handleMobileMenu"
    />
    <Navbar />
  </div>
</template>

<style scoped></style>
