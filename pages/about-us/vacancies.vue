<script setup lang="ts">
import { vacanciesService } from "~/services/pages";

definePageMeta({
  title: "vacancies",
  desc: "vacancies",
});

const { data } = await vacanciesService.getAllVacancies();
const vacancies = computed(() =>
  data.value?.map((vItem) => ({
    title: vItem.title,
    content: vItem.desc,
  }))
);
const pdfContent = ref(null);
const $t = useI18n().t;

const { createPdf } = useGeneratePdf();

const download = () => {
  if (pdfContent.value) {
    createPdf(pdfContent.value, $t("vacancies_title"));
  }
};
</script>
<template>
  <div class="w-full">
    <NavigateBar />

    <UiContainer
      class="flex-col gap-[24px] pt-[40px] pb-[100px] lg:pt-[100px] lg:pb-[100px]"
    >
      <UiPageHeader :label="$t('vacancies_title')" @download-p-d-f="download" />

      <UiCollapseV2 :items="vacancies" />
    </UiContainer>

    <div ref="pdfContent" class="hidden">
      <div>
        <h3>{{ $t("vacancies_title") }}</h3>
      </div>
      <div v-for="(item, idx) in vacancies" :key="idx">
        <h4 class="font-bold">{{ idx + 1 }}. {{ item.title }}</h4>
        <p style="margin-left: 20px">- {{ item.content }}</p>
      </div>
    </div>
  </div>
</template>
