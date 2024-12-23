import { useStorage } from "@vueuse/core";

export const useChatBot = defineStore("useChatBot", () => {
  const userId = ref('');
  const isOpen = useStorage("isOpen", false);

  const toggleModal = () => {
    isOpen.value = !isOpen.value;
  };
  function setUserId(id: string) {
    userId.value = id;
    localStorage.setItem("userId", id);
  }
  onMounted(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      userId.value = id;
    }
  })
  return {
    isOpen,
    toggleModal,
    userId,
    setUserId,
  };
});
