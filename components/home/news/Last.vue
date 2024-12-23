<script setup lang="ts">
import { NewsService } from "~/services/pages";
import { useWindowSize } from "@vueuse/core";

const width = useWindowSize().width;

interface IQuery {
  limit: number;
  page: number;
  date?: string;
  status?: number;
}

const query = reactive<IQuery>({
  limit: 7,
  page: 1,
  status: 1,
});

const { data: newsData } = await NewsService.getNewsPaginate(query);
const changeActivemenu = (accessor: string, subitem?: string) => {
  const subItemLink = subitem ? `/${subitem}` : "";
  baseStore().setparentMenu(accessor);
  baseStore().setsubMenu(subItemLink);
};
</script>

<template>
  <section class="w-full">
    <UiContainer
      class="flex-col pb-[80px] sm:pb-[100px] lg:pb-[140px] gap-y-[24px] sm:gap-y-[20px] lg:gap-y-[40px]"
    >
      <div class="flex justify-between items-end">
        <div class="flex flex-col gap-y-[12px]">
          <UiSubTitle :label="$t('news')" />
          <h2
            class="w-full text-18px leading-18px lg:text-[2.25rem] lg:leading-[2.25rem] font-bold text-main-text-color uppercase"
          >
            {{ $t("last_news") }}
          </h2>
        </div>

        <UiButton
          :to="{
            path: '/news',
            query: {
              news_type: 'last',
            },
          }"
          @click="changeActivemenu('news')"
          type="outlined"
          class="hidden sm:block py-[10px] px-[24px] lg:py-[12px] lg:px-[36px]"
        >
          {{ $t("all") }}
        </UiButton>
      </div>

      <div
        class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[16px] sm:gap-y-[24px] sm:gap-x-[24px]"
      >
        <template v-for="(news, index) in newsData?.rows" :key="news.id">
          <CardOverlay
            v-if="index == 0"
            :data="news"
            class="md:col-span-2 col-span-1"
            width-class="w-full"
            :is-desc="width > 640 ? true : false"
            line-clamp="line-clamp-2 sm:line-clamp-3 lg:line-clamp-1 lg:text-2xl"
          />
          <CardOverlay
            v-else
            :data="news"
            class="col-span-1"
            width-class="w-full"
            line-clamp="line-clamp-2 sm:line-clamp-3 lg:line-clamp-2 lg:text-18px lg:leading-[1.4375rem]"
          />
        </template>
      </div>

      <UiButton
        to="/news"
        type="outlined"
        class="block w-max mx-auto sm:hidden py-[10px] px-[24px] lg:py-[12px] lg:px-[36px]"
      >
        {{ $t("all") }}
      </UiButton>
    </UiContainer>
  </section>
</template>
