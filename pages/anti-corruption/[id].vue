<script setup lang="ts">
const { socialLinks } = baseStore();

import { antiCorruptonService, NewsService } from "~/services/pages";
import PdfTemlate from "~/components/pdf-templates/getOne/index.vue";
const pdfContent = ref(null);
const route = useRoute();
const $t = useI18n().t;
const customPrint = ref<boolean>(false);
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

const { handlePreview } = previewImageMode();
const id = route.params.id;
const query = reactive({
  limit: 10,
  page: 1,
});

const { data } = await antiCorruptonService.getOneById(id as string);
const { data: otherData } = await antiCorruptonService.getAllDataWithPaginate(
  query
);
const filteredData = computed(() =>
  otherData?.value
    ? otherData?.value?.rows?.filter((item) => item?.id !== Number(id))
    : []
);

const openLink = (link: string) => {
  window.open(link, "_blank");
};

const printPage = () => {
  window.print();
};

const { createPdf } = useGeneratePdf();

const download = () => {
  if (pdfContent.value) {
    createPdf(pdfContent.value, `${data?.value?.title.slice(0, 50)}...`);
  }
};
</script>
<template>
  <div class="pt-[40px] sm:pt-[47px] lg:pt-[60px]">
    <UiContainer
      class="flex-col sm:flex-row gap-y-[20px] mb-[40px] sm:mb-[100px] lg:mb-[140px]"
    >
      <div
        class="flex sm:flex-col gap-y-[20px] gap-x-[12px] sm:pr-[24px] lg:pr-[55px] lg:pl-[30px] print:hidden"
      >
        <div
          class="flex items-center justify-center w-[40px] h-[40px] bg-[#A1A4AA29] hover:bg-primary-color transition-all rounded-full group"
          @click="$router?.back"
        >
          <MyIcon
            name="ArrowLeft"
            class="text-[#A1A4AA] group-hover:text-white"
          />
        </div>
        <div
          v-for="link in socialLinks"
          class="flex items-center justify-center w-[40px] h-[40px] bg-[#A1A4AA29] hover:bg-primary-color text-[#A1A4AA] hover:text-white transition-all rounded-full"
          @click="openLink(link.link)"
        >
          <MyIcon :name="link.name" />
        </div>
      </div>

      <div
        class="w-full sm:border-l border-[#F0F0F1] sm:pl-[24px] lg:pl-[55px]"
      >
        <div
          class="flex gap-4 justify-between items-center mb-[20px] sm:mb-[28px] lg:mb-[13px]"
        >
          <span
            class="font-medium text-14px leading-14px text-secondary-text-color"
          >
            {{ dateFormater(data?.date as string, months, $t) }}
          </span>

          <div class="flex gap-[24px]">
            <UiIconBtn
              :on-click="download"
              custom-classes="w-[36px] h-[36px] cursor-pointer"
            >
              <MyIcon name="DownloadIcon" />
            </UiIconBtn>
            <UiIconBtn
              custom-classes="w-[36px] h-[36px] cursor-pointer"
              :onClick="printPage"
            >
              <MyIcon name="PrinterIcon" size="18" />
            </UiIconBtn>
          </div>
        </div>

        <div>
          <h3
            class="lg:max-w-[1008px] text-18px leading-25px lg:text-24px lg:leading-[2.125rem] text-main-text-color font-bold uppercase mb-[16px] sm:mb-[24px]"
          >
            {{ data?.title }}
          </h3>

          <p
            class="text-15px leading-24px lg:text-16px lg:leading-26px text-main-text-color font-normal text-justify mb-[26px] sm:mb-[24px] lg:mb-[30px]"
            v-html="htmlTextFormatter(data?.desc as string)"
          ></p>

          <div
            class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-[16px] sm:gap-y-[14px] sm:gap-x-[14px] lg:gap-x-[20px] lg:gap-y-[20px]"
          >
            <CardImageMode
              v-for="photo in data?.photos.slice(0, 6)"
              :path="photo"
              class="w-full md:first:col-span-2 col-span-1 md:[&:nth-child(5n)]:col-span-2 h-[189px] sm:h-[210px] lg:h-[294px] cursor-pointer"
              :handlePreview="() => handlePreview(photo, data?.photos)"
            />
          </div>
        </div>
      </div>
      <div ref="pdfContent" class="hidden">
        <PdfTemlate :data="data" />
      </div>
    </UiContainer>

    <div
      class="bg-grey-background-color pb-[100px] pt-[60px] lg:pb-[140px] lg:pt-[80px] print:hidden"
    >
      <div
        class="xl:max-w-[1660px] w-full ml-auto pl-[20px] md:pl-[40px] 2xl:pl-0"
      >
        <SliderNewsDetail
          :title="$t('other-anti-corruption')"
          :data="filteredData"
          type="anti-corruption"
          width-class="w-full lg:max-w-[451px]"
        />
      </div>
    </div>
  </div>
</template>
