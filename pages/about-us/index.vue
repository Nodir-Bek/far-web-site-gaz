<script setup lang="ts">
import { AboutUsService } from "~/services/pages";
const { socialLinks } = baseStore();

const $t = useI18n().t;
definePageMeta({
  title: "about",
  desc: "about_desc",
});

interface IQuery {
  limit: number;
  page: number;
}

const query = reactive<IQuery>({
  limit: 10,
  page: 1,
});

const { data: aboutUs } = await AboutUsService.getAllPaginate(query);
const content = computed(() => aboutUs.value?.rows[0]?.content);

const cardData = computed(() => [
  {
    label: "work_period",
    value: aboutUs.value?.rows[0]?.working_time,
  },
  {
    label: "address",
    value: aboutUs.value?.rows[0]?.address,
  },
  {
    label: "index",
    value: aboutUs.value?.rows[0]?.index,
  },
  {
    label: "e-mail",
    value: aboutUs.value?.rows[0]?.email,
  },
  {
    label: "phone",
    value: aboutUs.value?.rows[0]?.phone,
  },
]);
const openLink = (link: string) => {
  window.open(link, "_blank");
};
</script>

<template>
  <div class="w-full">
    <NavigateBar />
    <UiContainer
      class="flex-col pt-[40px] pb-[100px] lg:pt-[100px] lg:pb-[100px]"
    >
      <div
        class="flex flex-col lg:flex-row gap-[32px] items-start lg:gap-[20px]"
      >
        <div class="max-w-[925px] grid grid-cols-1 gap-[24px]">
          <h2
            class="w-full text-20px leading-20px lg:text-32px lg:leading-32px font-bold text-main-text-color text-left uppercase"
          >
            {{ $t("about_sub_title") }}
          </h2>

          <div
            class="text-16px leading-25px font-normal"
            v-html="htmlTextFormatter(content)"
          ></div>

          <div class="w-full">
            <SliderImage
              :data="aboutUs?.rows"
              width-class="w-full"
              image-height-class="h-[188px] sm:h-[253px] lg:h-[522px]"
            />
          </div>
        </div>

        <div
          class="w-full max-w-[450px] flex flex-col justify-between gap-y-[28px] lg:gap-y-[32px] p-[24px] lg:p-[32px] bg-[#F6F6F6] shrink-0"
        >
          <h5
            class="text-[1rem] leading-[1rem] lg:text-[1.375rem] lg:leading-[1.375rem] text-main-text-color uppercase font-bold"
          >
            {{ $t("site_title") }}
          </h5>

          <CardInfo :data="cardData" />

          <div class="flex justify-start items-center gap-3">
            <div
              v-for="link in socialLinks"
              class="flex items-center justify-center w-[28px] h-[28px] bg-white text-main-text-color hover:text-white hover:bg-primary-color transition-all rounded-full p-[7px] cursor-pointer"
              @click="openLink(link.link)"
            >
              <MyIcon :name="link.name" :is-footer="true" />
            </div>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>
