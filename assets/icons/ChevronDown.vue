<script setup lang="ts">
import { defineComponent } from "vue";

defineProps({
  size: { type: String, default: "1em" },
  color: { type: String, default: "#052939" },
});

defineComponent({
  name: "ChecvronDown",
});
</script>
<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
