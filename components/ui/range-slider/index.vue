<template>
  <div
    class="w-full relative flex flex-col justify-start items-start gap-[8px] py-[16px] contain-size group"
  >
    <label for="rangeInput" class="sr-only">range-input-value</label>
    <input
      v-model="rangValue"
      id="rangeInput"
      type="range"
      class="slider bg-[#d3d3d3] h-[6px] rounded-full"
      :min="min"
      :max="max"
      :step="step"
      @input="handleRange"
    />
    <div
      class="absolute h-[6px] bg-brand-color rounded-full z-[5] pointer-events-none"
      :style="`width: ${rangValue}%`"
    ></div>
    <div
      class="tooltip w-max opacity-0 group-hover:opacity-100 transition-all duration-300 ease-linear"
      :style="`left: ${rangValue}%`"
    >
      {{ rangValue }} %
    </div>
  </div>
</template>

<script setup>
const { min, max, step, value } = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 10,
  },
});
const rangValue = defineModel(0);

const emit = defineEmits(["handleSlider"]);
const handleRange = (event) => {
  emit("handleSlider", event.target.value);
};
</script>
<style scoped>
.slider {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  background: #d3d3d3;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 5px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #ef7f1a;
  cursor: pointer;
  border-radius: 50%;
  z-index: 20;
}

.slider::-moz-range-thumb {
  width: 10px;
  height: 10px;
  background: #ef7f1a;
  cursor: pointer;
  border-radius: 50%;
  z-index: 20;
}

.tooltip {
  position: absolute;
  top: -25px;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
  transform: translateX(-50%);
}
</style>
