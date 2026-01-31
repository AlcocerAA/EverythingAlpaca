import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/en.json"
import es from "./locales/es.json"
import de from "./locales/de.json"
import it from "./locales/it.json"

/* ===============================
   I18N SETUP (Vite + react-i18next)
   ✅ Fixes:
   - Soporta en-US/es-PE/etc (load: languageOnly)
   - Normaliza el idioma guardado
   - Guarda idioma al cambiar (localStorage)
================================ */

const SUPPORTED = ["en", "es", "de", "it"]

const normalizeLng = (lng) => {
  if (!lng) return "en"
  const base = String(lng).toLowerCase().split("-")[0]
  return SUPPORTED.includes(base) ? base : "en"
}

const getInitialLanguage = () => {
  // 1) Preferencia guardada
  const saved = localStorage.getItem("i18nextLng")
  if (saved) return normalizeLng(saved)

  // 2) Idioma del navegador
  return normalizeLng(navigator.language)
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    de: { translation: de },
    it: { translation: it },
  },

  lng: getInitialLanguage(),
  fallbackLng: "en",
  supportedLngs: SUPPORTED,
  load: "languageOnly",

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
})

// ✅ Guardar idioma en localStorage SIEMPRE normalizado
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", normalizeLng(lng))
})

export default i18n
