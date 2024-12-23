<template>
  <div class="flex justify-center items-center w-screen translate-x-0 h-full">
    <div
      class="hidden lg:flex custom-navigation-buttons absolute items-center z-50"
      :class="
        onPreview
          ? 'h-auto top-1/2 w-full justify-between gap-10 px-20'
          : 'top-0 w-full justify-center gap-10'
      "
    >
      <button
        class="cursor-pointer preview-prev-button"
        :class="
          onPreview
            ? 'border rounded-full border-white p-2 flex justify-center items-center'
            : 'py-3'
        "
      >
        <svg
          v-if="!onPreview"
          width="41"
          height="16"
          viewBox="0 0 41 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.292892 8.7071C-0.0976296 8.31658 -0.0976295 7.68341 0.292893 7.29289L6.65685 0.928929C7.04738 0.538405 7.68054 0.538405 8.07107 0.928929C8.46159 1.31945 8.46159 1.95262 8.07107 2.34314L2.41422 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292892 8.7071ZM41 9L1 9L1 7L41 7L41 9Z"
            fill="#06321d99"
          />
        </svg>
        <Icon
          v-else
          name="material-symbols:chevron-left-rounded"
          size="40"
          class="text-white"
        />
      </button>
      <button
        class="cursor-pointer preview-next-button"
        :class="
          onPreview
            ? 'border rounded-full border-white p-2 flex justify-center items-center'
            : 'py-3'
        "
      >
        <svg
          v-if="!onPreview"
          width="41"
          height="16"
          viewBox="0 0 41 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40.7071 8.7071C41.0976 8.31658 41.0976 7.68341 40.7071 7.29289L34.3431 0.928929C33.9526 0.538405 33.3195 0.538405 32.9289 0.928929C32.5384 1.31945 32.5384 1.95262 32.9289 2.34314L38.5858 8L32.9289 13.6569C32.5384 14.0474 32.5384 14.6805 32.9289 15.0711C33.3195 15.4616 33.9526 15.4616 34.3431 15.0711L40.7071 8.7071ZM8.74228e-08 9L40 9L40 7L-8.74228e-08 7L8.74228e-08 9Z"
            fill="#06321d99"
          />
        </svg>
        <Icon
          v-else
          name="material-symbols:chevron-right-rounded"
          size="40"
          class="text-white"
        />
      </button>
    </div>
    <div class="swiper previewSlider w-full h-full relative">
      <div class="swiper-wrapper w-full h-full">
        <div
          class="swiper-slide w-full h-full relative"
          v-for="(slide, index) in images"
          :key="index"
        >
          <CardImageMode
            :path="slide"
            image-class="w-full  h-full object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Swiper from "swiper";
import { Keyboard, Navigation } from "swiper/modules";
const { handlePreview } = previewImageMode();

const { slides, onPreview, currentImage } = defineProps({
  slides: {
    type: Array as PropType<string[]>,
    default: [],
  },
  currentImage: {
    type: String,
    default: "",
  },
  onPreview: {
    type: Boolean,
    default: false,
  },
});
const activeIndex = computed(() => {
  return slides.length < 2
    ? 0
    : slides.findIndex((slide) => slide === currentImage);
});

const swiperRef = ref();

const images = computed(() => {
  if (slides.length <= 0 && currentImage) {
    return [currentImage];
  } else {
    return slides;
  }
});

onMounted(() => {
  swiperRef.value = new Swiper(".previewSlider", {
    slidesPerView: "auto",
    modules: [Navigation, Keyboard],
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    centeredSlides: true,
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: ".preview-next-button",
      prevEl: ".preview-prev-button",
    },
    initialSlide: activeIndex.value,
    keyboard: {
      enabled: true,
    },
  });
  addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handlePreview();
    }
  });
});
onUnmounted(() => {
  removeEventListener("keydown", () => {});
});
</script>

<style scoped>
.swiper {
  position: relative;
  width: 100%;
  height: 85vh; /* Max height */
  overflow: hidden;
}

.swiper-slide {
  position: relative;
  width: 100vw; /* Max width */
  height: 85vh; /* Max height */
  opacity: 0.5;
  transform: scale(0.84);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  border-radius: 0.4285rem;
}

.swiper-backface-hidden .swiper-slide {
  transform: scale(0.84) translateZ(0);
  pointer-events: none;
}

.swiper-slide.swiper-slide-active {
  transform: scale(1) !important;
  opacity: 1 !important;
}

.swiper-backface-hidden .swiper-slide.swiper-slide-active {
  transform: scale(1) translateZ(0) !important;
}

.custom-navigation-buttons {
  transform: translateY(-50%);
}

.preview-prev-button {
  transform: translate(-50%, -50%);
}

.preview-next-button {
  transform: translate(50%, -50%);
}

@media only screen and (max-width: 768px) {
  .swiper {
    height: calc(var(--swiper-mobile-width) * var(--swiper-image-ratio) / 100%);
  }
  .swiper-slide {
    width: var(--swiper-mobile-width);
    transform: scale(var(--swiper-mobile-inactive-scale));
  }
  .swiper-backface-hidden .swiper-slide.swiper-slide {
    transform: scale(var(--swiper-mobile-inactive-scale)) translateZ(0);
  }
}
</style>
