import { useStorage } from "@vueuse/core";

export const accessibilityMode = defineStore("accessibilityMode", () => {
  const accessibilityModal = useStorage("accessibilityModal", false);
  const filterColor = useStorage("filterColor", "default");
  const screenZomm = useStorage("screenZomm", 50);
  const noImage = useStorage("noImage", false);
  const textSize = useStorage("textSize", 50);
  const isScrolled = useStorage("isScrolled", false);
  

  function toggleAccessibilityModal() {
    accessibilityModal.value = !accessibilityModal.value;
  }

  function toggleNoImage() {
    noImage.value = !noImage.value;
  }

  const showAccessibilityModal = computed((): boolean => {
    return accessibilityModal.value;
  });
  const getScreenZomm = computed((): number => {
    return screenZomm.value;
  });

  function setFilterColor(colour: string): void {
    filterColor.value = colour;
  }

  function setScreenZomm(zoom: number): void {
    screenZomm.value = zoom;
  }

  function setTextSize(size: number): void {
    textSize.value = size;
  }
  function seIsScreenScroll() {
    isScrolled.value = true;
  }

  return {
    accessibilityModal,
    toggleAccessibilityModal,
    showAccessibilityModal,
    toggleNoImage,
    noImage,
    getScreenZomm,
    setFilterColor,
    setScreenZomm,
    filterColor,
    screenZomm,
    textSize,
    setTextSize,
    seIsScreenScroll,
    isScrolled,
  };
});
