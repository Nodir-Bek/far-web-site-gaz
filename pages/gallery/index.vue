<script setup lang="ts">
definePageMeta({
  title: "gallery",
  desc: "gallery-desc",
});
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
  limit: 12,
  page: 1,
});
const queryVideo = reactive({
  limit: 12,
  page: 1,
});
const { data: gallaryImages } = await getGallaryImagesPaginate(queryImage);
const { data: gallaryVideos } = await getGallaryVideosPaginate(queryVideo);
const { handlePreview } = previewImageMode();
</script>

<template>
  <div class="w-full">
    <NavigateBar />
    <UiContainer
      class="flex-col gap-[16px] sm:gap-[20px] lg:gap-[30px] pt-[60px] sm:pt-[40px] pb-[100px] lg:pt-[80px] lg:pb-[140px]"
    >
      <UiTab :active="activeTab" :tabs="tabs" @handler="handleTab" />

      <UiEmpty
        v-if="activeTab == 'fotoGallery'"
        :is-empty="!gallaryImages?.rows && true"
      >
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-[14px] sm:gap-[12px] lg:gap-[24px]"
        >
          <CardImageMode
            v-for="item in gallaryImages?.rows"
            :key="item.id"
            :path="item?.photo as string"
            image-class="w-full h-[158px] sm:h-[144px] lg:h-[267px] cursor-pointer"
            :handle-preview="() => handlePreview(item.photo as string, [])"
          />
        </div>
        <div
          class="w-full flex justify-center dark:last:disabled: first:rounded-s-none mt-[40px] sm:mt-[60px]"
        >
          <UPagination
            v-if="
              gallaryImages?.count && gallaryImages?.count > queryImage.limit
            "
            v-model="queryImage.page"
            :page-count="queryImage.limit"
            :total="gallaryImages?.count || 0"
            :max="5"
            :ui="{
              wrapper: 'flex items-center gap-[8px]',
              base: 'w-[40px] h-[40px] flex items-center justify-center text-[1rem] leading-[1.25rem] border border-[#E7EAF2] shadow-none ring-0',
              rounded:
                'dark:last:bg-white dark:last:text-secondary-light dark:first:bg-white dark:first:text-secondary-light dark:first:disabled:bg-white dark:first:disabled:text-secondary-light dark:last:disabled:bg-white dark:last:disabled:text-secondary-light last:rounded-e-none  first:rounded-s-none',
              default: {
                activeButton: {
                  class:
                    'bg-brand-color dark:bg-brand-color dark:hover:bg-brand-color/80 hover:bg-brand-color/80 dark:ring-0 dark:text-white rounded-none',
                },
                inactiveButton: {
                  class:
                    'bg-transparent dark:bg-white dark:hover:bg-brand-color/90 dark:text-secondary-light dark:hover:text-white',
                },
              },
            }"
          />
        </div>
      </UiEmpty>

      <UiEmpty
        v-if="activeTab == 'videGallery'"
        :is-empty="!gallaryVideos?.rows || !gallaryVideos?.rows"
      >
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px] sm:gap-[12px] lg:gap-[24px]"
        >
          <iframe
            v-for="item in gallaryVideos?.rows"
            :key="item.id"
            class="w-full h-[158px] sm:h-[144px] lg:h-[267px]"
            :src="item.media as string"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        </div>
        <div
          class="w-full flex justify-center dark:last:disabled: first:rounded-s-none mt-[40px] sm:mt-[60px]"
        >
          <UPagination
            v-if="
              gallaryVideos?.count && gallaryVideos?.count > queryVideo.limit
            "
            v-model="queryVideo.page"
            :page-count="queryVideo.limit"
            :total="gallaryVideos?.count || 0"
            :max="5"
            :ui="{
              wrapper: 'flex items-center gap-[8px]',
              base: 'w-[40px] h-[40px] flex items-center justify-center text-[1rem] leading-[1.25rem] border border-[#E7EAF2] shadow-none ring-0',
              rounded:
                'dark:last:bg-white dark:last:text-secondary-light dark:first:bg-white dark:first:text-secondary-light dark:first:disabled:bg-white dark:first:disabled:text-secondary-light dark:last:disabled:bg-white dark:last:disabled:text-secondary-light last:rounded-e-none  first:rounded-s-none',
              default: {
                activeButton: {
                  class:
                    'bg-brand-color dark:bg-brand-color dark:hover:bg-brand-color/80 hover:bg-brand-color/80 dark:ring-0 dark:text-white rounded-none',
                },
                inactiveButton: {
                  class:
                    'bg-transparent dark:bg-white dark:hover:bg-brand-color/90 dark:text-secondary-light dark:hover:text-white',
                },
              },
            }"
          />
        </div>
      </UiEmpty>
    </UiContainer>
  </div>
</template>
