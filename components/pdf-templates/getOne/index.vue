<script setup>
const { data } = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const dynamicGrid = computed(() => {
  const grid = {
    1: "repeat(1, 1fr)",
    2: "repeat(2, 1fr)",
    3: "repeat(3, 1fr)",
    4: "repeat(4, 1fr)",
  };
  return grid[data?.photos?.length];
});
</script>
<template>
  <h3
    style="
      max-width: 1008px;
      font-size: 18px;
      line-height: 25px;
      font-size: 24px;
      line-height: 2.125rem;
      color: var(--main-text-color);
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 16px;
      margin-bottom: 24px;
    "
  >
    {{ data?.title }}
  </h3>

  <p
    style="
      font-size: 15px;
      line-height: 24px;
      font-size: 16px;
      line-height: 26px;
      color: var(--main-text-color);
      font-weight: normal;
      text-align: justify;
      margin-bottom: 26px;
      margin-bottom: 24px;
      margin-bottom: 30px;
    "
    v-html="htmlTextFormatter(data?.desc)"
  ></p>

  <div
    style="
      width: 100%;
      display: grid;
      dynamicGrid      
    "
  >
    <img
      v-for="photo in data?.photos?.slice(0, 6)"
      :src="photo"
      crossorigin="anonymous"
      :style="{
        width: '100%',
        height: auto,
        aspectRatio: '3/2',
        cursor: 'pointer',
      }"
      :alt="photo"
    />
  </div>
</template>
