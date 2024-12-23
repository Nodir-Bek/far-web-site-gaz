<script lang="ts" setup>
defineProps({
  data: {
    type: Array,
    required: true,
  },
  dinamicClass: {
    type: String,
    default: "",
  },
  isPdf: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex flex-col gap-y-[16px] lg:gap-y-[20px]">
    <div class="flex gap-[20px] items-start" v-for="item in data">
      <span
        class="w-full max-w-[133px] text-main-text-color text-14px leading-18px lg:text-[1rem] lg:leading-5 font-semibold uppercase flex-shrink-0 min-[390px]:flex-shrink"
        >{{ $t(item?.label) }}:</span
      >

      <span
        class="flex-grow max-w-[220px] text-[#71787B] text-left text-14px leading-18px lg:text-[1rem] lg:leading-5 font-normal"
        >{{ item?.value }}</span
      >
    </div>
  </div>
</template>
