<script setup lang="ts">
import { onClickOutside, useStorage } from "@vueuse/core";
interface SubMenu {
  [key: string]: string;
}
const props = defineProps({
  menuName: {
    type: String,
    default: "dropdown",
  },
  subMenus: {
    type: Array as PropType<SubMenu[]>,
    default: ["item 1", "item 2", "item 3"],
  },
  menuNameClass: {
    type: String,
    default: "text-15px leading-15px font-medium uppercase",
  },
  iconColor: {
    type: String,
    default: "#fff",
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});
const isOpen = ref<boolean>(false);
const target = ref<HTMLElement | null>(null);

const emit = defineEmits(["clickOutside", "menuClick"]);
onClickOutside(target, (): void => {
  isOpen.value = false;
  emit("clickOutside");
});

const handleClick = (link: string) => {
  baseStore().setsubMenu(link);
  isOpen.value = false;
  emit("menuClick");
};
</script>
<template>
  <div class="relative w-max overflow-visible" ref="target">
    <div
      class="flex items-center gap-x-[6px] h-max w-full cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <span :class="menuNameClass">{{ $t(menuName) }}</span>
      <MyIcon name="ChevronDown" :color="iconColor" />
    </div>
    <Transition name="fade" mode="out-in">
      <div
        v-if="isOpen && !isMobile"
        class="min-w-[280px] absolute z-10 mt-[18px] bg-white py-[14px]"
      >
        <NuxtLink
          class="block px-[24px] py-[10px] font-medium text-15px leading-15px hover:bg-hover-color hover:text-white hover:bg-primary-color transition-all cursor-pointer"
          v-for="(item, index) in subMenus"
          :class="
            baseStore().subMenu == item.link
              ? 'text-primary-color'
              : 'text-main-text-color'
          "
          :key="index"
          :to="item.link"
          @click="handleClick(item.link)"
        >
          {{ $t(item.name) }}
        </NuxtLink>
      </div>
    </Transition>

    <div
      ref="target"
      v-if="isOpen && isMobile"
      class="min-w-[280px] bg-white py-[14px]"
    >
      <NuxtLink
        class="block px-[24px] py-[10px] font-medium text-15px leading-15px hover:bg-hover-color hover:text-white hover:bg-primary-color transition-all cursor-pointer"
        v-for="(item, index) in subMenus"
        :class="
          activeMenu == item.link
            ? 'text-primary-color'
            : 'text-main-text-color'
        "
        :key="index"
        :to="item.link"
        @click="handleClick(item.link)"
      >
        {{ $t(item.name) }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
