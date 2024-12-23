<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <h4
    class="w-full text-18px leading-18px lg:text-[2.25rem] lg:leading-13px font-bold text-primary-color text-left"
  >
    {{ label }}
  </h4>
</template>
