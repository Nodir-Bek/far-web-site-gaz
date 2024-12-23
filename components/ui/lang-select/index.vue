<script lang="ts" setup>
import { langs } from "../../../locales/helper";
const { locale, setLocale } = useI18n();
const isOpen = ref(false);
const localeLang = useCookiesComposable();
const route = useRoute();

defineProps({
  color: { type: String, default: "#fff" },
  isMobile: { type: Boolean, default: false },
});

const emit = defineEmits(["clickLang"]);

const body = ref<HTMLElement | null>(null);
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const visabLocale = computed(() => {
  return langs.find((item) => item.code == locale.value)?.name;
});

onClickOutside(body, (): void => {
  isOpen.value = false;
});
const onSelect = (code: string) => {
  emit("clickLang");
  localeLang.value = code;
  setLocale(code);
  toggle();
};
</script>
<template>
  <div
    class="w-full h-auto flex justify-start items-stretch gap-4 relative z-50 bg-inherit overflow-visible"
  >
    <button
      @click="toggle"
      class="w-full h-auto flex justify-start items-center gap-2"
      :class="
        route.path === '/' && !isMobile
          ? 'text-[#fff]'
          : isMobile
          ? 'text-[#052939] border border-main-text-color py-[2px] px-[5px] rounded-md'
          : 'text-[#052939]'
      "
    >
      <span class="uppercase">{{ visabLocale }}</span>
    </button>
    <div
      v-if="isOpen"
      ref="body"
      class="w-full min-w-max h-auto flex flex-col justify-center items-stretch absolute left-0 z-[9999] bg-white shadow-md rounded-md text-primary-bold overflow-hidden"
      :class="isMobile ? 'top-8' : 'top-6'"
    >
      <button
        v-for="({ code, name }, index) in langs"
        :key="index"
        @click="onSelect(code)"
        class="w-full h-auto flex justify-center items-center gap-2 text-main-text-color hover:bg-brand-color group transition-all duration-300 ease-in-out capitalize font-semibold"
        :class="{
          'bg-brand-color text-white': locale === code,
        }"
      >
        <span
          class="w-full p-2 group-hover:text-white transition-all duration-300 ease-in-out"
          :class="{
            ' text-white': locale === code,
          }"
        >
          {{ name }}
        </span>
      </button>
    </div>
  </div>
</template>
