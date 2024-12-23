<script setup lang="ts">
import { antiCorruptonService, NewsService } from "~/services/pages";
import type { News } from "~/types/home";

definePageMeta({
  title: "anti-corruption",
  desc: "anti-corruption",
});

interface IQuery {
  limit: number;
  page: number;
  date?: string;
}

const query = reactive<IQuery>({
  limit: 12,
  page: 1,
});

const date = ref<string>(new Date().toISOString().slice(0, 10));
watch(
  () => date,
  () => {
    if (date.value) {
      query.date = date.value;
    } else {
      delete query.date;
    }
  },
  {
    deep: true,
  }
);

const { data: corruptionDatas } =
  await antiCorruptonService.getAllDataWithPaginate(query);
</script>

<template>
  <div class="w-full">
    <NavigateBar />
    <UiContainer
      class="flex-col gap-[24px] pt-[60px] sm:pt-[40px] pb-[100px] lg:pt-[80px] lg:pb-[140px]"
    >
      <div class="flex flex-col gap-y-[14px]">
        <div class="flex gap-[24px] gap-y-[14px] justify-between items-center">
          <h3
            class="text-20px leading-26px sm:text-24px lg:text-[2rem] sm:leading-24px lg:leading-[2rem] text-main-text-color font-bold uppercase"
          >
            {{ $t("anti-corruption-title") }}
          </h3>

          <UiDateInput v-model="date" />
        </div>
      </div>

      <UiEmpty
        :is-empty="!corruptionDatas?.rows || corruptionDatas.rows.length == 0"
      >
        <div
          class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[32px] sm:gap-y-[40px] lg:gap-y-[30px] gap-x-[24px]"
        >
          <CardSliderNewsCard
            v-for="item in corruptionDatas?.rows"
            :data="item as News || {}"
            width-class="w-full "
            type="anti-corruption"
            height-class="h-[198px] sm:h-[216px] lg:h-[267px]"
            text-class="text-main-text-color"
            border-class="border-main-text-color/20"
          />
        </div>
      </UiEmpty>

      <div
        class="w-full flex justify-center dark:last:disabled: first:rounded-s-none mt-[36px]"
      >
        <UPagination
          v-if="corruptionDatas?.count && corruptionDatas?.count > query.limit"
          v-model="query.page"
          :page-count="query.limit"
          :total="corruptionDatas?.count || 0"
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
