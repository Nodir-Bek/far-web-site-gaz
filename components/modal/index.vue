<script lang="ts" setup>
import searchNews from "../search/news/index.vue";
defineProps({
  modalBodyName: {
    type: String,
    required: true,
  },
  previewImageAnimate: {
    type: Boolean,
    default: false,
  },
  showModal: {
    type: Function,
    required: true,
  },
  modalData: {
    type: Object,
    required: true,
  },
});

const bodyContent = {
  // UserCard: UserCard,
  // Tasks: TasksDinamik,
  SearchNews: searchNews,
};
</script>
<template>
  <div
    v-if="modalBodyName"
    class="w-full h-[100vh] fixed bg-[#38405599] left-0 top-0 z-[100] backdrop-blur-sm flex justify-center items-center snap-none"
  >
    <div
      :class="previewImageAnimate ? 'scale-100' : 'scale-0'"
      class="max-h-[80vh] max-w-[95%] md:max-w-[80%] bg-white rounded-lg relative overflow-hidden p-4 md:p-7 !pt-20 w-full h-full transition-all duration-300 ease-in-out flex justify-center items-start"
    >
      <!-- <div class="w-full absolute top-5 left-5 text-xl font-bold">
        {{
          modalBodyName === "SearchNews" ? $t(modalBodyName) : $t("Batafsil")
        }}
      </div> -->
      <div
        @click="() => showModal()"
        class="w-[35px] h-[35px] absolute top-5 right-5 rounded-full cursor-pointer flex justify-center items-center"
      >
        <Icon name="ic:sharp-clear" size="36" class="text-[#4D4D4D]" />
      </div>
      <div class="w-full h-full">
        <component
          :is="bodyContent[modalBodyName as keyof typeof bodyContent]"
          :data="modalData"
        />
      </div>
    </div>
  </div>
</template>
