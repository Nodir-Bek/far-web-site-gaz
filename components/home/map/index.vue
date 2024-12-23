<template>
  <section class="w-full relative map-section">
    <UiContainer
      class="flex-col gap-[36px] sm:gap-[40px] lg:gap-[74px] py-[80px] sm:py-[100px] lg:py-[140px]"
    >
      <h3
        class="w-full text-18px leading-[1.5rem] lg:text-[2.25rem] lg:leading-[2.875rem] font-bold text-main-text-color mb-[12px] lg:mb-[24px] uppercase text-right sm:text-center"
      >
        {{ $t("map_title") }}
      </h3>
      <div
        class="flex flex-col md:flex-row justify-center items-center sm:items-start gap-y-[36px] sm:gap-[30px] lg:gap-[9.2%]"
      >
        <div
          class="min-w-[350px] w-full max-w-[697px] lg:max-w-[49.7%] mt-[50px] lg:mt-0"
        >
          <HomeMapSvg @handleClick="mapClick" v-model="activeCountry" />
        </div>

        <div
          class="min-[1260px]:max-w-[32%] lg:flex-grow w-full flex flex-col justify-between gap-y-[28px] lg:gap-y-[32px] p-[24px] lg:p-[32px] bg-[#F6F6F6]"
        >
          <h5
            class="text-[1rem] leading-[1rem] lg:text-[1.375rem] lg:leading-[1.375rem] text-main-text-color uppercase font-bold"
          >
            {{ $t("site_title") }}
          </h5>

          <CardInfo :data="cardData" />

          <!-- <UiButton type="link" class="w-max mt-[12px] sm:mt-0">{{
            $t("more")
          }}</UiButton> -->
        </div>
      </div>
    </UiContainer>
  </section>
</template>

<script setup>
import { getAllDepartments } from "~/services/home";

const activeCountry = ref("150100");
const curentDepartment = ref();

const { data: departments } = await getAllDepartments();

watch(activeCountry, (prefix) => {
  const matchedData = departments.value?.find((itm) => itm?.prefix == prefix);
  if (matchedData) {
    curentDepartment.value = matchedData;
  }
});
onMounted(() => {
  const matchedData = departments.value?.find((itm) => itm?.prefix == "150100");
  curentDepartment.value = matchedData;
});
const cardData = computed(() => [
  {
    label: "work_period",
    value: curentDepartment.value?.working_time ?? "-",
  },
  {
    label: "address",
    value: curentDepartment.value?.address ?? "-",
  },
  {
    label: "index",
    value: curentDepartment.value?.index ?? "-",
  },
  {
    label: "e-mail",
    value: curentDepartment.value?.email ?? "-",
  },
  {
    label: "phone",
    value: curentDepartment.value?.phone ?? "-",
  },
]);

const mapClick = (prefix) => {
  const region = "";
  if (prefix) {
    if (region) {
      activeCountry.value = prefix;
    }
  }
};
</script>

<style scoped>
.map-section::before {
  content: "";
  display: block;
  position: absolute;
  top: 140px;
  left: 0px;
  background-color: #f6f6f6;
  width: 711px;
  height: 336px;
  z-index: -1;
}

@media screen and (max-width: 1024px) {
  .map-section::before {
    width: 275px;
    height: 130px;
    top: 100px;
  }
}

@media screen and (max-width: 640px) {
  .map-section::before {
    width: 178px;
    height: 84px;
    top: 80px;
  }
}
</style>
