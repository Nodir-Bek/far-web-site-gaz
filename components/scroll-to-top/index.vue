<template>
  <button
    class="fixed bottom-0 right-0 flex justify-center items-center p-2 bg-brand-color hover:bg-brand-color/85 text-white font-bold rounded-full"
    @click="scrollToTop"
  >
    <Icon name="material-symbols-light:arrow-upward" size="30" color="white" />
  </button>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>
