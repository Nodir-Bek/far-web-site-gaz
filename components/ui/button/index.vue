<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    default: "primary",
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
  <NuxtLink
    :to="to"
    type="button"
    @click="$emit('click')"
    :class="
      type === 'outlined'
        ? `text-primary-color bg-transparent border border-primary-color hover:bg-primary-color hover:text-white   font-medium active:bg-press-color ${customClasses}`
        : type === 'link'
        ? 'text-primary-color bg-transparent hover:underline'
        : type === 'icon'
        ? 'p-[6px] bg-primary-color active:bg-press-color'
        : ' bg-brand-color text-white border-white px-[36px] py-[12px] active:bg-press-color'
    "
    class="transition-all uppercase inline-block text-center"
  >
    <slot />
  </NuxtLink>
</template>
