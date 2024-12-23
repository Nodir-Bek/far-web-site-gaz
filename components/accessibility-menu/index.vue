<script setup lang="ts">
const target = ref(null);
// onClickOutside(target, (): void => {
//   accessibilityMode().accessibilityModal = false;
// });

defineProps({
  isOpen: Boolean,
});
const emits = defineEmits(["toggleButton"]);

const toggleDialog = (): void => {
  emits("toggleButton");
};
const changeTextSize = (value: number) => {
  accessibilityMode().setTextSize(value);
};

const handleZoom = (initialValue: number) => {
  accessibilityMode().setScreenZomm(initialValue);
};

const handleMode = (mode: string) => {
  if (mode !== "noImage") {
    const currentMode = accessibilityMode().filterColor;
    if (currentMode === mode) {
      accessibilityMode().setFilterColor("default");
    } else {
      accessibilityMode().setFilterColor(mode);
    }
  }
  if (mode === "noImage") {
    accessibilityMode().toggleNoImage();
  }
  if (mode === "reset") {
    changeTextSize(50);
    handleZoom(50);
    accessibilityMode().setFilterColor("default");
    accessibilityMode().noImage && accessibilityMode().toggleNoImage();
    accessibilityMode().accessibilityModal = false;
  }
};
</script>
<template name="accessibility">
  <div
    ref="target"
    class="fixed w-full max-w-[400px] px-[20px] py-[40px] shadow-2xl h-full bg-white dark:bg-white z-[3000] top-0 right-0 flex flex-col gap-[20px] text-black transition-all duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : 'translate-x-[100%]'"
  >
    <div class="w-full flex justify-between items-center py-[8px]">
      <h2 class="text-[#232F3F] text-[20px] font-semibold">
        {{ $t("accessibility") }}
      </h2>
      <button @click="toggleDialog" aria-label="close">
        <Icon name="icon-park-outline:close" class="text-[#4D4D4D]" size="24" />
      </button>
    </div>
    <div class="w-full flex flex-col justify-start items-start gap-[28px]">
      <div class="w-full flex justify-start items-center gap-[16px]">
        <button
          class="p-[8px] rounded-lg flex justify-center items-center"
          :class="
            accessibilityMode().filterColor === 'default'
              ? 'bg-brand-color text-white'
              : 'bg-[#F5F5F5] text-[#4D4D4D]'
          "
          @click="handleMode('default')"
          aria-label="color filter default"
        >
          <Icon name="icon-park-twotone:color-filter" class="" size="24" />
        </button>
        <button
          class="p-[8px] rounded-lg flex justify-center items-center"
          :class="
            accessibilityMode().filterColor === 'blackWhite'
              ? 'bg-brand-color text-white'
              : 'bg-[#F5F5F5] text-[#4D4D4D]'
          "
          @click="handleMode('blackWhite')"
        >
          <Icon name="codicon:color-mode" class="" size="24" />
        </button>
        <button
          class="p-[8px] rounded-lg flex justify-center items-center"
          :class="
            accessibilityMode().filterColor === 'hightContrast'
              ? 'bg-brand-color text-white'
              : 'bg-[#F5F5F5] text-[#4D4D4D]'
          "
          @click="handleMode('hightContrast')"
        >
          <Icon
            name="material-symbols:light-mode-outline-rounded"
            class=""
            size="24"
          />
        </button>
        <button
          class="p-[8px] rounded-lg flex justify-center items-center"
          :class="
            accessibilityMode().noImage
              ? 'bg-brand-color text-white'
              : 'bg-[#F5F5F5] text-[#4D4D4D]'
          "
          @click="handleMode('noImage')"
        >
          <Icon
            name="material-symbols:image-not-supported-outline-rounded"
            class=""
            size="24"
          />
        </button>
      </div>

      <div class="flex flex-col justify-normal items-start w-full gap-[12px]">
        <p class="text-base">{{ $t("screen_size") }}:</p>
        <UiRangeSlider v-model="accessibilityMode().screenZomm" />
        <p class="text-base">{{ $t("font_size") }}:</p>
        <UiRangeSlider
          class="w-full"
          :max="100"
          :min="0"
          :step="10"
          v-model="accessibilityMode().textSize"
        />
      </div>

      <div class="flex flex-col justify-normal items-start w-full gap-[12px]">
        <button
          class="w-full p-[8px] rounded-lg flex text-base justify-center items-center bg-brand-color text-white"
          @click="handleMode('reset')"
        >
          {{ $t("default_settings") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
