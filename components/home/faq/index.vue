<script setup lang="ts">
import { getFaqsAlldata } from "~/services/home";

const { data } = await getFaqsAlldata();
const faq = computed(() =>
  data.value?.map((faqItem) => ({
    title: faqItem.title,
    content: faqItem.desc,
    id: faqItem.id,
  }))
);
</script>

<template>
  <section class="w-full calculator relative">
    <UiContainer class="flex-col pb-[60px] sm:pb-[40px] lg:pb-[80px]">
      <UiSubTitle class="mb-[12px]" :label="$t('faq')" />
      <h3
        class="w-full text-18px leading-[1.5rem] lg:text-[2.25rem] lg:leading-[2.875rem] font-bold text-main-text-color text-left uppercase mb-[24px] sm:mb-[20px] lg:mb-[40px]"
      >
        {{ $t("faq_title") }}
      </h3>

      <UiCollapse :items="faq" />
    </UiContainer>
  </section>
</template>

<style lang="css" scoped></style>
