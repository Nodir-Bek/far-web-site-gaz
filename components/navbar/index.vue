<template name="navbar">
  <nav
    class="hidden lg:block w-full z-40 print:hidden"
    :class="
      route.path === '/'
        ? 'bg-transparent'
        : 'bg-white border-b border-[#E7EAF2]'
    "
  >
    <UiContainer class="flex-col w-full py-[26px]">
      <div class="flex items-center gap-x-[40px]">
        <template v-for="item in menuItems">
          <NuxtLink
            v-if="item.type === 'link'"
            :key="item.accessor"
            :target="item.target || '_self'"
            @click="toggleMenu(item.accessor)"
            :to="item.link"
            class="text-15px leading-15px font-medium uppercase"
            :class="
              baseStore().parentMenu === item.accessor
                ? 'text-primary-color'
                : route.path === '/'
                ? 'text-white'
                : 'text-main-text-color'
            "
            >{{ $t(item.name) }}</NuxtLink
          >
          <UiDropdown
            v-else
            @click="toggleDropdown(item.accessor)"
            :menu-name="item.name"
            :sub-menus="item.subItems"
            :icon-color="
              baseStore().parentMenu === item.accessor
                ? '#EF7F1A'
                : route.path === '/'
                ? '#fff'
                : '#052939'
            "
            :menu-name-class="
              baseStore().parentMenu === item.accessor
                ? 'text-15px leading-15px font-medium uppercase text-primary-color'
                : route.path === '/'
                ? 'text-15px leading-15px font-medium uppercase text-white'
                : 'text-15px leading-15px font-medium uppercase text-main-text-color'
            "
          />
        </template>
      </div>
    </UiContainer>
  </nav>
</template>
<script lang="ts" setup>
import { menuItems } from "./helper.js";

const route = useRoute();
const router = useRouter();

const toggleMenu = (accessor: string) => {
  baseStore().setparentMenu(accessor);
  baseStore().setsubMenu("");
};

const toggleDropdown = (accessor: string) => {
  if (baseStore().subMenu) {
    baseStore().setparentMenu(accessor);
  }
};

watch(
  () => route.path,
  () => {
    if (router.currentRoute.value.path == "/") {
      baseStore().setparentMenu("");
      baseStore().setsubMenu("");
    }
  }
);
</script>
<style>
.menu-content::before {
  content: "";
  width: 100%;
  height: 48px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: -1;
  backdrop-filter: blur(8px);
}
</style>
