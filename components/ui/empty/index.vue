<script lang="ts" setup>
defineProps({
  isEmpty: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="w-full h-full"
    :class="isEmpty ? 'flex justify-center items-center' : ''"
  >
    <slot v-if="!isEmpty" />
    <div v-else class="w-full h-full flex justify-center items-center p-8">
      <div class="flex flex-col justify-center items-center">
        <img
          class="w-[291px] h-[204px] object-contain"
          src="/images/empty.png"
          alt="empty"
        />
        <p>{{ $t("empty") }}</p>
      </div>
    </div>
  </div>
</template>
