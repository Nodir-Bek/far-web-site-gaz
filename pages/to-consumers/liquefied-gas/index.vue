<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { liquefiedgasconsumersService } from "~/services/pages";
import PdfTemplate from "~/components/pdf-templates/collapseV3/index.vue";
definePageMeta({
  title: "liquefied-gas",
  desc: "liquefied-gas",
});

const width = useWindowSize().width;

const { data } = await liquefiedgasconsumersService.getAll();

const pdfContent = ref(null);
const $t = useI18n().t;
const { createPdf } = useGeneratePdf();

const download = () => {
  if (pdfContent.value) {
    createPdf(pdfContent.value, $t("liquefied-gas"));
  }
};
</script>
<template>
  <div class="w-full">
    <NavigateBar />

    <UiContainer
      class="flex-col gap-[24px] pt-[40px] pb-[100px] lg:pt-[100px] lg:pb-[100px] relative"
    >
      <UiPageHeader
        :label="$t('liquefied-gas')"
        @download-p-d-f="download"
        title-font-size-class="text-18px leading-[1.6875rem] sm:text-20px lg:text-[2rem] sm:leading-26px lg:leading-[2rem]"
      />

      <div
        class="flex flex-col gap-y-[16px] lg:gap-y-[20px] bg-grey-background-color border-l-[8px] border-primary-color px-[14px] py-[20px] sm:py-[10px] sm:px-[20px] lg:py-[24px] lg:px-[30px]"
      >
        <p class="text-16px leading-22px text-primary-color font-medium">
          {{ data && data[0]?.title }}
        </p>

        <p class="text-16px leading-25px text-main-text-color font-normal">
          {{ data && data[0]?.desc }}
        </p>

        <CardImageMode
          class="hidden"
          :path="(data && data[0]?.photo) || ''"
          image-class="mt-[30px] sm:mt-[60px] lg:mt-[140px] w-full block object-contain"
        />
      </div>

      <UiCollapseV3
        :items="(data?.length && data[0].procedures) || []"
        wrapper-class="relative w-full flex flex-col gap-y-[24px] mt-[16px] sm:mt-[8px] lg:mt-[36px]"
      />
      <div
        v-if="!accessibilityMode().noImage"
        :class="width > 640 ? 'collapse-bg' : ''"
        class="absolute bottom-1/2 right-0 w-full h-full max-w-[753px] max-h-[544px]"
      />

      <CardImageMode
        v-if="!accessibilityMode().noImage"
        :path="(data && data[0]?.photo) || ''"
        image-class="mt-[30px] sm:mt-[60px] lg:mt-[140px] w-full block object-contain"
      />
      <div class="hidden" ref="pdfContent">
        <h3 class="hidden">{{ $t("liquefied-gas") }}</h3>
        <PdfTemplate :data="data" />
      </div>
    </UiContainer>
  </div>
</template>

<style scoped>
.collapse-bg::after {
  content: "";
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  right: -88px;
  background: url("/images/bg/liquefied_bg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right top;
  z-index: -1;
}
</style>
