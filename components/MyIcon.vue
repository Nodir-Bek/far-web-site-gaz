<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "1em",
  },
  color: {
    type: String,
    default: "#fff",
  },
});

const icon = defineAsyncComponent(
  () => import(`../assets/icons/${props.name}.vue`),
);
</script>

<template>
  <component :is="icon" :size="props.size" :color="color" />
</template>
