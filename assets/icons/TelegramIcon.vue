<script setup lang="ts">
import { defineComponent } from "vue";
defineProps({
  size: { type: String, default: "1em" },
  color: { type: String, default: "#fff" },
});

defineComponent({
  name: "TelegramIcon",
});
</script>
<template>
  <svg
    width="18"
    height="17"
    viewBox="0 0 18 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.2001 1.34205L14.4952 15.4631C14.4952 15.4631 14.1168 16.4422 13.0771 15.9726L6.83622 11.0174L6.80728 11.0028C7.65028 10.2189 14.1873 4.13245 14.473 3.85656C14.9152 3.42928 14.6407 3.17491 14.1271 3.49767L4.47121 9.84772L0.745972 8.54974C0.745972 8.54974 0.159729 8.33379 0.103331 7.86424C0.0461911 7.39393 0.765266 7.13956 0.765266 7.13956L15.9519 0.970102C15.9519 0.970102 17.2001 0.402186 17.2001 1.34205Z"
      fill="currentColor"
    />
  </svg>
</template>
