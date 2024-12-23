<script setup lang="ts">
import type { Document } from "~/types/home";

const props = defineProps({
  data: {
    type: Object as PropType<Document>,
    required: true,
  },
});
</script>
<template>
  <div
    class="relative flex items-center flex-row gap-[12px] lg:gap-[32px] py-[30px] px-[12px] lg:px-[24px] border border-[#E7EAF2] group"
  >
    <MyIcon name="FileIcon" class="flex-shrink-0" />
    <h2
      class="text-15px leading-19px lg:text-16px lg:leading-20px font-normal text-main-text-color text-left line-clamp-2"
    >
      {{ data.title }}
    </h2>

    <div
      class="absolute w-full h-full top-0 left-0 opacity-0 group-hover:opacity-100 transition-all bg-primary-color/40 flex items-center justify-center"
    >
      <div class="flex gap-[16px]">
        <a
          :href="data.file"
          target="_blank"
          class="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] flex items-center justify-center bg-white text-primary-color active:bg-press-color active:text-white"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <a
          :href="data.file"
          download
          class="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] flex items-center justify-center bg-white text-primary-color active:bg-press-color active:text-white"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 15V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V15M17 10L12 15M12 15L7 10M12 15V3"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
