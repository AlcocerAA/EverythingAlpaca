import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/en.json"
import es from "./locales/es.json"
import de from "./locales/de.json"
import it from "./locales/it.json"

/* ===============================
   DETECCIÓN DE IDIOMA
================================ */
const getBrowserLanguage = () => {
  const saved = localStorage.getItem("i18nextLng")
  if (saved) return saved

  const lang = navigator.language.split("-")[0]
  return ["en", "es", "de", "it"].includes(lang) ? lang : "en"
}

/* ===============================
   INIT I18N
================================ */
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    de: { translation: de },
    it: { translation: it },
  },
  lng: getBrowserLanguage(),
  fallbackLng: "en",
  supportedLngs: ["en", "es", "de", "it"],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

/* ===============================
   GUARDAR IDIOMA AL CAMBIAR
================================ */
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng)
})

export default i18n
