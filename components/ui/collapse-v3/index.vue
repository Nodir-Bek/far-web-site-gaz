<template>
  <div :class="wrapperClassList">
    <div
      v-for="(item, index) in items"
      class="w-full max-w-[962px] transition-all duration-300"
      :key="index"
      ref="collapse"
    >
      <button
        @click="toggleItem(index)"
        :aria-expanded="isActive(index)"
        class="w-full flex items-start sm:items-center gap-x-[16px] text-left bg-transparent focus:outline-none focus:ring-0 active:outline-none active:ring-0 transition-all appearance-none border-none outline-none"
      >
        <div
          class="w-[34px] h-[34px] flex items-center justify-center text-20px leading-5 bg-primary-color text-white flex-shrink-0"
        >
          {{ index + 1 }}
        </div>
        <span
          class="font-medium text-main-text-color text-16px leading-20px line-clamp-3"
          >{{ $t(item.title) }}</span
        >
      </button>

      <div
        :class="isActive(index) ? 'collapsible open' : 'collapsible'"
        class="flex flex-col gap-y-[16px]"
      >
        <p
          class="text-16px leading-25px text-main-text-color font-normal py-[16px]"
        >
          {{ item.desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  title: string;
  desc: string;
}
const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
  wrapperClass: {
    type: String,
    default: "",
  },
});

const collapse = ref<HTMLElement | null>(null);

const wrapperClassList = computed(() => {
  const classes = Array.isArray(props.wrapperClass)
    ? props.wrapperClass
    : [props.wrapperClass];
  return [...classes, "w-full"].filter(Boolean);
});

const activeIndex = ref<number | null>(0);

const toggleItem = (index: number) => {
  if (isActive(index) || props.items[index].desc.length === 0) return;
  activeIndex.value = activeIndex.value === index ? -1 : index;
};

const isActive = (index: number) => activeIndex.value === index;
</script>

<style scoped>
.collapsible {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s linear;
  will-change: max-height;
}
.collapsible.open {
  max-height: 500px;
  transition: max-height 0.3s linear;
}
</style>
