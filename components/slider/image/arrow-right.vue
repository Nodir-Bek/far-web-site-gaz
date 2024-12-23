<template>
  <button
    @click="() => swiper.slideTo(2)"
    aria-label="Next button"
    class="flex justify-center items-center outline-none p-[10px] bg-[#F6F6F6] sm:bg-white hover:bg-primary-color transition-all text-main-text-color hover:text-white"
  >
    <svg
      :width="getIconSize"
      :height="getIconSize"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 9L22.5 18L13.5 27"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script setup>
const swiper = useSwiper();
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const getIconSize = computed(() => {
  if (width.value < 1024) {
    return "24";
  }
  return "36";
});
</script>

<style></style>
