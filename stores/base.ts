import { useStorage } from "@vueuse/core";

export const baseStore = defineStore("baseStore", () => {
  const parentMenu = useStorage("parentMenu", "");
  const subMenu = useStorage("subMenu", "");
  const socialLinks = useStorage<{[key: string]:string}[]>("socialLinks", []);

  function setparentMenu(value: string): void {
    parentMenu.value = value;
  }

  function setsubMenu(value: string): void {
    subMenu.value = value;
  }
  function setSocialLinks(value: { name: string; link: string }[]): void {
    socialLinks.value = value;
  }

  return {
    parentMenu,
    setparentMenu,
    subMenu,
    setsubMenu,
    setSocialLinks,
    socialLinks,
  };
});
