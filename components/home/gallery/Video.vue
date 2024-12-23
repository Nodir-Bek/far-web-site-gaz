<script lang="ts" setup>
import type { PropType } from "vue";
import type { Media } from "~/types/home";
defineProps({
  data: {
    type: Array as PropType<Media[]>,
    required: true,
  },
});
</script>
<template>
  <div
    class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-[16px] sm:gap-y-[24px] sm:gap-x-[20px] lg:gap-x-[22px]"
  >
    <iframe
      v-for="item in data"
      :key="item.id"
      class="w-full col-span-1 h-[276px] sm:h-[185px] lg:h-[350px]"
      :src="item.media as string"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
  </div>
</template>
