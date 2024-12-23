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
  wrapperClass: {
    type: String,
    default: "w-full",
  },
  imageHeightClass: {
    type: String,
    default: "w-full max-h-[497px]",
  },
});

const defaultBreakpoints = {
  270: {
    slidesPerView: 1.5,
    spaceBetween: 20,
  },
  320: {
    slidesPerView: 1.5,
    spaceBetween: 20,
  },
  500: {
    slidesPerView: 1.5,
    spaceBetween: 20,
  },
  600: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  800: {
    slidesPerView: 2.5,
    spaceBetween: 24,
  },
  900: {
    slidesPerView: 3.5,
    spaceBetween: 24,
  },
  1200: {
    slidesPerView: 3.5,
    spaceBetween: 25,
  },
  1600: {
    slidesPerView: 3.5,
    spaceBetween: 24,
  },
};
</script>

<template>
  <section class="relative h-max" :class="wrapperClass">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="3.5"
      :space-between="24"
      :pagination="{
        clickable: true,
      }"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :loop="false"
      :breakpoints="breakpoints ? breakpoints : defaultBreakpoints"
      class="mySwiper"
    >
      <SwiperSlide v-for="item in data" :key="item?.id">
        <CardSliderNewsCard :data="item" :width-class="widthClass" />
      </SwiperSlide>
      <div
        class="w-max sm:w-full flex justify-between sm:justify-start mx-auto gap-[35px] mt-[50px] sm:mt-[60px] lg:mt-[80px]"
      >
        <SliderNewsArrowLeft />
        <SliderNewsArrowRight />
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
