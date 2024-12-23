<script setup>
import InstallIcon from "../../../assets/icons/InstallIcon.vue";
import CompareIcon from "../../../assets/icons/CompareIcon.vue";
import CountyIcon from "../../../assets/icons/CountyIcon.vue";
import ConnectIcon from "../../../assets/icons/ConnectIcon.vue";
import AgreeIcon from "../../../assets/icons/AgreeIcon.vue";
import AppealIcon from "../../../assets/icons/AppealIcon.vue";
import PublishServicesIcon from "../../../assets/icons/PublishSercivesIcon.vue";
import ConditionIcon from "~/assets/icons/ConditionIcon.vue";

const statistics = [
  {
    desc: "service_1",
    icon: InstallIcon,
    bgColor: "#EF7F1A14",
    link: "https://my.gov.uz/oz/service/236",
  },
  {
    desc: "service_2",
    icon: CompareIcon,
    bgColor: "#00A9BC14",
    link: "https://my.gov.uz/oz/service/758",
  },
  {
    desc: "service_3",
    icon: CountyIcon,
    bgColor: "#FE405914",
    link: "https://my.gov.uz/oz/service/199",
  },
  {
    desc: "service_4",
    icon: ConnectIcon,
    bgColor: "#A868BC14",
    link: "https://my.gov.uz/oz/service/197",
  },
  {
    desc: "service_5",
    icon: AgreeIcon,
    bgColor: "#FF669E14",
    link: "https://my.gov.uz/oz/service/202",
  },
  {
    desc: "service_6",
    icon: ConditionIcon,
    bgColor: "#FFB90114",
    link: "https://my.gov.uz/oz/service/173",
  },
  {
    desc: "service_7",
    icon: AppealIcon,
    bgColor: "#01B4EE14",
    link: "https://my.gov.uz/oz/site/task-view",
  },
  {
    desc: "service_8",
    icon: PublishServicesIcon,
    bgColor: "#00A9BC14",
    link: "https://my.gov.uz/oz/all-services?id=1",
  },
];
</script>

<template name="city-of-numbers">
  <UiContainer
    id="city-of-numbers"
    class="w-full flex-col items-start gap-[24px] sm:gap-[20px] lg:gap-[30px] pb-[80px] sm:pb-[100px] lg:pb-[140px]"
  >
    <div>
      <UiSubTitle class="mb-[12px]" :label="$t('services')" />
      <h3
        class="w-full text-18px leading-[1.5rem] lg:text-[2.25rem] lg:leading-[2.875rem] font-bold text-main-text-color text-left uppercase"
      >
        {{ $t("services_title") }}
      </h3>
    </div>
    <div
      class="w-full h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      <div
        v-for="(
          { title, count, icon, bgColor, desc, color, link }, index
        ) in statistics"
        :key="index"
        @click="
          navigateTo(link, {
            external: true,
            open: {
              target: '_blank',
              noopener: true,
            },
          })
        "
        class="w-full h-full max-h-max border border-[#EDEEF0] flex justify-between items-center gap-4 max-[700px]:gap-[8px] text-title-color bg-[#FFFFFF] rounded p-6 sm:p-[10px] lg:p-6 cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out"
      >
        <div
          v-if="!accessibilityMode().noImage"
          :style="{ backgroundColor: `${bgColor}` }"
          class="p-[10px] lg:p-[14px] w-[52px] h-[52px] sm:w-[44px] sm:h-[44px] lg:w-[63px] lg:h-[63px] flex justify-center items-center"
        >
          <component
            :style="{ color: `${color}` }"
            :is="icon"
            class="w-full h-full"
          />
        </div>
        <div class="w-full flex flex-col justify-between items-start gap-4">
          <p
            class="text-base font-medium leading-5 line-clamp-2 text-main-text-color"
          >
            {{ $t(desc) }}
          </p>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<style scoped></style>
