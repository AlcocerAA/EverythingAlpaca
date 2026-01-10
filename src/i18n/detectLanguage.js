import i18n from "i18next"

const countryToLanguage = {
  ES: "es",
  MX: "es",
  AR: "es",
  PE: "es",
  CO: "es",

  US: "en",
  CA: "en",
  GB: "en",

  DE: "de",
  AT: "de",
  CH: "de",

  IT: "it",
}

export default async function detectLanguage() {
  try {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 2000)

    const res = await fetch("https://ipapi.co/json", {
      signal: controller.signal,
    })

    const data = await res.json()
    const countryCode = data?.country_code

    const language = countryToLanguage[countryCode] || "en"

    i18n.changeLanguage(language)
    localStorage.setItem("i18nextLng", language)
  } catch (error) {
    i18n.changeLanguage("en")
    localStorage.setItem("i18nextLng", "en")
  }
}
