<script setup lang="ts">
import { StatisticsInNumber } from "~/services/home";

const { data } = await StatisticsInNumber();

const statistic = computed(() =>
  data.value?.map((item) => ({
    count: formatNumber(item.number),
    label: item?.title,
  }))
);
</script>

<template>
  <section class="w-full">
    <UiContainer class="py-[80px] sm:py-[100px] lg:py-[140px]">
      <div
        class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-[32px] sm:gap-x-[20px] lg:gap-x-[40px]"
      >
        <div
          class="flex flex-col gap-y-[12px] lg:gap-y-[20px] pl-[16px] lg:pl-[18px] border-l-[3px] border-primary-color"
          v-for="item in statistic"
          :key="item?.label"
        >
          <span
            class="text-[1.25rem] leading-5 lg:text-[2.25rem] lg:leading-[2.25rem] text-primary-color font-bold"
            >{{ item?.count }}</span
          >
          <span
            class="text-14px leading-[1.3125rem] lg:text-[1rem] lg:leading-6 text-secondary-text-color font-medium line-clamp-2"
            >{{ item?.label }}</span
          >
        </div>
      </div>
    </UiContainer>
  </section>
</template>
