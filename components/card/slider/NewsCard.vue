<script lang="ts" setup>
import type { News } from "~/types/home";

defineProps({
  data: {
    type: Object as PropType<News>,
    required: true,
  },
  widthClass: {
    type: String,
    default: "w-full",
  },
  heightClass: {
    type: String,
    default: "h-[139px] xl:h-[267px]",
  },
  textClass: {
    type: String,
    default: "text-white",
  },
  borderClass: {
    type: String,
    default: "border-white/20",
  },
  type: {
    type: String,
    default: "news",
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
  <div class="h-full flex flex-col gap-y-[12px]" :class="widthClass">
    <CardImageMode
      :path="data.photos[0]"
      :handle-preview="() => handlePreview(data.photos[0], data.photos)"
      class="object-contain aspect-video"
      :class="[heightClass, widthClass]"
    />
    <span
      class="font-medium text-xs leading-3 xl:text-14px xl:leading-14px"
      :class="textClass"
      >{{ dateFormater(data.date, months, $t) }}</span
    >
    <p
      class="font-bold text-15px leading-5 lg:text-lg gl:leading-23px uppercase line-clamp-2 flex-grow"
      :class="textClass"
    >
      {{ data.title }}
    </p>
    <div class="border-t pt-4" :class="borderClass">
      <UiButton
        type="link"
        :to="
          type == 'news' ? `/news/${data.id}` : `/anti-corruption/${data.id}`
        "
        >{{ $t("more") }}</UiButton
      >
    </div>
  </div>
</template>
