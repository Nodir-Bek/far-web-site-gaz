<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <p
    class="w-full text-11px leading-11px lg:text-13px lg:leading-13px font-bold text-primary-color text-left uppercase"
  >
    {{ label }}
  </p>
</template>
