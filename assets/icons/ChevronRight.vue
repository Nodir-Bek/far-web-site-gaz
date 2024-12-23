<script setup lang="ts">
import { defineComponent } from "vue";

// const {size, color} = defineProps({
//   size: { type: String, default: "1em" },
//   color: { type: String, default: "#fff" },
// });

defineComponent({
  name: "ChevronRight",
});
</script>
<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 6L15 12L9 18"
      stroke="#052939"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
