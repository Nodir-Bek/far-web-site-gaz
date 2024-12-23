<script setup lang="ts">
definePageMeta({
  title: "management",
  desc: "management",
});

import { managementService } from "~/services/pages";
import PdfTemplate from "~/components/pdf-templates/users-card/index.vue";

const query = reactive({
  status: 1,
});
const { data } = await managementService.getAllManagers(query);

const pdfContent = ref(null);
const $t = useI18n().t;

const { createPdf } = useGeneratePdf();

const download = () => {
  if (pdfContent.value) {
    createPdf(pdfContent.value, $t("management_title"));
  }
};
</script>
<template>
  <div class="w-full">
    <NavigateBar />

    <UiContainer
      class="flex-col gap-[24px] pt-[40px] pb-[100px] lg:pt-[100px] lg:pb-[100px]"
    >
      <UiPageHeader
        :label="$t('management_title')"
        @download-p-d-f="download"
      />

      <div
        class="grid grid-cols-1 min-[750px]:grid-cols-2 gap-y-[8px] md:gap-y-[24px] gap-x-[24px]"
      >
        <CardDeputyCard
          v-for="(item, index) in data"
          :key="index"
          :data="item"
        />
      </div>
      <!-- For pdf generation -->
      <div class="hidden" ref="pdfContent">
        <h3>
          {{ $t("management_title") }}
        </h3>
        <PdfTemplate :data="data" />
      </div>
      <div
        class="flex flex-col gap-[20px] sm:gap-[12px] lg:gap-[32px] p-[20px] sm:p-[24px] lg:p-[32px] bg-primary-color mt-[16px] lg:mt-[66px]"
      >
        <div class="flex flex-col gap-[12px] lg:gap-[16px]">
          <p
            class="text-16px leading-16px lg:text-20px lg:leading-20px font-bold text-left text-white uppercase"
          >
            {{ $t("management_anouns_title") }}
          </p>
          <p
            class="text-15px leading-22px lg:text-16px lg:leading-25px font-normal text-white text-justify"
          >
            {{ $t("management_anouns_desc") }}
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 min-[880px]:grid-cols-3 gap-y-[20px] pt-[20px] sm:pt-[24px] lg:pt-[32px] border-t border-[#FFFFFF]/40"
        >
          <div
            class="flex gap-[12px] lg:gap-[26px] text-15px leading-15px lg:text-20px lg:leading-20px text-white font-medium"
          >
            <span
              class="uppercase text-15px leading-15px lg:text-20px lg:leading-20px text-white font-medium"
              >{{ $t("hotline_phone") }}:</span
            >
            <span
              class="text-15px leading-15px lg:text-20px lg:leading-20px text-white font-medium"
              >73-229-04-35</span
            >
          </div>
          <div
            class="flex gap-[12px] lg:gap-[26px] text-15px leading-15px lg:text-20px lg:leading-20px text-white font-medium min-[880px]:border-x min-[880px]:border-white/40 min-[880px]:justify-center"
          >
            <span
              class="uppercase text-15px leading-15px lg:text-20px lg:leading-20px text-white font-medium"
              >{{ $t("call_center") }}:</span
            >
            <span
              class="text-15px leading-15px lg:text-20px lg:leading-20px text-white font-medium"
              >73-229-04-06</span
            >
          </div>
          <div
            class="flex gap-[12px] lg:gap-[26px] text-15px leading-15px lg:text-20px lg:leading-20px text-white font-medium min-[880px]:pl-[24px] lg:pl-[80px]"
          >
            <span
              class="uppercase text-15px leading-15px lg:text-20px lg:leading-20px text-white font-medium"
              >{{ $t("short_number") }}:</span
            >
            <span
              class="text-15px leading-15px lg:text-20px lg:leading-20px text-white font-medium"
              >1104</span
            >
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>
