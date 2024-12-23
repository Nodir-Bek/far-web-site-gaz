<script setup lang="ts">
import { defineComponent } from "vue";
const props = defineProps({
  size: { type: String, default: "1em" },
  color: { type: String, default: "#fff" },
  isFooter: {
    type: Boolean,
    default: false,
  },
});

const getSize = computed(() => {
  if (props.isFooter) {
    return [8, 16];
  }
  return [12, 21];
});

defineComponent({
  name: "FacebookIcon",
});
</script>
<template>
  <svg
    :width="getSize[0]"
    :height="getSize[1]"
    viewBox="0 0 12 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.49147 11.3283H10.8414L11.3674 7.90445H7.49079V6.03316C7.49079 4.61084 7.95271 3.34961 9.27512 3.34961H11.4001V0.361718C11.0267 0.310995 10.2371 0.199951 8.74506 0.199951C5.62947 0.199951 3.8029 1.85532 3.8029 5.62668V7.90445H0.600098V11.3283H3.8029V20.7389C4.43719 20.8348 5.07966 20.9 5.73916 20.9C6.3353 20.9 6.91713 20.8451 7.49147 20.767V11.3283Z"
      fill="currentColor"
    />
  </svg>
</template>
