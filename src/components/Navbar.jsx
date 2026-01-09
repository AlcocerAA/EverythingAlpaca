import { useEffect, useState } from "react"
import "../styles/navbar.css"
import { User, Globe, Menu, X, ShoppingBag } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
            <a href="https://shop.everything-alpaca.com/">SHOP</a>
            <a href="#">COLLECTIONS</a>
            <a href="#">SUSTAINABILITY</a>
            <a href="#">SALE</a>
            <a href="#">FAQ</a>
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
            {/* SHOPPING BAG */}
            <a
              href="https://shop.everything-alpaca.com/"
              className="nav-icon shop-icon"
              aria-label="Shop"
            >
              <ShoppingBag size={22} strokeWidth={1.4} />
            </a>

            <Globe strokeWidth={1.5} />
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
              <a href="https://shop.everything-alpaca.com/">SHOP</a>
              <a href="#">COLLECTIONS</a>
              <a href="#">SUSTAINABILITY</a>
              <a href="#">SALE</a>
              <a href="#">FAQ</a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
