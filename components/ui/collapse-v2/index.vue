<template>
  <div
    class="w-full h-[350px] grid grid-cols-1 lg:grid-cols-2 gap-y-[12px] gap-x-[24px] place-content-start justify-items-start"
  >
    <div class="w-full h-full relative transition-all duration-300">
      <div
        class="w-full relative transition-all duration-300 py-1"
        v-for="(item, index) in items.slice(0, Math.ceil(items.length / 2))"
        :key="index"
      >
        <Body
          :item="item"
          :index="`${index}l`"
          :isActive="isActive"
          :toggleItem="() => toggleItem(`${index}l`)"
        />
      </div>
    </div>
    <div class="w-full h-full relative transition-all duration-300">
      <div
        class="w-full py-1 relative transition-all duration-300"
        v-for="(item, index) in items.slice(Math.ceil(items.length / 2))"
        :key="index"
      >
        <Body
          :item="item"
          :index="`${index}r`"
          :isActive="isActive"
          :toggleItem="() => toggleItem(`${index}r`)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Body from "./body.vue";
interface Item {
  title: string;
  content: string;
}
const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
  wrapperClass: {
    type: [String, Array],
    default: "",
  },
});

const wrapperClassList = computed(() => {
  const classes = Array.isArray(props.wrapperClass)
    ? props.wrapperClass
    : [props.wrapperClass];
  return [...classes, "w-full"].filter(Boolean);
});

const activeIndex = ref<string | null>("0l");

const toggleItem = (index: string) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const isActive = (index: string) => activeIndex.value === index;
</script>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.3s ease;
}
.collapse-enter,
.collapse-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>
