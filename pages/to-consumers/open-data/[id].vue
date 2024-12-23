<script setup lang="ts">
definePageMeta({
  navigate: false,
});
import { documentsService, openDatasService } from "~/services/pages";
const pdfContent = ref(null);

const route = useRoute();
const id = route.params.id;

const { data: documents } = await openDatasService.getOneById(id as string);

const { createPdf } = useGeneratePdf();

const download = () => {
  if (pdfContent.value) {
    createPdf(pdfContent.value, `${documents?.value?.title.slice(0, 50)}...`);
  }
};
</script>
<template>
  <div class="w-full">
    <NavigateBar />

    <UiContainer
      class="flex-col gap-[24px] pt-[40px] pb-[100px] lg:pt-[100px] lg:pb-[250px]"
    >
      <UiPageHeader
        :label="documents?.title || ''"
        @download-p-d-f="download"
        title-font-size-class="text-18px leading-[1.6875rem] sm:text-20px lg:text-[2rem] sm:leading-26px lg:leading-[2.75rem]"
        wrapper-class="items-start"
      />

      <div ref="pdfContent">
        <h3 class="hidden">
          {{ documents?.title || "" }}
        </h3>
        <p
          style="text-align: justify"
          class="text-16px leading-25px font-normal text-justify"
        >
          {{ documents?.desc || "" }}
        </p>
      </div>
    </UiContainer>
  </div>
</template>
