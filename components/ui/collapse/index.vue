<template>
  <div
    v-for="(item, index) in items"
    :key="index"
    class="border-t border-[#E7EAF2]"
  >
    <button
      @click="toggleItem(index)"
      class="flex justify-start items-center gap-x-[12px] w-full pt-[28px] sm:pl-[20px] text-left bg-white hover:bg-[#F6F6F6] focus:outline-none focus:ring-0 active:outline-none active:ring-0 transition-all appearance-none border-none outline-none"
      :class="isActive(index) ? 'pb-[16px]' : 'pb-[28px]'"
    >
      <svg
        :class="{ 'rotate-180': isActive(index) }"
        class="transform transition-transform shrink-0"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 12.5L10 7.5L15 12.5"
          stroke="#052939"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <span
        class="font-medium text-main-text-color text-[1rem] leading-5 xl:text-lg xl:leading-18px"
        >{{ item.title }}</span
      >
    </button>

    <div
      v-if="isActive(index)"
      class="pl-[32px] sm:pl-[52px] pr-[32px] pb-[28px] text-secondary-text-color bg-white border-b border-[#E7EAF2] text-15px leading-5 xl:text-[1rem] xl:leading-25px"
    >
      {{ item.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  title: string;
  content: string;
  id?: number;
}
const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
});

const activeIndex = ref<number | null>(0);

const toggleItem = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const isActive = (index: number) => activeIndex.value === index;
</script>

<style></style>
