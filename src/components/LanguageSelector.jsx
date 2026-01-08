import { useLanguage } from "../context/LanguageContext"

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage()

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-transparent border border-black/20 dark:border-white/20 rounded px-3 py-1 text-sm outline-none"
    >
      <option value="en">🇺🇸 EN / USD</option>
      <option value="es">🇪🇸 ES / EUR</option>
    </select>
  )
}
