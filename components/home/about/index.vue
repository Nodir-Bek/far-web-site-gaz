<script setup lang="ts">
import { AboutUsService } from "~/services/pages";
import { useWindowSize } from "@vueuse/core";

const width = useWindowSize().width;

interface IQuery {
  limit: number;
  page: number;
  date?: string;
}

const query = reactive<IQuery>({
  limit: 10,
  page: 1,
});

const { data: aboutUs } = await AboutUsService.getAllPaginate(query);

const changeActivemenu = (accessor: string, link: string) => {
  navigateTo(link);
  const [_, subitem] = link.split("/").filter(Boolean);
  const parentLink = accessor ? accessor : link;
  baseStore().setparentMenu(parentLink);
  if (subitem) {
    baseStore().setsubMenu(link);
  }
};
</script>

<template>
  <section
    class="w-full relative"
    :class="width >= 1352 ? 'about-wrapper' : ''"
  >
    <UiContainer
      class="flex-col sm:flex-row gap-y-[40px] sm:gap-y-0 sm:gap-x-[28px] lg:gap-x-[60px] py-[80px] sm:py-[100px] lg:py-[140px]"
    >
      <div
        class="w-full sm:max-w-[305px] lg:max-w-[550px] min-[1250px]:max-w-[700px] min-[1350px]:max-w-[807px] order-2 sm:order-1"
      >
        <SliderImage
          :data="aboutUs?.rows"
          width-class="w-full"
          image-height-class="h-[207px] sm:h-[225px] lg:h-[497px]"
        />
      </div>

      <div class="flex-grow order-1 sm:order-2">
        <UiSubTitle class="mb-[10px] lg:mb-[12px]" :label="$t('about')" />
        <h1
          class="w-full text-18px leading-[1.5rem] lg:text-[2.25rem] lg:leading-[2.875rem] font-bold text-main-text-color text-left mb-[12px] lg:mb-[24px] uppercase"
        >
          {{ $t("about_title") }}
        </h1>
        <p
          class="text-main-text-color font-medium text-13px leading-5 sm:text-[1rem] sm:leading-[1.5625rem] line-clamp-[10] mb-[40px] sm:mb-[30px] lg:mb-[50px]"
          v-html="aboutUs?.rows[0]?.content"
        />

        <UiButton
          to="/about-us"
          @click="changeActivemenu('about', '/about-us')"
          type="outlined"
          class="py-[10px] px-[24px] lg:py-[12px] lg:px-[36px]"
        >
          {{ $t("more") }}
        </UiButton>
      </div>
    </UiContainer>
  </section>
</template>

<style lang="css" scoped>
.about-wrapper::before {
  content: "";
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #f6f6f6;
  width: 829px;
  height: 482px;
  z-index: -1;
}
</style>
