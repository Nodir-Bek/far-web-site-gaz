<script setup lang="ts">
const isOpen = ref(true);

onMounted(() => {
  setTimeout(() => {
    isOpen.value = false;
  }, 2000);
});
</script>

<template>
  <div
    class="loader-screen print:hidden w-screen h-screen fixed top-0 left-0 flex justify-center items-center transition-all duration-300 ease-in-out"
    :class="isOpen ? 'opacity-100 z-[99999]' : 'opacity-0 -z-50'"
  >
    <div class="loader w-full h-full flex items-center justify-center">
      <img
        class="w-full max-w-[80%] sm:max-w-[544px] object-fill scaling-image"
        src="/images/loader_logo.png"
        alt="loader_logo"
      />
    </div>
  </div>
</template>
<style scoped>
.loader {
  position: relative;
  background: url("/images/bg/loader_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.scaling-image {
  animation: scaleAnimation 2s ease-in-out infinite;
}

@keyframes scaleAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
