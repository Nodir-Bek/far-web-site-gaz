<script setup lang="ts">
import type { Media } from "~/types/home";

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
      :slides-per-view="1"
      :space-between="20"
      :pagination="{
        clickable: true,
      }"
      :loop="true"
      class="mySwiper !static"
    >
      <SwiperSlide v-for="(item, index) in data" :key="index">
        <iframe
          class="w-full h-[276px]"
          :src="item?.media[0]"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          :title="item.title"
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
