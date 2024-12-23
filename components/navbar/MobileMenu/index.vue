<script lang="ts" setup>
import type { IMenuItemsSchema } from "../helper";
const { socialLinks } = baseStore();

const route = useRoute();

const selectedMenu = ref<string>("");
const { open, menus } = defineProps({
  open: {
    type: Boolean,
    default: false,
    reuired: true,
  },
  menus: {
    type: Array as PropType<IMenuItemsSchema[]>,
    required: true,
  },
});
const emit = defineEmits(["togglefn"]);
const handleClose = () => {
  emit("togglefn", false);
};

const openLink = (link: string) => {
  window.open(link, "_blank");
  handleClose();
};

const toggleMenu = (accessor: string) => {
  selectedMenu.value = accessor;
};
</script>
<template>
  <div
    :class="open ? 'translate-x-0' : 'translate-x-[100%]'"
    class="w-full h-full fixed top-0 left-0 bg-white z-[3000] text-black px-5 py-10 transition-all duration-300 ease-in-out"
  >
    <div
      class="w-full h-auto flex justify-between items-center py-2 pb-6 border-b border-[#E7EAF2]"
    >
      <NuxtLink to="/" class="flex gap-2 items-center h-full">
        <img
          src="/images/logo_dark.png"
          alt="logo.png"
          class="w-[147px] h-[21px] sm:w-[187px] sm:h-[27px] xl:w-[286px] xl:h-[42px] object-contain"
        />
      </NuxtLink>
      <div class="flex gap-[20px] items-center">
        <UiLangSelect :is-mobile="true" @click-lang="handleClose" />
        <button @click="handleClose" class="flex items-center justify-center">
          <Icon
            name="icon-park-outline:close"
            class="text-main-text-color"
            size="24"
          />
        </button>
      </div>
    </div>
    <div
      class="w-full h-full flex flex-col justify-start items-start gap-5 bg-white overflow-y-auto scrolbar-hidden py-4 pb-6"
    >
      <div
        v-for="item in menus"
        :key="item.name"
        class="w-full h-auto flex flex-col justify-start items-stretch gap-5"
        :main-open="open"
      >
        <NuxtLink
          @click="toggleMenu(item.accessor)"
          :to="item.link"
          v-if="item.type === 'link'"
          class="text-15px leading-15px font-medium uppercase"
          :class="
            selectedMenu === item.accessor
              ? 'text-primary-color'
              : 'text-main-text-color'
          "
          >{{ $t(item.name) }}</NuxtLink
        >
        <UiDropdown
          v-else
          @click="toggleMenu(item.accessor)"
          @click-outside="toggleMenu('')"
          @menu-click="handleClose"
          :menu-name="item.name"
          :sub-menus="item.subItems"
          :is-mobile="true"
          :icon-color="selectedMenu === item.accessor ? '#EF7F1A' : '#052939'"
          :menu-name-class="
            selectedMenu === item.accessor
              ? 'text-15px leading-15px font-medium uppercase text-primary-color'
              : 'text-15px leading-15px font-medium uppercase text-main-text-color'
          "
        />
      </div>
      <div class="w-full flex flex-col justify-start items-start gap-6 py-6">
        <div class="w-full h-[1px] bg-[#E7EAF2]" />
        <div
          class="text-main-text-color flex flex-col gap-[10px] justify-center items-start"
        >
          <span class="font-normal text-sm leading-[14px]">
            {{ $t("hotline_phone") }}:
          </span>
          <a href="tel:8(373) 515-11-54" class="font-bold text-xl leading-5"
            >+998 73-229-04-35</a
          >
        </div>

        <div class="flex justify-start items-center gap-3">
          <div
            v-for="link in socialLinks"
            class="flex items-center justify-center w-[28px] h-[28px] bg-[#717382]/[0.15] text-main-text-color hover:text-white hover:bg-primary-color transition-all rounded-full p-[7px] cursor-pointer"
            @click="openLink(link.link)"
          >
            <MyIcon :name="link.name" :is-footer="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.scrolbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>
