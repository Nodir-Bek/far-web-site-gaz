<script setup lang="ts">
import type { Document } from "~/types/home";

defineProps({
  data: {
    type: Object as PropType<Document>,
    required: true,
  },
});

const $t = useI18n().t;
const months = computed(() => [
  $t("yanvar"),
  $t("fevral"),
  $t("mart"),
  $t("aprel"),
  $t("may"),
  $t("iyun"),
  $t("iyul"),
  $t("avgust"),
  $t("sentabr"),
  $t("oktabr"),
  $t("noyabr"),
  $t("dekabr"),
]);
</script>

<template>
  <div
    class="w-full py-[16px] px-[12px] sm:py-[24px] sm:px-[24px] border border-[#E7EAF2]"
  >
    <h4
      class="mb-[16px] sm:mb-[20px] lg:mb-[12px] text-16px leading-20px sm:text-20px sm:leading-26px font-bold text-primary-color text-left uppercase line-clamp-3 sm:line-clamp-1"
    >
      {{ data?.title }}
    </h4>
    <p
      class="mb-[16px] sm:mb-[32px] lg:mb-[24px] text-15px leading-23px sm:text-16px sm:leading-25px font-medium text-main-text-color text-justify"
    >
      {{ data?.desc }}
    </p>

    <div
      class="flex flex-col gap-y-[40px] min-[400px]:flex-row justify-between min-[400px]:items-center"
    >
      <UiButton
        :to="`/to-consumers/open-data/${data.id}`"
        custom-classes="w-max order-2 min-[400px]:order-1 px-[32px] py-[10px] text-15px leading-15px lg:text-16px lg:leading-20px"
        type="outlined"
        >{{ $t("more") }}</UiButton
      >

      <p
        class="order-1 min-[400px]:order-2 font-medium text-14px leading-14px text-main-text-color"
      >
        {{ dateFormater(data.date, months, $t) }}
      </p>
    </div>
  </div>
</template>
