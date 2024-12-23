<script setup lang="ts">
definePageMeta({
  title: "trade_union",
  desc: "trade_union",
});

import { tradeUnionSevice } from "~/services/pages";

const pdfContent = ref(null);

const { data } = await tradeUnionSevice.getAllTradeUnions();
const { handlePreview } = previewImageMode();
</script>

<template>
  <div class="w-full">
    <NavigateBar />

    <UiContainer
      ref="pdfContent"
      class="flex-col pt-[40px] pb-[100px] lg:pt-[100px] lg:pb-[100px]"
    >
      <div class="flex flex-col lg:flex-row gap-[67px]">
        <div class="w-full flex-grow flex flex-col gap-[24px] lg:gap-[16px]">
          <h2
            class="text-20px leading-20px lg:text-32px lg:leading-32px font-bold text-main-text-color text-left uppercase"
          >
            {{ data && data[0]?.title }}
          </h2>
          <p
            class="text-16px leading-25px font-normal"
            v-html="htmlTextFormatter((data && data[0]?.desc) || '')"
          ></p>
        </div>

        <CardImageMode
          class="w-full max-w-[365px] h-[273px] lg:max-w-[46%] lg:h-[482px]"
          :path="(data && data[0]?.photo) || ''"
          :handlePreview="
            () => handlePreview((data && data[0]?.photo) || '', [])
          "
        />
      </div>
    </UiContainer>
  </div>
</template>
