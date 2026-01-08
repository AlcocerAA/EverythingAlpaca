import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import "../styles/navbar.css"

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="navbar"
    >
      <div className="nav-container">
        <span className="logo">Everything ALPACA</span>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
          <a
            href="https://shop.everything-alpaca.com/"
            className="shop-btn"
          >
            Shop
          </a>

          <button
            className="theme-toggle"
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
