<script setup lang="ts">
import { naturalgasconsumersService } from "~/services/pages";

definePageMeta({
  title: "to_consumers",
  desc: "to_consumers",
});

const { data } = await naturalgasconsumersService.getAll();

const naturalGasConsummers = computed(() =>
  data.value?.map((item) => ({
    title: item.title,
    contentList: item.desc,
  }))
);
const $t = useI18n().t;
const pdfContent = ref(null);

const { createPdf } = useGeneratePdf();

const download = () => {
  if (pdfContent.value) {
    createPdf(pdfContent.value, `${$t("to_consumers_title").slice(0, 50)}...`);
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
        :label="$t('to_consumers_title')"
        :is-uppercase="false"
        @download-p-d-f="download"
      />

      <div ref="pdfContent" class="flex flex-col gap-y-[20px] lg:gap-y-[24px]">
        <!-- For pdf document -->
        <h3 class="hidden">{{ $t("to_consumers_title") }}</h3>
        <div
          class="p-[15px] lg:p-[24px] bg-grey-background-color"
          v-for="item in naturalGasConsummers"
          :key="item.title"
        >
          <p
            class="text-18px leading-23px lg:text-16px lg:leading-20px mb-[20px] text-main-text-color font-medium"
          >
            {{ $t(item.title) }}
          </p>
          <div class="flex flex-col gap-y-[16px] pl-[10px] lg:pl-[18px]">
            <p
              style="text-align: justify"
              class="text-16px leading-21px text-main-text-color font-normal"
            >
              {{ item.contentList }}
            </p>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>
