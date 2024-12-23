<script lang="ts" setup>
const $t = useI18n().t;
const { data } = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
});


const getRekvizits = (item) => {
  return [
    { label: "reception_days", value: item.admission_days },
    { label: "reception_time", value: item.reception_time },
  ];
};
</script>
<template>
  <div
    style="
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    "
  >
    <div
      v-for="(item, index) in data"
      :key="index"
      style="
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
        background-color: white;
        border: 1px solid #e7eaf2;
        border-radius: 8px;
        padding: 12px;
        margin: 10px;
      "
    >
      <img
        :style="{
          borderRadius: '8px',
          objectFit: 'contain',
          aspectRatio: '16/9',
        }"
        width="74px"
        height="87px"
        :src="item?.photo"
        alt="card image"
        crossorigin="anonymous"
      />

      <div
        style="
          width: max-content;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 10px;
        "
      >
        <p
          style="
            font-size: 15px;
            line-height: 15px;
            font-weight: bold;
            color: var(--main-text-color);
            text-align: left;
            text-transform: capitalize;
          "
        >
          {{ item?.full_name || "- - -" }}
        </p>
        <p
          style="
            width: 200px;
            word-break: normal;
            font-size: 12px;
            line-height: 12px;
            font-weight: medium;
            color: var(--main-text-color);
            text-align: left;
            text-transform: capitalize;
          "
        >
          {{ item?.desc || "-" }}
        </p>

        <div
          style="
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4px;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              gap: 2px;
            "
          >
            <div
              v-for="(item, index) in getRekvizits(item)"
              :key="index"
              style="
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 2px;
                font-weight: normal;
              "
            >
              <span
                style="
                  color: var(--main-text-color);
                  font-size: 12px;
                  line-height: 12px;
                  font-weight: normal;
                  margin-right: 8px;
                "
              >
                {{ $t(item.label) }}:
              </span>
              <span
                style="
                  color: var(--main-text-color);
                  font-size: 12px;
                  line-height: 12px;
                  font-weight: 500;
                "
              >
                {{ item.value }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
