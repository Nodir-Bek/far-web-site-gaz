<script setup lang="ts">
import { defineComponent } from "vue";

// const {size, color} = defineProps({
//   size: { type: String, default: "1em" },
//   color: { type: String, default: "#fff" },
// });

defineComponent({
  name: "MinusIcon",
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
      d="M5 10H15"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
