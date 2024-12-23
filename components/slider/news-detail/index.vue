<script setup>
const store = previewImageMode();
const { handlePreview } = store;
const { data } = defineProps({
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
  title: {
    type: String,
  },
  type: {
    type: String,
    default: "news",
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
      :breakpoints="defaultBreakpoints"
      class="mySwiper"
    >
      <div
        class="w-full flex max-w-screen-xxl justify-between items-center mb-[16px] sm:mb-[24px] lg:mb-[32px] order-[-1] pr-[20px] 2xl:pr-0"
      >
        <h3
          class="text-18px leading-18px sm:text-20px sm:leading-5 lg:text-24px lg:leading-25pxtext-main-text-color font-bold uppercase"
        >
          {{ title }}
        </h3>
        <div class="hidden sm:flex justify-start gap-[35px]">
          <SliderNewsDetailArrowLeft />
          <SliderNewsDetailArrowRight />
        </div>
      </div>
      <SwiperSlide v-for="item in data" :key="item?.id">
        <CardSliderNewsCard
          :data="item"
          :type="type"
          :width-class="widthClass"
          text-class="text-main-text-color"
          border-class="border-main-text-color/20"
        />
      </SwiperSlide>

      <div
        class="flex sm:hidden w-max sm:w-full justify-start gap-[35px] mt-[50px]"
      >
        <SliderNewsDetailArrowLeft />
        <SliderNewsDetailArrowRight />
      </div>
    </Swiper>
  </section>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
