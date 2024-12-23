<script setup lang="ts">
import {
  getGallaryImagesPaginate,
  getGallaryVideosPaginate,
} from "~/services/home";
export interface Tabs {
  key: string;
  label: string;
}
const $t = useI18n().t;
const tabs = computed((): Tabs[] => [
  {
    key: "fotoGallery",
    label: $t("fotogalereya"),
  },
  { key: "videGallery", label: $t("videogalereya") },
]);

const handleTab = (id: string) => {
  activeTab.value = id;
};

const activeTab = ref("fotoGallery");

const queryImage = reactive({
  limit: 6,
  page: 1,
});
const queryVideo = reactive({
  limit: 4,
  page: 1,
});

const { data: gallaryImages } = await getGallaryImagesPaginate(queryImage);
const { data: gallaryVideos } = await getGallaryVideosPaginate(queryVideo);
</script>
<template>
  <section
    class="flex flex-col gap-[20px] sm:gap-[24px] pb-[80px] sm:pb-[100px] lg:pb-[140px]"
  >
    <UiContainer class="flex-col gap-[20px] sm:gap-[24px]">
      <div class="flex justify-between items-end">
        <UiTab :active="activeTab" :tabs="tabs" @handler="handleTab" />

        <UiButton
          to="/gallery"
          type="outlined"
          class="hidden sm:block py-[10px] px-[24px] lg:py-[12px] lg:px-[36px]"
        >
          {{ $t("all") }}
        </UiButton>
      </div>
      <HomeGalleryImage
        v-if="activeTab == 'fotoGallery'"
        :data="[...gallaryImages?.rows, ...gallaryImages?.rows.slice(0, 2)]"
      />

      <HomeGalleryVideo
        v-if="activeTab == 'videGallery'"
        :data="gallaryVideos?.rows || []"
      />
    </UiContainer>
    <div class="block sm:hidden" v-if="activeTab == 'fotoGallery'">
      <div class="max-w-[640px] w-full ml-auto pl-[20px]">
        <SliderImageGallery :data="gallaryImages?.rows" />
      </div>
      <UiButton
        type="outlined"
        to="/gallery"
        class="block w-max mx-auto sm:hidden py-[10px] px-[24px] lg:py-[12px] lg:px-[36px] mt-[40px]"
      >
        {{ $t("all") }}
      </UiButton>
    </div>
  </section>
</template>
