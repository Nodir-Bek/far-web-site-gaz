<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const navItems = ref([{ name: "home", desc: "", path: "/" }]);
const $t = useI18n().t;

function createPathReducer(initialPath) {
  let path = initialPath;
  return function () {
    if (path === "") {
      return null;
    }
    const currentPath = path;
    path = path.substring(0, path.lastIndexOf("/")) || "";
    return currentPath;
  };
}

function recursivePathProcessor(pathReducer, result = []) {
  const path = pathReducer();
  if (!path) {
    return result;
  }

  const prevPage = router.options.routes.find((item) => item.path === path);
  if (prevPage) {
    const page = {
      name: prevPage.meta.title || "Sahifa",
      desc: prevPage.meta.desc || "desc",
      path: prevPage.path,
    };
    result.unshift(page);
  } else {
    if (router.currentRoute.value.path != path) {
      const page = {
        name: $t(path),
        desc: $t(path),
        path: null,
      };
      result.unshift(page);
    }
  }

  return recursivePathProcessor(pathReducer, result);
}

const pathReducer = createPathReducer(route.path);
navItems.value = [...navItems.value, ...recursivePathProcessor(pathReducer)];

const isActive = (index) => {
  return navItems.value.length - 1 == index;
};
</script>

<template>
  <nav
    :class="accessibilityMode().noImage ? 'no__image' : 'navigate'"
    class="w-full relative print:hidden"
  >
    <UiContainer
      class="flex-col py-[20px] sm:py-[33px] lg:py-[100px] gap-[14px] lg:gap-[24px]"
    >
      <div class="flex items-center flex-wrap gap-[8px]">
        <span
          v-for="(item, index) in navItems"
          :key="index"
          class="text-sm leading-4 font-medium cursor-pointer flex items-center gap-[8px]"
          :class="{
            'text-primary-color': !isActive(index),
            'text-white': isActive(index),
          }"
          @click="() => (item.path ? navigateTo(item.path) : 0)"
        >
          <span
            v-if="index !== 0"
            class="w-[6px] h-[6px] rounded-full bg-white"
          ></span>
          {{ $t(item.name) }}
        </span>
      </div>
      <h1
        class="leading-[1.25rem] lg:text-[2.25rem] lg:leading-[2.875rem] font-bold text-white uppercase"
      >
        {{ $t(navItems[navItems.length - 1].desc) }}
      </h1>
    </UiContainer>
  </nav>
</template>

<style scoped>
.navigate::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(5, 41, 57, 0.8);
  z-index: -1;
}
.navigate::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/bg/navigate_bg.png");
  z-index: -2;
  background-repeat: no-repeat;
  background-size: cover;
}
.no__image {
  position: relative;
}
.no__image::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: linear-gradient(270deg, #ef7f1a 0%, #ace4df 100%);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
}
</style>
