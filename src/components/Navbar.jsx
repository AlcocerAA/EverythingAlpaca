import { useEffect, useState } from "react"
import "../styles/navbar.css"
import {
  User,
  Globe,
  Menu,
  X,
  ShoppingBag,
  Check,
} from "lucide-react"
import { useTranslation } from "react-i18next"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const { t, i18n } = useTranslation()
  const currentLang = i18n.language

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setLangOpen(false)
  }

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* FILA 1 */}
        <div className="navbar-top">
          <span className="brand-text">EVERYTHING</span>

          <img
            src="/logo/alpaca-logo.png"
            alt="Everything Alpaca Logo"
            className="brand-logo"
            draggable="false"
          />

          <span className="brand-text">ALPACA</span>
        </div>

        {/* FILA 2 */}
        <div className="navbar-bottom">
          {/* DESKTOP MENU */}
          <nav className="nav-left">
            <a href="https://shop.everything-alpaca.com/">
              {t("nav.shop")}
            </a>
            <a href="#">{t("nav.collections")}</a>
            <a href="#">{t("nav.sustainability")}</a>
            <a href="#">{t("nav.sale")}</a>
            <a href="#">{t("nav.faq")}</a>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>

          {/* ICONOS */}
          <div className="nav-right">
            {/* SHOP */}
            <a
              href="https://shop.everything-alpaca.com/"
              className="nav-icon shop-icon"
              aria-label="Shop"
            >
              <ShoppingBag size={22} strokeWidth={1.4} />
            </a>

            {/* LANGUAGE */}
            <div className="lang-wrapper">
              <button
                className="nav-icon"
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Change language"
              >
                <Globe strokeWidth={1.5} />
              </button>

              {langOpen && (
                <div className="lang-dropdown">
                  <button onClick={() => changeLanguage("en")}>
                    English {currentLang === "en" && <Check size={14} />}
                  </button>
                  <button onClick={() => changeLanguage("es")}>
                    Español {currentLang === "es" && <Check size={14} />}
                  </button>
                  <button onClick={() => changeLanguage("de")}>
                    Deutsch {currentLang === "de" && <Check size={14} />}
                  </button>
                  <button onClick={() => changeLanguage("it")}>
                    Italiano {currentLang === "it" && <Check size={14} />}
                  </button>
                </div>
              )}
            </div>

            <User strokeWidth={1.5} />
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div
            className="mobile-menu open"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-menu"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <nav className="mobile-nav">
              <a href="https://shop.everything-alpaca.com/">
                {t("nav.shop")}
              </a>
              <a href="#">{t("nav.collections")}</a>
              <a href="#">{t("nav.sustainability")}</a>
              <a href="#">{t("nav.sale")}</a>
              <a href="#">{t("nav.faq")}</a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
