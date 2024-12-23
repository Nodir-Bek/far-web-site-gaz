<template>
  <div class="relative">
    <label class="sr-only" for="select"> {{ placeholder }} </label>
    <input
      v-model="viewModel"
      id="select"
      :placeholder="placeholder"
      ref="input"
      tabindex="0"
      class="text-[0.9375rem] text-main-text-color leading-[1.25px] lg:text-[1rem] placeholder:text-[#6B7280] bg-white border border-[#9CA3AF] h-[40px] lg:h-[60px] px-[16px] active:ring-primary-color focus-visible:border-primary-color focus-visible:ring-primary-color outline-none"
      :class="inputClass"
      readonly
      @click="showOptions = true"
    />
    <Icon
      v-if="model"
      @click="reset"
      size="19px"
      class="absolute inset-y-0 right-8 top-[50%] translate-y-[-50%] flex items-center cursor-pointer text-[#182233]"
      name="material-symbols:close-rounded"
    />

    <svg
      class="absolute inset-y-0 right-[16px] top-[50%] translate-y-[-50%] flex items-center cursor-pointer"
      @click="showOptions = true"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#182233" />
    </svg>

    <div v-show="showOptions" tabindex="0" :class="dropdownClass">
      <ul class="py-1">
        <li
          v-for="(item, index) in data"
          :key="index"
          @click="handleClick(item)"
          class="px-4 py-[10px] cursor-pointer hover:bg-primary-color text-main-text-color hover:text-white flex items-center justify-between"
        >
          <span class="text-[1rem] leading-6">
            {{ optionLabel ? item[optionLabel] : item }}
          </span>
          <svg
            v-if="chosenOption === (optionValue ? item[optionValue] : item)"
            width="19"
            height="14"
            viewBox="0 0 19 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.04801 11.17L1.87801 7L0.458008 8.41L6.04801 14L18.048 2L16.638 0.589996L6.04801 11.17Z"
              fill="#182233"
            />
          </svg>
        </li>
        <li v-if="!data.length" class="px-3 py-2 text-center">
          No Matching Results
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import type { PropType } from "vue";
interface DataItem {
  [key: string]: any;
}
const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: "Enter text here.",
  },
  data: {
    type: Array as PropType<DataItem[]>,
    required: true,
  },
  inputClass: {
    type: String,
    required: false,
    default: "max-[500px]:w-full sm:w-[150px]",
  },
  dropdownClass: {
    type: String,
    required: false,
    default:
      "absolute w-full z-50 bg-white border border-white mh-48 overflow-hidden overflow-y-scroll shadow-md py-[10px]",
  },
  optionValue: {
    type: String,
    required: false,
    default: "",
  },
  optionLabel: {
    type: String,
    required: false,
    default: "",
  },
});

const model = defineModel<string | number>();

const showOptions = ref<boolean>(false);
const chosenOption = ref<string>("");
const input = ref<HTMLInputElement | null>();
const viewModel = ref<string | number | undefined>(model.value);

onClickOutside(input, (): void => {
  showOptions.value = false;
});

const reset = () => {
  chosenOption.value = "";
  model.value = "";
  viewModel.value = "";
};

const handleClick = (item: DataItem) => {
  chosenOption.value = props.optionValue ? item[props.optionValue] : item;
  model.value = props.optionValue ? item[props.optionValue] : item;
  viewModel.value = props.optionLabel ? item[props.optionLabel] : item;
  input.value?.focus();
};
</script>

<style scoped>
.mh-48 {
  max-height: 10rem;
}
</style>
