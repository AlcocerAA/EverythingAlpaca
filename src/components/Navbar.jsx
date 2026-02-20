import { useEffect, useMemo, useRef, useState } from "react"
import "../styles/navbar.css"
import { User, Menu, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [usOpen, setUsOpen] = useState(false)

  const closeTimer = useRef(null)
  const { t } = useTranslation()

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

  const categoriesLinks = useMemo(
    () => [
      { key: "women", href: "https://shop.everything-alpaca.com/Women_c_7.html" },
      { key: "men", href: "https://shop.everything-alpaca.com/Men_c_70.html" },
      { key: "collectables", href: "https://shop.everything-alpaca.com/Collectables-and-Souvenirs_c_11.html" },
      { key: "andean", href: "https://shop.everything-alpaca.com/Andean-Fashion_c_15.html" },
      { key: "home", href: "https://shop.everything-alpaca.com/Home-Decor_c_10.html" },
      { key: "socks", href: "https://shop.everything-alpaca.com/Socks_c_56.html" },
      { key: "accessories", href: "https://shop.everything-alpaca.com/Knitted-Accessories_c_9.html" },
      { key: "Shawls", href: "https://shop.everything-alpaca.com/Woven-Scarves-and-Shawls-_c_14.html" },
    ],
    []
  )

  const usLinks = useMemo(
    () => [
      { key: "sustainability", to: "/sustainability" },
      { key: "visionMission", to: "/us" },
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
        <Link to="/" className="navbar-top" onClick={() => setMenuOpen(false)}>
          <span className="brand-text">EVERYTHING</span>
          <img src="/logo/alpaca-logo.png" className="brand-logo" alt="Everything Alpaca" />
          <span className="brand-text">ALPACA</span>
        </Link>

        <div className="navbar-bottom">
          <nav className="nav-left" onPointerEnter={clearCloseTimer}>

            {/* WHOLESALE */}
            <NavLink to="/wholesale" className="nav-link" onPointerEnter={closeAll}>
              {t("nav.wholesale", "WHOLESALE")}
            </NavLink>

            {/* SERVICES */}
            <NavLink to="/services" className="nav-link" onPointerEnter={closeAll}>
              {t("nav.services", "SERVICES")}
            </NavLink>

            {/* CATALOG */}
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
                {t("nav.categories", "CATALOG")}
              </a>

              <div className="nav-dropdown nav-dropdown--white">
                {categoriesLinks.map((l) => (
                  <a key={l.key} href={l.href} className="nav-dd-link" target="_blank" onClick={closeAll}>
                    {t(`categories.${l.key}`, l.key)}
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
                {t("nav.us", "US")}
              </a>

              <div className="nav-dropdown nav-dropdown--white">
                {usLinks.map((l) =>
                  l.to ? (
                    <Link key={l.key} to={l.to} className="nav-dd-link" onClick={closeAll}>
                      {t(`us.${l.key}`, l.key)}
                    </Link>
                  ) : (
                    <a key={l.key} href={l.href} className="nav-dd-link" onClick={closeAll}>
                      {t(`us.${l.key}`, l.key)}
                    </a>
                  )
                )}
              </div>
            </div>

          </nav>

          <button className="menu-button" onClick={() => setMenuOpen(true)}>
            <Menu size={26} />
          </button>

          <div className="nav-right">
            <a href="https://shop.everything-alpaca.com/myaccount.asp" className="nav-icon">
              <User />
            </a>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu open" onClick={(e) => e.stopPropagation()}>
            <button className="close-menu" onClick={() => setMenuOpen(false)}>
              <X />
            </button>

            <nav className="mobile-nav">

              <div className="mobile-group">
                <Link to="/wholesale" onClick={() => setMenuOpen(false)}>
                  {t("nav.wholesale", "WHOLESALE")}
                </Link>
              </div>

              <div className="mobile-group">
                <Link to="/services" onClick={() => setMenuOpen(false)}>
                  {t("nav.services", "SERVICES")}
                </Link>
              </div>

              <div className="mobile-group">
                <div className="mobile-title">{t("nav.categories", "CATALOG")}</div>
                {categoriesLinks.map((l) => (
                  <a key={l.key} href={l.href} target="_blank">
                    {t(`categories.${l.key}`, l.key)}
                  </a>
                ))}
              </div>

              <div className="mobile-group">
                <div className="mobile-title">{t("nav.us", "US")}</div>
                {usLinks.map((l) =>
                  l.to ? (
                    <Link key={l.key} to={l.to} onClick={() => setMenuOpen(false)}>
                      {t(`us.${l.key}`, l.key)}
                    </Link>
                  ) : (
                    <a key={l.key} href={l.href} onClick={() => setMenuOpen(false)}>
                      {t(`us.${l.key}`, l.key)}
                    </a>
                  )
                )}
              </div>

            </nav>
          </div>
        </div>
      )}
    </>
  )
}