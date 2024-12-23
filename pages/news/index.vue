<script setup lang="ts">
import { NewsService } from "~/services/pages";
import type { News } from "~/types/home";
import { useWindowSize } from "@vueuse/core";
const {
  query: { news_type },
} = useRoute();
definePageMeta({
  title: "news",
  desc: "news",
});

interface IQuery {
  limit: number;
  page: number;
  date?: string;
  search?: string;
  status?: number;
}
const width = useWindowSize().width;

const query = reactive<IQuery>({
  limit: 11,
  page: 1,
  status: news_type === "last" ? 1 : 2,
});

const fakeFilter = reactive({
  search: "",
  date: new Date().toISOString().slice(0, 10),
});

watchDebounced(
  () => fakeFilter.search,
  (value) => {
    if (fakeFilter.search) {
      query.search = fakeFilter.search;
    } else {
      delete query.search;
    }
    query.page = 1;
  },
  { debounce: 1000 }
);

watch(
  () => fakeFilter.date,
  () => {
    if (fakeFilter.date) {
      query.date = fakeFilter.date;
    } else {
      delete query.date;
    }
    query.page = 1;
  },
  {
    deep: true,
  }
);

const { handlePreview } = previewImageMode();
const $t = useI18n().t;
const months = computed(() => [
  $t("yanvar"),
  $t("fevral"),
  $t("mart"),
  $t("aprel"),
  $t("may"),
  $t("iyun"),
  $t("iyul"),
  $t("avgust"),
  $t("sentabr"),
  $t("oktabr"),
  $t("noyabr"),
  $t("dekabr"),
]);
const handleClearFilters = () => {
  fakeFilter.search = "";
  fakeFilter.date = "";
};

const { data: news } = await NewsService.getNewsPaginate(query);

const firstData = computed((): News => news.value?.rows[0] as News);
</script>

<template>
  <div class="w-full">
    <NavigateBar />
    <UiContainer
      class="flex-col gap-[24px] pt-[40px] pb-[100px] lg:pt-[100px] lg:pb-[100px]"
    >
      <div class="flex flex-col gap-y-[14px]">
        <div class="flex gap-[24px] gap-y-[14px] justify-between items-center">
          <h3
            class="text-20px leading-26px sm:text-20px lg:text-[2rem] sm:leading-20px lg:leading-[2rem] text-main-text-color font-bold uppercase"
          >
            {{ $t("all_news") }}
          </h3>

          <div class="flex gap-[8px] lg:gap-[16px]">
            <UiInput
              :placeholder="$t('search')"
              v-model="fakeFilter.search"
              wrapper-class="hidden sm:flex w-full max-w-[309px] lg:max-w-[450px] h-[36px]"
            />

            <UiDateInput v-model="fakeFilter.date" />
            <button
              type="button"
              aria-label="clear filters"
              class="max-w-10 flex justify-center items-center text-main-text-color hover:text-brand-color transition-all duration-300 ease-linear border-none focus:outline-none focus:ring-0 active:outline-none active:ring-0"
              @click="handleClearFilters"
            >
              <Icon name="icon-park-outline:close" size="24" />
            </button>
          </div>
        </div>
        <UiInput
          v-model="query.search"
          wrapper-class="sm:hidden w-full sm:max-w-[309px] lg:max-w-[450px] h-[36px]"
        />
      </div>

      <UiEmpty :is-empty="!news?.rows || news.rows.length == 0">
        <div
          class="w-full grid grid-cols-1 sm:grid-cols-3 gap-y-[12px] sm:gap-y-[24px] gap-x-[24px] items-stretch"
        >
          <div
            class="w-full relative h-full col-span-2"
            v-if="width > 640 && firstData"
          >
            <CardImageMode
              :path="firstData?.photos[0]"
              :handle-preview="
                () => handlePreview(firstData?.photos[0], firstData?.photos)
              "
              class="w-full object-cover aspect-video h-full max-h-[241px] lg:max-h-[451px]"
            />
            <div
              class="flex flex-col gap-[14px] lg:gap-[24px] absolute bottom-0 w-full bg-[#0317218C] hover:bg-primary-color px-[15px] py-[15px] lg:px-[32px] lg:py-[24px] transition-all cursor-pointer"
              @click="() => navigateTo(`/news/${firstData?.id}`)"
            >
              <span class="font-medium text-14px leading-14px text-white">{{
                dateFormater(firstData?.date || "", months, $t)
              }}</span>
              <div class="flex flex-col gap-[8px] lg:gap-[12px]">
                <p
                  class="font-bold text-16px leading-16px lg:text-24px lg:leading-[2rem] text-white uppercase line-clamp-1"
                >
                  {{ firstData?.title }}
                </p>
                <p
                  class="font-medium text-15px leading-5 lg:text-[1rem] lg:leading-21px text-white line-clamp-2"
                >
                  {{ firstData?.desc }}
                </p>
              </div>
            </div>
          </div>

          <CardNewsCard
            class="col-span-1"
            v-for="data in width < 640 ? news?.rows : news?.rows.slice(1)"
            :key="data.id"
            :data="data as News || {}"
          />
        </div>
      </UiEmpty>

      <div
        class="w-full flex justify-center dark:last:disabled: first:rounded-s-none mt-[36px]"
      >
        <UPagination
          v-if="news?.count && news?.count > query.limit"
          v-model="query.page"
          :page-count="query.limit"
          :total="news?.count || 0"
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
    </UiContainer>
  </div>
</template>
