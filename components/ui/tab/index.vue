<script lang="ts" setup>
export interface TabItems {
  key: string;
  label: string;
}

const { active, tabs } = defineProps({
  active: {
    type: String,
    required: true,
  },
  tabs: {
    type: Array as PropType<TabItems[]>,
    required: true,
  },
});
const emit = defineEmits(["handler"]);
const handleTab = (id: string) => {
  emit("handler", id);
};
</script>
<template name="Tabs">
  <div class="w-full h-full flex flex-wrap justify-start items-center gap-4">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      @click="handleTab(tab.key)"
      class="text-15px leading-15px lg:text-xl lg:leading-5 font-medium transition-all uppercase active:bg-press-color active:text-white px-[20px] sm:px-[28px] py-[10px] lg:px-[34px] lg:py-[15px]"
      :class="
        active === tab.key
          ? 'bg-brand-color text-white'
          : 'bg-[#F6F6F6] text-main-text-color'
      "
    >
      {{ tab.label }}
    </button>
  </div>
</template>
