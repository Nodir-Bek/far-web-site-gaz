import enLang from "./locales/en.json";
import { langs } from "./locales/helper";
import ruLang from "./locales/ru.json";
import uzLang from "./locales/uz.json";
import ўзLang from "./locales/ўз.json";
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "UZL",
  locales: langs,
  messages: {
    UZL: uzLang,
    UZK: ўзLang,
    RUS: ruLang,
    ENG: enLang,
  },
  defaultLocale: "UZL",
  langDir: "locales/",
  lazy: true,

  vueI18n: {
    fallbackLocale: "UZL",
  },
}));
