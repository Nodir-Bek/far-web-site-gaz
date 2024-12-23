<script lang="ts" setup>
import type { User } from "~/types/home";

const props = defineProps({
  data: {
    type: Array as PropType<User[]>,
    required: true,
  },
});
</script>
<template>
  <div ref="pdfRef" class="flex flex-col gap-y-7 py-[28px]">
    <div
      v-for="item in data"
      :key="item.id"
      class="flex flex-col gap-y-3"
    >
      <p class="text-[1.125rem] leading-25px text-[#0B73FF]">{{ item.position }} :</p>
      <div class="flex flex-col gap-[15px]">
        <div class="flex flex-col gap-[5px]">
          <div
            class="flex flex-col sm:flex-row gap-[20px]"
          >
            <CardImageMode
              class="md:w-[162px] h-[174px]"
              image-class="object-fill"
              :path="item.photo"
            />
            <div class="py-[19px] flex flex-col gap-[24px] flex-grow">
              <h6
                class="text-[1.25rem] leading-[1.25rem] text-[#16181E] font-semibold"
              >
                {{ item.firstName }} {{ item.lastName }} {{ item.middleName }}
              </h6>
              <p
                class="max-w-[504px] text-[#777E94] text-[1rem] leading-[1.5rem]"
              >
                {{ item.position }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-[2px]">
            <CardInfo
              v-for="data in item.cardData"
              :key="data.label"
              :dinamic-class="data.class"
              :label="data.label"
              :value="data.value"
              :is-pdf="true"
            />
          </div>
        </div>
        <CardWorkExperience
          class="py-[28px]"
          inner-padding-x="0px"
          :data="item.laborActivities"
          :is-linear="true"
          :is-pdf="true"
        />
      </div>
    </div>
  </div>
</template>
