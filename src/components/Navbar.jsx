import { useEffect, useMemo, useRef, useState } from "react"
import "../styles/navbar.css"
import { User, Globe, Menu, X, ShoppingBag, Check } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const [shopOpen, setShopOpen] = useState(false)
  const [collectionsOpen, setCollectionsOpen] = useState(false)
  const [usOpen, setUsOpen] = useState(false)

  const closeTimer = useRef(null)

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

  const closeAllDropdowns = () => {
    setShopOpen(false)
    setCollectionsOpen(false)
    setUsOpen(false)
  }

  const clearCloseTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = null
  }

  const scheduleClose = (fn) => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => {
      fn(false)
    }, 140)
  }

  const shopLinks = useMemo(
    () => [
      { label: "Featured Products", href: "https://shop.everything-alpaca.com/" },
      { label: "Categories", href: "https://shop.everything-alpaca.com/category_index.asp" },
      { label: "Products", href: "https://shop.everything-alpaca.com/product_index.asp" },
    ],
    []
  )

  const collectionsLinks = useMemo(() => [{ label: "2026", href: "#" }], [])

  const usLinks = useMemo(
    () => [
      { label: "Contact Us", href: "https://shop.everything-alpaca.com/crm.asp?action=contactus" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Our Vision & Mission", href: "/us" },
    ],
    []
  )

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* FILA 1 */}
        {/* ✅ AHORA TODO EL BRAND ES CLICKEABLE Y TE LLEVA A HOME */}
        <Link to="/" className="navbar-top" aria-label="Go to Home">
          <span className="brand-text">EVERYTHING</span>

          <img
            src="/logo/alpaca-logo.png"
            alt="Everything Alpaca Logo"
            className="brand-logo"
            draggable="false"
          />

          <span className="brand-text">ALPACA</span>
        </Link>

        {/* FILA 2 */}
        <div className="navbar-bottom">
          <nav className="nav-left" onPointerEnter={clearCloseTimer}>
            {/* SHOP */}
            <div
              className={`nav-item ${shopOpen ? "open" : ""}`}
              onPointerEnter={() => {
                clearCloseTimer()
                setShopOpen(true)
                setCollectionsOpen(false)
                setUsOpen(false)
              }}
              onPointerLeave={() => scheduleClose(setShopOpen)}
            >
              <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                {t("nav.shop")}
              </a>

              <div className="nav-dropdown nav-dropdown--white">
                {shopLinks.map((l) => (
                  <a key={l.label} href={l.href} onClick={closeAllDropdowns}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* COLLECTIONS */}
            <div
              className={`nav-item ${collectionsOpen ? "open" : ""}`}
              onPointerEnter={() => {
                clearCloseTimer()
                setCollectionsOpen(true)
                setShopOpen(false)
                setUsOpen(false)
              }}
              onPointerLeave={() => scheduleClose(setCollectionsOpen)}
            >
              <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                {t("nav.collections")}
              </a>

              <div className="nav-dropdown nav-dropdown--white">
                {collectionsLinks.map((l) => (
                  <a key={l.label} href={l.href} onClick={closeAllDropdowns}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* US */}
            <div
              className={`nav-item ${usOpen ? "open" : ""}`}
              onPointerEnter={() => {
                clearCloseTimer()
                setUsOpen(true)
                setShopOpen(false)
                setCollectionsOpen(false)
              }}
              onPointerLeave={() => scheduleClose(setUsOpen)}
            >
              <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                US
              </a>

              <div className="nav-dropdown nav-dropdown--white">
                {usLinks.map((l) => (
                  <a key={l.label} href={l.href} onClick={closeAllDropdowns}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* MOBILE BUTTON */}
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={26} />
          </button>

          {/* ICONOS */}
          <div className="nav-right">
            <a
              href="https://shop.everything-alpaca.com/"
              className="nav-icon shop-icon"
              aria-label="Shop"
            >
              <ShoppingBag size={22} strokeWidth={1.4} />
            </a>

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

            {/* ✅ ICONO PERSONA ALINEADO Y LINKEADO */}
            <a
              href="https://shop.everything-alpaca.com/myaccount.asp"
              className="nav-icon"
              aria-label="Account"
            >
              <User strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu open" onClick={(e) => e.stopPropagation()}>
            <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>

            <nav className="mobile-nav">
              <div className="mobile-group">
                <div className="mobile-title">{t("nav.shop")}</div>
                {shopLinks.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>

              <div className="mobile-group">
                <div className="mobile-title">{t("nav.collections")}</div>
                {collectionsLinks.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>

              <div className="mobile-group">
                <div className="mobile-title">US</div>
                {usLinks.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}