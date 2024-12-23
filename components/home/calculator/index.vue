script
<script setup lang="ts">
import { gasConsumptionCalculatorService } from "~/services/home";
import { gasCalculation } from "./helper";
const $t = useI18n().t;

const season = ref<string>("");
const personality = ref<string>("");
const inputValue = ref(0);
const gasLimitCalculation = ref<{ summ?: number; result?: any[] }>({});

type IQuery = {
  status?: number;
  season?: boolean;
};
const query = reactive<IQuery>({});

const { data } = await gasConsumptionCalculatorService.getAllDataAboutSeasons(
  query
);

const selectData = computed(() => [
  {
    label: $t("Isitish mavsumi"),
    value: "1",
  },
  {
    label: $t("Mavsumdan tashqari"),
    value: "0",
  },
]);
const faceType = computed(() => [
  {
    label: $t("Jismoniy shaxslar"),
    value: "1",
  },
  {
    label: $t("Yuridik shaxslar"),
    value: "2",
  },
]);

const handleCalculateGas = () => {
  if (season.value) {
    query.season = season.value === "1" ? true : false;
  } else {
    delete query.season;
  }
  if (personality.value) {
    query.status = personality.value === "1" ? 1 : 2;
  } else {
    delete query.status;
  }
  const result = gasCalculation(inputValue.value, data?.value ?? []);
  const summ = result.reduce((a, b) => a + b.cost, 0);
  gasLimitCalculation.value.result = result;
  gasLimitCalculation.value.summ = summ;
};
</script>

<template>
  <section
    :class="accessibilityMode().noImage ? 'no__image' : 'calculator'"
    class="w-full relative"
  >
    <UiContainer class="flex-col py-[60px] sm:py-[40px] lg:py-[80px]">
      <UiSubTitle class="mb-[12px]" :label="$t('services')" />
      <h3
        class="w-full text-18px leading-[1.5rem] lg:text-[2.25rem] lg:leading-[2.875rem] font-bold text-white text-left uppercase mb-[30px] lg:mb-[58px]"
      >
        {{ $t("calculator_title") }}
      </h3>
      <div
        class="flex gap-y-[40px] flex-col md:flex-row sm:gap-x-[24px] lg:gap-x-[64px]"
      >
        <div class="w-full max-w-[668px]">
          <div class="w-full flex flex-col gap-y-[12px] mb-[23px] lg:mb-[32px]">
            <span
              class="text-15px leading-15px text-white lg:text-[1rem] lg:leading-[1rem] font-medium"
            >
              {{ $t("season_select") }}
            </span>
            <UiCustomSelect
              v-model="season"
              :data="selectData"
              option-label="label"
              option-value="value"
              input-class="w-full"
              class="w-full"
              :placeholder="$t('season_select')"
            />
          </div>
          <div class="w-full flex flex-col gap-y-[12px] mb-[23px] lg:mb-[32px]">
            <span
              class="text-15px leading-15px text-white lg:text-[1rem] lg:leading-[1rem] font-medium"
            >
              {{ $t("face_type_select") }}
            </span>
            <UiCustomSelect
              v-model="personality"
              :data="faceType"
              option-label="label"
              option-value="value"
              input-class="w-full"
              class="w-full"
              :placeholder="$t('face_type_select')"
            />
          </div>

          <div class="w-full flex flex-col gap-y-[12px] mb-[60px]">
            <span
              class="text-15px leading-15px text-white lg:text-[1rem] lg:leading-[1rem] font-medium"
            >
              {{ $t("gas_v") }}
            </span>
            <UiRangeInput v-model="inputValue" :max="500000" />
          </div>
          <UiIconBtn
            @click="handleCalculateGas"
            class="w-full cursor-pointer py-3"
            type="primary"
            >{{ $t("calculate") }}</UiIconBtn
          >
        </div>

        <div class="flex flex-col gap-y-[20px] lg:gap-y-[32px] text-white pt-6">
          <div class="flex flex-col gap-y-[12px] lg:gap-y-[16px]">
            <span
              class="text-15px leading-5 lg:text-[1rem] lg:leading-[1rem] font-medium"
            >
              {{ $t("calculate_period") }}
            </span>
            <span
              class="text-[1.25rem] leading-5 lg:text-[1.5rem] lg:leading-[1.5rem] font-semibold"
            >
              {{
                inputValue > 0
                  ? formatNumber(gasLimitCalculation?.summ as number)
                  : "0"
              }}
              UZS
            </span>
          </div>
          <div class="flex flex-col gap-y-[16px]">
            <span
              class="text-15px leading-5 lg:text-[1rem] lg:leading-[1rem] font-medium"
            >
              {{ $t("formula_title") }}
            </span>

            <div
              v-for="(item, index) of gasLimitCalculation.result"
              :key="item.id"
              class="flex flex-col gap-y-[12px] lg:gap-y-[14px]"
            >
              <div
                class="text-15px leading-5 lg:text-[1rem] lg:leading-[1rem] font-medium"
              >
                <var class="text-primary-color"
                  >{{ item.count }}<sup>3</sup></var
                >
                *
                <var class="text-[#008AEE]"
                  >{{ item.price }} {{ $t("summ") }}</var
                >
                =
                <var
                  >{{ formatNumber(item.count * item.price) || 0 }}
                  {{ $t("summ") }}</var
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </UiContainer>
  </section>
</template>

<style lang="css" scoped>
.calculator::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(5, 41, 57, 0.8);
  z-index: -1;
}
.calculator::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/bg/bg_calculator.png");
  z-index: -2;
  background-size: contain;
}

.no__image {
  position: relative;
}
.no__image::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: linear-gradient(270deg, #ace4df 0%, #ef7f1a 100%);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
}
</style>
