<script setup lang="ts">
definePageMeta({
  title: "honorary_personnel",
  desc: "honorary_personnel",
});

import { cityGovernmentService, managementService } from "~/services/pages";
import PdfTemplate from "~/components/pdf-templates/users-card/index.vue";

const query = reactive({
  status: 2,
});
const { data } = await managementService.getAllManagers(query);

const pdfContent = ref(null);
const $t = useI18n().t;

const { createPdf } = useGeneratePdf();

const download = () => {
  if (pdfContent.value) {
    createPdf(pdfContent.value, $t("honorary_personnel_title"));
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
        :label="$t('honorary_personnel_title')"
        @download-p-d-f="download"
      />

      <div
        class="grid grid-cols-1 min-[750px]:grid-cols-2 gap-y-[8px] md:gap-y-[24px] gap-x-[24px]"
      >
        <!-- For pdf document -->
        <h1 class="hidden">{{ $t("honorary_personnel_title") }}</h1>
        <CardHonoraryCard
          v-for="(item, index) in data"
          :key="index"
          :data="item"
        />
      </div>
      <div ref="pdfContent" class="hidden">
        <h3 class="hidden" style="text-transform: capitalize">
          {{ $t("honorary_personnel_title") }}
        </h3>
        <PdfTemplate :data="data" />
      </div>
    </UiContainer>
  </div>
</template>
