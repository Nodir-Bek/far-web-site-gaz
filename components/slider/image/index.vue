<script setup>
const store = previewImageMode();
const { handlePreview } = store;
const { data, cardComponent, breakpoints, path, previewImage } = defineProps({
  data: {
    type: Array,
  },
  path: {
    type: String,
  },
  previewImage: {
    type: Boolean,
  },
  widthClass: {
    type: String,
    default: "w-full",
  },
  imageHeightClass: {
    type: String,
    default: "w-full max-h-[497px]",
  },
});
</script>

<template>
  <section class="relative h-max" :class="widthClass">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :space-between="0"
      :pagination="{
        clickable: true,
      }"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :loop="true"
      class="mySwiper !static"
    >
      <SwiperSlide v-for="image in data[0].photos" :key="item?.id">
        <CardImageMode
          :path="image"
          class="w-full"
          :imageClass="imageHeightClass"
        />
      </SwiperSlide>
      <div
        class="w-full sm:w-auto flex justify-center gap-[24px] sm:gap-x-0 sm:absolute sm:bottom-0 sm:right-0 z-10 sm:mt-0 mt-4"
      >
        <SliderImageArrowLeft />
        <SliderImageArrowRight />
      </div>
    </Swiper>
  </section>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: auto;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
