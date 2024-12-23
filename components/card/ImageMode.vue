<script lang="ts" setup>
import default_image from "~/public/images/default.png";
const { path, imageClass } = defineProps({
  path: {
    type: String,
    required: true,
  },
  imageClass: {
    type: String,
    default: "object-cover",
  },
  handlePreview: {
    type: Function,
  },
});
</script>
<template>
  <img
    v-if="path && !accessibilityMode().noImage"
    :src="path"
    :class="[imageClass, 'aspect-video']"
    :alt="path"
    loading="lazy"
    crossorigin="anonymous"
    @click="() => handlePreview && handlePreview(path)"
  />
  <div
    v-else-if="!accessibilityMode().noImage"
    class="no-image"
    :class="imageClass"
  ></div>
  <img
    v-else
    :class="imageClass"
    class="w-full h-full object-cover"
    :src="default_image"
    :alt="default_image"
  />
</template>

<style scoped>
.no-image {
  background: linear-gradient(270deg, #4daaf1 0%, var(--main-color) 100%);
}
</style>
