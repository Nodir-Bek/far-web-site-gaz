<template>
  <div class="flex items-center gap-x-[8px] mt-[24px]">
    <div
      class="h-[8px] bg-[#FFFFFF7A] cursor-pointer"
      v-for="(item, index) in slides"
      @click="
        () => {
          activeSlide = index;
          return swiper.slideTo(index);
        }
      "
      :class="
        activeSlide == index
          ? 'w-[29px] rounded-[25px] bg-white'
          : 'w-[8px] rounded-[50%]'
      "
    ></div>
  </div>
</template>

<script setup>
const swiper = useSwiper();
const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
  activeIndex: {
    type: Number,
    required: true,
  },
});
const activeSlide = ref(0);
watch(
  () => props.activeIndex,
  () => {
    activeSlide.value = props.activeIndex;
  }
);
</script>

<style></style>
