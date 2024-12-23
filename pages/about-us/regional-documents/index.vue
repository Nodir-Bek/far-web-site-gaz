<script setup lang="ts">
import { documentsService, regionalDocumentsService } from "~/services/pages";
definePageMeta({
  title: "regional_documents",
  desc: "regional_documents",
});

interface IQuery {
  limit: number;
  page: number;
  year?: string;
  category?: string;
}
const query = reactive<IQuery>({
  limit: 9,
  page: 1,
});

const { data: documents } = await regionalDocumentsService.getAllWithPaginate(query);
</script>

<template>
  <div class="w-full">
    <NavigateBar />
    <UiContainer
      class="flex-col gap-[14px] sm:gap-[40px] lg:gap-[32px] pt-[40px] pb-[100px] lg:pt-[100px] lg:pb-[100px]"
    >
      <h2
        class="text-18px leading-27px sm:text-20px sm:leading-26px font-bold text-main-text-color text-left uppercase"
      >
        {{ $t("regional_documents") }}
      </h2>

      <UiEmpty :is-empty="!documents?.rows || !documents?.rows.length">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
        >
          <CardFile v-for="doc in documents?.rows" :key="doc.id" :data="doc" />
        </div>
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
