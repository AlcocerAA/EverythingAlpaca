import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("lang", lang)
    setOpen(false)
  }

  return (
    <div className="lang-switcher">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change language"
      >
        🌍
      </button>

      {open && (
        <div className="lang-dropdown">
          <button onClick={() => changeLanguage("en")}>
            English
          </button>
          <button onClick={() => changeLanguage("es")}>
            Español
          </button>
        </div>
      )}
    </div>
  )
}
