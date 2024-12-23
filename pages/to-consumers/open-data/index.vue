<script setup lang="ts">
import { documentsService, openDatasService } from "~/services/pages";
import type { Document, Documents } from "~/types/home";
definePageMeta({
  title: "open-data",
  desc: "open-data",
});

const pdfContent = ref(null);

interface IQuery {
  limit: number;
  page: number;
  year?: string;
}
const query = reactive<IQuery>({
  limit: 6,
  page: 1,
});

const { data: documents } = await openDatasService.getDatasPaginate(query);

const { createPdf } = usePdfMake();

const download = () => {
  if (pdfContent.value) {
    createPdf(pdfContent.value);
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
        :label="$t('open-data')"
        :hide-button="true"
        title-font-size-class="text-18px leading-[1.6875rem] sm:text-20px lg:text-[2rem] sm:leading-26px lg:leading-[2rem]"
      />

      <UiEmpty
        :is-empty="!documents?.rows || documents.rows.length === 0"
        class="flex flex-col gap-[16px] sm:gap-[12px] lg:gap-[24px]"
      >
        <CardOpenData
          v-for="document in documents?.rows"
          :key="document.id"
          :data="document as Document || {}"
        />
      </UiEmpty>

      <div
        class="w-full flex justify-center dark:last:disabled: first:rounded-s-none"
      >
        <UPagination
          v-if="documents?.count && documents?.count > query.limit"
          v-model="query.page"
          :page-count="query.limit"
          :total="documents?.count || 0"
          :max="5"
          :ui="{
            wrapper: 'flex items-center gap-[8px]',
            base: 'w-[40px] h-[40px] flex items-center justify-center text-[1rem] leading-[1.25rem] border border-[#E7EAF2] shadow-none ring-0',
            rounded:
              'dark:last:bg-white dark:last:text-secondary-light dark:first:bg-white dark:first:text-secondary-light dark:first:disabled:bg-white dark:first:disabled:text-secondary-light dark:last:disabled:bg-white dark:last:disabled:text-secondary-light last:rounded-e-none  first:rounded-s-none',
            default: {
              activeButton: {
                class:
                  'bg-brand-color dark:bg-brand-color dark:hover:bg-brand-color/80 hover:bg-brand-color/80 dark:ring-0 dark:text-white rounded-none',
              },
              inactiveButton: {
                class:
                  'bg-transparent dark:bg-white dark:hover:bg-brand-color/90 dark:text-secondary-light dark:hover:text-white',
              },
            },
          }"
        />
      </div>
    </UiContainer>
  </div>
</template>
