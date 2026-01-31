import { useEffect, useMemo, useRef, useState } from "react"
import "../styles/navbar.css"
import { User, Globe, Menu, X, Check } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [usOpen, setUsOpen] = useState(false)

  const closeTimer = useRef(null)
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const clearCloseTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const scheduleClose = (fn) => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => fn(false), 140)
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setLangOpen(false)
  }

  const categoriesLinks = useMemo(
    () => [
      { label: "Women", href: "https://shop.everything-alpaca.com/Womens-s/1814.htm" },
      { label: "Men", href: "https://shop.everything-alpaca.com/Mens-s/1815.htm" },
      { label: "Collectables", href: "https://shop.everything-alpaca.com/Collectibles-s/1899.htm" },
      { label: "Andean Fashion", href: "https://shop.everything-alpaca.com/Andean-Fashion-s/1900.htm" },
      { label: "Home", href: "https://shop.everything-alpaca.com/Home-s/1817.htm" },
      { label: "Socks", href: "https://shop.everything-alpaca.com/Socks-s/1816.htm" },
      { label: "Accessories", href: "https://shop.everything-alpaca.com/Accessories-s/1818.htm" },
    ],
    []
  )

  const usLinks = useMemo(
    () => [
      { label: "Contact Us", href: "https://shop.everything-alpaca.com/crm.asp?action=contactus" },
      { label: "Sustainability", to: "/sustainability" },
      { label: "Our Vision & Mission", to: "/us" },
    ],
    []
  )

  const closeAll = () => {
    setCategoriesOpen(false)
    setUsOpen(false)
  }

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* LOGO */}
        <Link to="/" className="navbar-top" onClick={() => setMenuOpen(false)}>
          <span className="brand-text">EVERYTHING</span>
          <img src="/logo/alpaca-logo.png" className="brand-logo" alt="Everything Alpaca" />
          <span className="brand-text">ALPACA</span>
        </Link>

        {/* NAV */}
        <div className="navbar-bottom">
          <nav className="nav-left" onPointerEnter={clearCloseTimer}>
            {/* CATEGORIES */}
            <div
              className={`nav-item ${categoriesOpen ? "open" : ""}`}
              onPointerEnter={() => {
                clearCloseTimer()
                setCategoriesOpen(true)
                setUsOpen(false)
              }}
              onPointerLeave={() => scheduleClose(setCategoriesOpen)}
            >
              <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                CATEGORIES
              </a>

              <div className="nav-dropdown nav-dropdown--white">
                {categoriesLinks.map((l) => (
                  <a key={l.label} href={l.href} className="nav-dd-link" target="_blank" onClick={closeAll}>
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
                setCategoriesOpen(false)
              }}
              onPointerLeave={() => scheduleClose(setUsOpen)}
            >
              <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                US
              </a>

              <div className="nav-dropdown nav-dropdown--white">
                {usLinks.map((l) =>
                  l.to ? (
                    <Link key={l.label} to={l.to} className="nav-dd-link" onClick={closeAll}>
                      {l.label}
                    </Link>
                  ) : (
                    <a key={l.label} href={l.href} className="nav-dd-link" onClick={closeAll}>
                      {l.label}
                    </a>
                  )
                )}
              </div>
            </div>

            <NavLink to="/services" className="nav-link">SERVICES</NavLink>
            <NavLink to="/wholesale" className="nav-link">WHOLESALE</NavLink>
          </nav>

          {/* MOBILE BTN */}
          <button className="menu-button" onClick={() => setMenuOpen(true)}>
            <Menu size={26} />
          </button>

          {/* RIGHT */}
          <div className="nav-right">
            <div className="lang-wrapper">
              <button className="nav-icon" onClick={() => setLangOpen(!langOpen)}>
                <Globe />
              </button>

              {langOpen && (
                <div className="lang-dropdown">
                  {["en", "es", "de", "it"].map((lng) => (
                    <button key={lng} onClick={() => changeLanguage(lng)}>
                      {lng.toUpperCase()} {currentLang === lng && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="https://shop.everything-alpaca.com/myaccount.asp" className="nav-icon">
              <User />
            </a>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu open" onClick={(e) => e.stopPropagation()}>
            <button className="close-menu" onClick={() => setMenuOpen(false)}>
              <X />
            </button>

            <nav className="mobile-nav">
              <div className="mobile-group">
                <div className="mobile-title">Categories</div>
                {categoriesLinks.map((l) => (
                  <a key={l.label} href={l.href} target="_blank">{l.label}</a>
                ))}
              </div>

              <div className="mobile-group">
                <div className="mobile-title">US</div>
                {usLinks.map((l) =>
                  l.to ? <Link key={l.label} to={l.to}>{l.label}</Link> : <a key={l.label} href={l.href}>{l.label}</a>
                )}
              </div>

              <div className="mobile-group">
                <Link to="/services">Services</Link>
                <Link to="/wholesale">Wholesale</Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
