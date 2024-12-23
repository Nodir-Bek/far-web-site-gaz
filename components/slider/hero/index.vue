<script setup>
import { EffectScope } from "vue";

const { data, activeImgIndex, breakpoints } = defineProps({
  data: {
    type: Array,
  },
  activeImgIndex: {
    type: Number,
    default: 0,
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

const swiperRef = ref(null);

// I want to when this component is mounted, thie slider will be autoplay and slideTo the activeImgIndex
onMounted(() => {
  swiperRef?.value?.swiper?.slideTo(activeImgIndex);
});

const getBgImage = computed(() => {
  if (data) {
    return data[activeImgIndex]?.photos[0];
  } else {
    return "image not found";
  }
});
</script>

<template>
  <section class="relative h-max" :class="wrapperClass">
    <Swiper
      ref="swiperRef"
      :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperEffectFade]"
      :slides-per-view="1"
      :effect="'fade'"
      :pagination="{
        clickable: true,
      }"
      :loop="true"
      class="mySwiper"
    >
      <SwiperSlide v-for="item in data" :key="item?.id">
        <CardImageMode
          :path="getBgImage"
          image-class="w-full h-full object-cover min-h-[627px] sm:min-h-[914px] lg:min-h-972px]"
        />
      </SwiperSlide>
      <!-- <div
        class="w-max sm:w-full flex justify-between sm:justify-start mx-auto gap-[35px] mt-[50px] sm:mt-[60px] lg:mt-[80px]"
      >
        <SliderNewsArrowLeft />
        <SliderNewsArrowRight />
      </div> -->
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
