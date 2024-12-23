<template name="hero-section">
  <section
    class="relative z-10 w-full h-full min-h-[627px] sm:min-h-[914px] lg:min-h-972px] flex justify-center sm:justify-end items-start sm:items-end bg-white"
  >
    <div
      v-if="!accessibilityMode().noImage"
      class="absolute -z-10 w-full min-h-full"
    >
      <!-- <CardImageMode
        :path="getBgImage"
        :key="getBgImage"
        image-class="w-full h-full object-cover min-h-[627px] sm:min-h-[914px] lg:min-h-972px]"
      /> -->
      <SliderHero :data="data?.rows" :activeImgIndex="activeImage" />
    </div>
    <div v-else class="w-full min-h-full absolute -z-10">
      <div class="no__image"></div>
    </div>

    <div
      class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 -z-10"
    />

    <UiContainer
      class="flex-col justify-center sm:justify-end pb-[80px] pt-[132px] sm:pb-[100px] sm:pt-[145px] lg:pt-[206px]"
    >
      <div class="w-full sm:max-w-[610px] lg:max-w-[778px]">
        <UiButton
          type="outlined"
          class="w-max flex lg:hidden py-[10px] px-[10px] mb-[80px] sm:mb-[90px] border-white hover:border-primary-color"
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
        </UiButton>

        <SliderText :data="data?.rows" :getActiveIndex="getActiveIndex" />
        <UiButton
          to="/news"
          @click="() => changeActivemenu('', 'news')"
          class="py-[12px] px-[36px] text-[1.25rem] leading-5 mt-[60px] sm:mt-[80px] lg:mt-[40px]"
          type="primary"
          >{{ $t("more") }}</UiButton
        >

        <div class="hidden sm:flex gap-x-[24px] mt-[124px] lg:mt-[80px]">
          <div
            v-for="herolink in heroLinks"
            :key="herolink.label"
            class="w-full max-w-[235px] lg:max-w-[332px]"
          >
            <div
              class="flex justify-between items-center gap-[4px] bg-white hover:bg-primary-color text-primary-color hover:text-white px-[12px] py-[13px] lg:px-[18px] lg:py-[23px] uppercase transition-all cursor-pointer"
              @click="() => changeActivemenu('Consumer', herolink.link)"
            >
              <span
                class="line-clamp-1 text-13px leading-4 lg:text-[1.125rem] lg:leading-[1.4375rem] font-bold"
              >
                {{ herolink.label }}
              </span>
              <svg
                :width="getIconSize"
                :height="getIconSize"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0249 4.94165L17.0832 9.99998L12.0249 15.0583"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.9165 10H16.9415"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <CardImageMode
              :path="herolink.image"
              image-class="w-full h-[64px] lg:h-[90px] object-contain"
            />
          </div>
        </div>
      </div>
    </UiContainer>

    <div
      class="hidden md:flex flex-col gap-y-[20px] absolute top-[50%] right-[59px] translate-y-[-50%]"
    >
      <div
        v-for="link in socialLinks"
        class="flex items-center justify-center w-[36px] h-[36px] bg-[#FFFFFF52] hover:bg-primary-color text-white transition-all rounded-full backdrop-blur-[7px]"
        @click="openLink(link.link)"
      >
        <MyIcon :name="link.name" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
const { socialLinks } = baseStore();
import { getHerolidesData } from "~/services/home";

const { width } = useWindowSize();
const $t = useI18n().t;
const activeImage = ref(0);

const getActiveIndex = (index: number) => {
  activeImage.value = index;
};

const getBgImage = computed(() => {
  if (data.value?.rows) {
    return data?.value.rows[activeImage.value]?.photos[0];
  } else {
    return "image not found";
  }
});

interface IQuery {
  limit: number;
  page: number;
}
const query = reactive<IQuery>({
  limit: 10,
  page: 1,
});
const { data } = await getHerolidesData.getAllWithPaginate(query);

const changeActivemenu = (accessor: string, link: string) => {
  navigateTo(link);
  const [_, subitem] = link.split("/").filter(Boolean);
  const parentLink = accessor ? accessor : link;

  baseStore().setparentMenu(parentLink);
  if (subitem) {
    baseStore().setsubMenu(link);
  }
};

const getIconSize = computed(() => {
  return width.value <= 1024 ? "20" : "24";
});

const openLink = (link: string) => {
  window.open(link, "_blank");
};

const heroLinks = computed(() => [
  {
    label: $t("get_gas_balloons"),
    link: "/to-consumers/liquefied-gas",
    image: "/images/get_gas_balloons.png",
  },
  {
    label: $t("gas_consumers"),
    link: "/to-consumers/natural-gas",
    image: "/images/gas_consumers.png",
  },
]);
</script>

<style scoped>
.no__image {
  height: 890px;
  position: relative;
}

.no__image::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(270deg, #ace4df 0%, #ef7f1a 100%);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
}
.image__hero {
  position: relative;
}
.image__hero::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: linear-gradient(270deg, #ef7f1a 0%, #ace4df 100%);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 10;
}

@media screen and (max-width: 768px) {
  .hero__section::after {
    background-position: center;
  }
}
</style>
