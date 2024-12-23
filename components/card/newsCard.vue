<script setup lang="ts">
import type { News } from "~/types/home";

defineProps({
  data: {
    type: Object as PropType<News>,
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

const { handlePreview } = previewImageMode();
</script>

<template>
  <div class="w-full flex flex-col">
    <div
      class="flex flex-col gap-[16px] lg:gap-[24px] pb-[24px] sm:pb-[20px] lg:pb-[48px] px-[12px] lg:px-[24px] pt-[15px] lg:pt-[24px] bg-grey-background-color"
    >
      <span class="font-medium text-14px leading-14px text-main-text-color">
        {{ dateFormater(data.date, months, $t) }}
      </span>
      <NuxtLink
        :to="`/news/${data.id}`"
        class="text-15px leading-20px sm:text-14px lg:text-18px sm:leading-18px lg:leading-23px text-main-text-color hover:text-primary-color hover:underline font-bold uppercase line-clamp-2 transition-all cursor-pointer"
      >
        {{ data.title }}
      </NuxtLink>
    </div>
    <CardImageMode
      :path="data.photos[0]"
      class="w-full h-full block max-h-[200px] sm:max-h-[140px] lg:max-h-[295px] object-fill cursor-pointer"
      :handle-preview="() => handlePreview(data.photos[0], data.photos)"
    />
  </div>
</template>
