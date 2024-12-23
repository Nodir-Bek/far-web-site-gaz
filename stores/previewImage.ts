export const previewImageMode = defineStore("previewImageMode", () => {
  const previewImage = ref("");
  const imagesListData = ref([]);
  const previewImageAnimate = ref(false);
  const modalBodyName = ref("");
  const modalData = ref({});

  const handlePreview = (imagePath?: string, imageList?: string[]) => {
    if (imagePath) {
      setTimeout(() => {
        previewImageAnimate.value = true;
      }, 100);
      previewImage.value = imagePath;
      imagesListData.value = imageList as [];
    } else {
      previewImageAnimate.value = false;
      setTimeout(() => {
        previewImage.value = "";
        imagesListData.value = [];
      }, 300);
    }
  };

  const showModal = (componentName?: string, data?: any) => {
    if (componentName) {
      setTimeout(() => {
        previewImageAnimate.value = true;
      }, 100);
      modalBodyName.value = componentName;
      modalData.value = data;
    } else {
      previewImageAnimate.value = false;
      modalData.value = "";
      setTimeout(() => {
        modalBodyName.value = "";
      }, 300);
    }
  };

  return {
    handlePreview,
    previewImage,
    previewImageAnimate,
    showModal,
    modalBodyName,
    modalData,
    imagesListData,
  };
});
