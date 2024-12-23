<script setup>
defineProps({
  widthClass: {
    type: String,
    default: "w-full",
  },
  imageHeightClass: {
    type: String,
    default: "w-auto h-auto",
  },
});

const usefulLinks = ref([
  {
    image: "/images/useful-links/book.png",
    imageColor: "/images/useful-links/book-color.png",
    path: "https://kitob.uz/",
    smallClass: "border-none",
  },
  {
    image: "/images/useful-links/edu-kids.png",
    imageColor: "/images/useful-links/edu-kids-color.png",
    path: "https://itsm.uz/uz",
  },
  {
    image: "/images/useful-links/mygov.png",
    imageColor: "/images/useful-links/mygov-color.png",
    path: "https://my.gov.uz",
  },
  {
    image: "/images/useful-links/business.png",
    imageColor: "/images/useful-links/business-color.png",
    path: "https://www.uzedu.uz/en/services/index/1",
  },
  {
    image: "/images/useful-links/smartland.png",
    imageColor: "/images/useful-links/smartland-color.png",
    path: "https://smartland.maktab.uz/",
    class: "!max-w-[452px] max-[500px]:!col-span-3",
    smallClass: "border-none",
  },
  {
    image: "/images/useful-links/edu-kids.png",
    imageColor: "/images/useful-links/edu-kids-color.png",
    path: "https://itsm.uz/uz",
    smallClass: "border-none",
  },
  {
    image: "/images/useful-links/organization.png",
    imageColor: "/images/useful-links/organization-color.png",
    path: "https://gov.uz/oz/edu",
    class: "max-[500px]:!col-span-6",
    smallClass: "max-[500px]:border-none",
  },
  {
    image: "/images/useful-links/kundalik.png",
    imageColor: "/images/useful-links/kundalik-color.png",
    path: "https://emaktab.uz",
    class: "!max-w-[452px] max-[500px]:!col-span-3",
  },
  {
    image: "/images/useful-links/science-olympiads.png",
    imageColor: "/images/useful-links/science-olympiads-color.png",
    path: "https://olympiad.maktab.uz/",
  },
  {
    image: "/images/useful-links/edu-care.png",
    imageColor: "/images/useful-links/edu-care-color.png",
    path: "https://educare.uzedu.uz/",
  },
]);
</script>

<template>
  <section class="relative h-max" :class="widthClass">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      slides-per-view="auto"
      :space-between="30"
      :breakpoints="{
        640: { spaceBetween: 20 },
        768: { spaceBetween: 40 },
        1024: { spaceBetween: 60 },
        1280: { spaceBetween: 120 },
      }"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :loop="true"
      class="mySwiper !static w-full flex justify-between"
    >
      <SwiperSlide v-for="(item, index) in usefulLinks" :key="index">
        <NuxtLink
          :to="item.path"
          :title="item"
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer"
        >
          <img
            :src="item.imageColor"
            :alt="item.imageColor"
            :class="imageHeightClass"
            class="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 ease-in-out"
          />
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: auto;
}

.swiper-slide {
  width: max-content;
}
</style>
