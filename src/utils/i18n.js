import I18n from "i18n-js"

// import en from "./locales/en"
import id from "./locales/id"

I18n.defaultLocale = "id-ID";
I18n.fallbacks = true;
I18n.translations = {
  id,
  // en,
};


export default I18n;
