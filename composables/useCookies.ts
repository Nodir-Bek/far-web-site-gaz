export const useCookiesComposable = () => {
  const localeLang = useCookie("lang");
  return localeLang;
};
