<script lang="ts" setup>
import type { PropType } from "vue";
import type { Media } from "~/types/home";
defineProps({
  data: {
    type: Array as PropType<Media[]>,
    required: true,
  },
});
const { handlePreview } = previewImageMode();
</script>
<template>
  <div
    class="w-full hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-[16px] sm:gap-y-[24px] sm:gap-x-[20px] lg:gap-x-[22px]"
  >
    <CardImageMode
      v-for="item in data"
      :path="item.photo as string"
      class="w-full md:first:col-span-2 col-span-1 md:[&:nth-child(5n)]:col-span-2 h-[276px] sm:h-[185px] lg:h-[350px] cursor-pointer"
      :handlePreview="() => handlePreview(item.photo as string, [])"
    />
  </div>
</template>
