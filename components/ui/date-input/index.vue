<template>
  <div :class="classList">
    <input
      ref="date"
      v-model="dateValue"
      type="date"
      class="w-full h-full pl-[12px] pr-[5px] py-[8px] bg-transparent text-15px font-medium leading-[15px] border border-[#E8E8E8] focus:outline-none text-main-text-color placeholder:text-[#C0C3C6] appearance-none"
    />
  </div>
</template>

<script setup lang="ts">
const dateValue = defineModel();
const props = defineProps({
  wrapperClass: {
    type: [String, Array],
    default: "w-[138px] h-[36px]",
  },
});

const classList = computed(() => {
  const classes = Array.isArray(props.wrapperClass)
    ? props.wrapperClass
    : [props.wrapperClass];
  return [...classes, "relative cursor-pointer"].filter(Boolean);
});
</script>

<style scoped>
input::-webkit-calendar-picker-indicator {
  opacity: 1;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-image: url("/images/calendar.svg");
}
</style>
