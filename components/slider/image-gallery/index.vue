<script setup lang="ts">
const store = previewImageMode();
import type { Media } from "~/types/home";
const { handlePreview } = store;
defineProps({
  data: {
    type: Array as PropType<Media[]>,
  },
  previewImage: {
    type: Boolean,
  },
});
</script>

<template>
  <section class="relative w-full">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1.5"
      :space-between="20"
      :pagination="{
        clickable: true,
      }"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :loop="false"
      class="mySwiper !static"
    >
      <SwiperSlide v-for="(item, index) in data" :key="index">
        <CardImageMode
          :path="item.photo as string"
          image-class="w-full h-[276px] cursor-pointer"
          :handlePreview="() => handlePreview(item.photo as string, [])"
        />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: auto;
}
</style>
