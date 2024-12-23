<script lang="ts" setup>
const $t = useI18n().t;
const { data } = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const rekvizits = computed(() => {
  // const receptionDays = getReceptionDays(data.admission_days);
  // const formattedDays = receptionDays
  //   .map((item) => `${$t(item.weekday.toLowerCase())} ${item.day}`)
  //   .join(", ");
  return [
    { label: "reception_days", value: data.admission_days },
    { label: "reception_time", value: data.reception_time },
  ];
});
</script>
<template>
  <div
    class="w-full flex flex-row justify-between items-center gap-[12px] lg:gap-[30px] bg-white border border-[#E7EAF2] rounded-lg p-[12px] lg:p-[16px]"
  >
    <CardImageMode
      image-class="rounded-md w-full h-full max-w-[74px] max-h-[87px] lg:max-w-[162px] lg:max-h-[174px]  object-contain bg-top aspect-video flex justify-center items-center"
      :path="data.photo"
    />

    <div
      class="w-full flex flex-col justify-start items-start gap-[10px] lg:gap-[18px]"
    >
      <p
        class="text-15px leading-15px lg:text-20px lg:leading-20px font-bold text-main-text-color text-left capitalize"
      >
        {{ data?.full_name || "- - -" }}
      </p>
      <p
        class="text-12px leading-12px lg:text-16px lg:leading-16px font-medium text-main-text-color text-left capitalize line-clamp-1"
      >
        {{ data?.desc || "-" }}
      </p>

      <div
        class="w-full flex flex-col min-[400px]:flex-row justify-between items-end gap-4"
      >
        <div class="flex flex-col justify-start items-start gap-y-2 lg:gap-y-4">
          <div
            v-for="(item, index) in rekvizits"
            :key="index"
            class="w-full grid grid-cols-2 gap-y-2 lg:gap-y-4 font-normal"
          >
            <span
              class="text-main-text-color text-12px leading-12px lg:text-16px lg:leading-16px font-normal mr-[8px]"
            >
              {{ $t(item.label) }}:
            </span>
            <span
              class="text-main-text-color text-12px leading-12px lg:text-16px lg:leading-16px font-normal"
            >
              {{ item.value }}
            </span>
          </div>
        </div>
        <!-- 
        <UiButton type="link"
          ><span class="text-13px leading-13px lg:text-16px lg:leading-16px">{{
            $t("more")
          }}</span></UiButton
        > -->
      </div>
    </div>
  </div>
</template>
