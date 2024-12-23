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
  status: 2,
});

const { data: newsData } = await NewsService.getNewsPaginate(query);
const changeActivemenu = (accessor: string, subitem?: string) => {
  const subItemLink = subitem ? `/${subitem}` : "";
  baseStore().setparentMenu(accessor);
  baseStore().setsubMenu(subItemLink);
};
</script>

<template>
  <section class="w-full py-[60px] lg:py-[100px] news relative">
    <UiContainer class="flex-col mb-[24px] sm:mb-[40px]">
      <div class="flex justify-between items-end">
        <h3
          class="w-full text-18px leading-18px lg:text-[2.25rem] lg:leading-[2.25rem] font-bold text-white uppercase"
        >
          {{ $t("news_title") }}
        </h3>

        <UiButton
          to="/news"
          @click="changeActivemenu('news')"
          type="outlined"
          class="hidden sm:block py-[10px] px-[24px] lg:py-[12px] lg:px-[36px]"
        >
          {{ $t("all") }}
        </UiButton>
      </div>
    </UiContainer>

    <div class="max-w-[1660px] w-full ml-auto pl-[20px] md:pl-[40px] 2xl:pl-0">
      <SliderNews
        :data="newsData?.rows"
        width-class="w-full lg:max-w-[451px]"
      />
    </div>

    <UiButton
      to="/news"
      type="outlined"
      class="block w-max mx-auto sm:hidden py-[10px] px-[24px] lg:py-[12px] lg:px-[36px] mt-[60px]"
    >
      {{ $t("all") }}
    </UiButton>
  </section>
</template>

<style lang="css" scoped>
.news::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: #052939;
  z-index: -2;
}
.news::before {
  content: "";
  position: absolute;
  top: 52px;
  left: 0;
  width: 737px;
  height: 108px;
  background-image: url("/images/bg/news_bg.png");
  z-index: -1;
  background-size: contain;
}
</style>
