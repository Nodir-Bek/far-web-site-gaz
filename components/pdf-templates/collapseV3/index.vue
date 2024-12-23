<script setup>
const $t = useI18n().t;
defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>
<template>
  <div>
    <div style="display: flex; flex-direction: column">
      <h3
        style="font-size: 16px; color: var(--primary-color); font-weight: 500"
      >
        {{ data && data[0]?.title }}
      </h3>
      <p
        style="
          font-size: 16px;
          color: var(--main-text-color);
          font-weight: normal;
        "
      >
        {{ data && data[0]?.desc }}
      </p>
    </div>
    <div
      v-for="(item, index) in data[0]?.procedures"
      :key="index"
      style="width: 100%; transition: all 300ms"
    >
      <div
        style="
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          text-align: left;
          background: transparent;
          transition: all;
        "
      >
        <h4>{{ index + 1 }}. {{ $t(item.title) }}</h4>
      </div>

      <div
        style="display: flex; height: auto; flex-direction: column; gap: 5px"
      >
        <p
          style="
            font-size: 16px;
            color: var(--main-text-color);
            font-weight: normal;
            padding: 5px 0;
            text-align: justify;
            margin-left: 30px;
          "
        >
          {{ item.desc }}
        </p>
      </div>
    </div>
  </div>
</template>
