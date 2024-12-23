<script lang="ts" setup>
import type { News } from "~/types/home";

defineProps({
  data: {
    type: Object as PropType<News>,
    required: true,
  },
  isDesc: {
    type: Boolean,
    default: false,
  },
  widthClass: {
    type: String,
    default: "w-full",
  },
  lineClamp: {
    type: String,
    default: "line-clamp-1",
  },
  titleClass: {
    type: String,
    default: "text-white",
  },
});
const { handlePreview } = previewImageMode();
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
  <div class="relative h-max" :class="widthClass">
    <CardImageMode
      :path="data.photos[0]"
      :handle-preview="() => handlePreview(data.photos[0], data.photos)"
      class="object-cover aspect-video h-[305px]"
      :class="widthClass"
    />
    <div
      @click="() => navigateTo(`/news/${data.id}`)"
      class="flex flex-col gap-[10px] absolute bottom-0 w-full bg-[#0317218C] hover:bg-primary-color px-[15px] py-[12px] transition-all cursor-pointer"
    >
      <span
        class="font-medium text-xs leading-3 lg:text-15px lg:leading-15px text-white"
        >{{ dateFormater(data.date, months, $t) }}</span
      >
      <p
        class="font-bold text-15px leading-15px text-white uppercase"
        :class="lineClamp"
      >
        {{ data.title }}
      </p>
      <p
        v-if="isDesc"
        class="font-medium text-13px leading-4 lg:text-[1rem] lg:leading-5 text-white line-clamp-2"
      >
        {{ data.desc }}
      </p>
    </div>
  </div>
</template>
