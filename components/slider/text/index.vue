<script setup>
const { data, getActiveIndex, cardComponent, breakpoints, path, previewImage } =
  defineProps({
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
    getActiveIndex: {
      type: Function,
      default: () => {},
    },
  });

const $t = useI18n().t;

const activeIndex = ref(0);
const handlePreview = (index) => {
  activeIndex.value = index.activeIndex;
  getActiveIndex(activeIndex.value);
};
onMounted(() => {
  getActiveIndex(activeIndex.value);
});
</script>

<template>
  <section class="h-full w-full relative" :class="widthClass">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :space-between="0"
      :pagination="{
        clickable: true,
      }"
      :loop="false"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
      }"
      class="mySwiper !static"
      @active-index-change="handlePreview"
    >
      <SwiperSlide v-for="(item, index) in data" :key="index">
        <h2
          class="text-[1.25rem] leading-[1.625rem] sm:text-[2rem] sm:leading-[2.5625rem] lg:text-[2.5rem] lg:leading-[3.25rem] font-bold text-white text-left uppercase line-clamp-4"
        >
          {{ item.desc }}
        </h2>
      </SwiperSlide>
      <SliderTextIndicator :slides="data" :active-index="activeIndex" />
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
