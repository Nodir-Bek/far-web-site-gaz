<script setup lang="ts">
interface Item {
  title: string;
  content: string;
}
defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
  index: {
    type: String,
    required: true,
  },
  isActive: {
    type: Function as PropType<(index: string) => boolean>,
    required: true,
  },
  toggleItem: {
    type: Function as PropType<(index: string) => void>,
    required: true,
  },
});
const $t = useI18n().t;
</script>
<template>
  <button
    @click="toggleItem(index)"
    class="h-[92px] sm:h-[95px] flex justify-between items-center gap-x-[12px] w-full px-[12px] sm:px-[24px] pt-[16px] sm:pt-[24px] text-left bg-grey-background-color hover:bg-[#F6F6F6]/90 focus:outline-none focus:ring-0 active:outline-none active:ring-0 transition-all appearance-none border-none outline-none"
    :class="
      isActive(index) ? 'pb-[16px] sm:pb-[24px]' : 'pb-[16px] sm:pb-[24px]'
    "
  >
    <span
      class="font-medium text-main-text-color text-16px leading-20px sm:text-18px sm:leading-23px line-clamp-3 sm:line-clamp-3"
      >{{ item.title }}</span
    >
    <div class="flex gap-[8px] flex-shrink-0 items-center">
      <span
        class="font-normal text-brand-color text-15px leading-15p sm:text-16px sm:leading-16px"
        >{{ $t("requirements") }}</span
      >
      <MyIcon
        v-if="!isActive(index)"
        class="text-brand-color"
        name="PlusIcon"
      />
      <MyIcon v-else class="text-brand-color" name="MinusIcon" />
    </div>
  </button>

  <div
    :style="
      isActive(index)
        ? 'max-height: 1000px; padding-bottom: 16px; padding-top: 16px'
        : 'max-height: 0; padding-bottom: 0; padding-top: 0'
    "
    class="transition-all duration-200 ease-in-out px-4 w-full h-auto bg-grey-background-color text-main-text-color text-15px leading-20px sm:text-16px sm:leading-23px overflow-hidden"
  >
    <p class="line-clamp-3 sm:line-clamp-4">{{ item.content }}</p>
  </div>
</template>
