<script setup lang="ts">
import { defineComponent } from "vue";
defineProps({
  size: { type: String, default: "1em" },
  color: { type: String, default: "#fff" },
});

defineComponent({
  name: "YoutubeIcon",
});
</script>
<template>
  <svg
    width="20"
    height="14"
    viewBox="0 0 20 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.13634 13.3511C1.7833 13.2467 1.46118 13.0609 1.19716 12.8094C0.933137 12.5579 0.73496 12.2481 0.61935 11.9061C-0.0412734 10.1386 -0.237014 2.75824 1.0353 1.30127C1.45875 0.827304 2.0566 0.535497 2.69909 0.489183C6.11231 0.130912 16.6578 0.178682 17.869 0.608608C18.2096 0.716491 18.5208 0.89823 18.7793 1.14021C19.0378 1.38219 19.2368 1.67813 19.3615 2.00587C20.0833 3.83305 20.1077 10.473 19.2636 12.2285C19.0397 12.6855 18.6648 13.0557 18.1993 13.2795C16.927 13.9005 3.8246 13.8885 2.13634 13.3511ZM7.5559 9.88784L13.6728 6.78282L7.5559 3.65392V9.88784Z"
      fill="currentColor"
    />
  </svg>
</template>
