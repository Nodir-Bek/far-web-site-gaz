<template>
  <div class="flex flex-col relative">
    <label for="valueInput" class="sr-only">range-input-value</label>
    <input
      id="valueInput"
      type="number"
      v-model="value"
      min="0"
      :max="max"
      step="1"
      class="hover:appearance-none appearance-none w-full h-[25px] lg:h-[48px] px-[12px] lg:px-[20px] text-main-text-color border border-[#E7EAF2] bg-white focus:outline-none text-15px leading-15px lg:text-2xl lg:leading-6"
    />

    <div class="absolute w-full top-[16px] lg:top-[42px]">
      <!-- Background Bar -->
      <div
        class="absolute top-1/2 -translate-y-1/2 h-[8px] lg:h-[12px] bg-[#F6F6F6] w-full"
      ></div>

      <!-- Progress Bar -->
      <div
        class="absolute top-1/2 -translate-y-1/2 h-[8px] lg:h-[12px] bg-primary-color"
        :style="{ width: progressBarWidth }"
      ></div>

      <!-- Slider Input -->
      <label for="rangeInput" class="sr-only">range-input-value</label>

      <input
        type="range"
        id="rangeInput"
        :min="0"
        :max="max"
        step="1"
        v-model="value"
        class="relative w-full h-[8px] lg:h-[12px] appearance-none cursor-pointer bg-transparent z-10"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const value = defineModel({
  type: Number,
  default: 0,
});
const { max } = defineProps({
  max: {
    type: Number,
    default: 100,
  },
});

// Progress bar kengligi
const progressBarWidth = computed(() =>
  value.value > max ? "100%" : `${(value.value / max) * 100}%`
); // Dinamik kenglik
</script>

<style>
/* Slider tugmasi (thumb) */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ef7f1a; /* Orange rang */
  cursor: pointer;
  border: none;
}

#valueInput::-webkit-outer-spin-button,
#valueInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="range"]:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 4px rgba(255, 102, 0, 0.3);
}

input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ef7f1a; /* Orange rang */
  cursor: pointer;
  border: none;
}

input[type="range"]:focus::-moz-range-thumb {
  box-shadow: 0 0 0 4px rgba(255, 102, 0, 0.3);
}

@media screen and (max-width: 1280px) {
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ef7f1a; /* Orange rang */
    cursor: pointer;
    border: none;
  }

  input[type="range"]::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ef7f1a; /* Orange rang */
    cursor: pointer;
    border: none;
  }
}
</style>
