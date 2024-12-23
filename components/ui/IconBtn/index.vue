<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    default: "primary",
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  to: {
    type: String || Object,
    default: "",
  },
  customClasses: {
    type: String,
    default: "text-15px leading-15px lg:text-xl lg:leading-[1.625rem]",
  },
});
</script>

<template>
  <button
    type="button"
    @click="() => onClick()"
    :class="customClasses"
    class="flex justify-center items-center transition-all uppercase text-center bg-brand-color text-white border-white active:bg-press-color"
  >
    <slot />
  </button>
</template>
