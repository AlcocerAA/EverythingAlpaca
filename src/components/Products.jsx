import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/products.css"
import { useTranslation } from "react-i18next"

export default function Products() {
  const { t } = useTranslation()

  const products = useMemo(
    () => [
      {
        id: "blanket",
        title: "Blanket",
        href: "https://shop.everything-alpaca.com/Blanket-_p_746.html",
        images: [
          "/products/Blanket-blue.jpg",
          "/products/Blanket-orange.jpg",
          "/products/Blanket-red.jpg",
        ],
      },
      {
        id: "hat",
        title: "Molinet Hat",
        href: "https://shop.everything-alpaca.com/Molinet-Hat_p_642.html",
        images: [
          "/products/MolinetHat-blue.jpg",
          "/products/MolinetHat-brown.jpg",
          "/products/MolinetHat-grey.jpg",
          "/products/MolinetHat-green.jpg",
          "/products/MolinetHat-red.jpg",
          "/products/MolinetHat-charcoal.jpg",
        ],
      },
      {
        id: "hatChunky",
        title: "Pompon Chunky Hat",
        href: "https://shop.everything-alpaca.com/Pompon-Chunky-Hat_p_633.html",
        images: [
          "/products/PomponChunkyHat-babyblue.jpg",
          "/products/PomponChunkyHat-blue.jpg",
          "/products/PomponChunkyHat-lilac.jpg",
          "/products/PomponChunkyHat-naturalwhite.jpg",
          "/products/PomponChunkyHat-purple.jpg",
          "/products/PomponChunkyHat-red.jpg",
        ],
      },
      {
        id: "reversible",
        title: "Reversible Purple",
        href: "https://shop.everything-alpaca.com/Reversible-Purple_p_771.html",
        // ✅ si solo tienes 1 real, déjalo 1. Si tienes 2, pon 2.
        images: ["/products/Reversible Purple.jpg"],
      },
      {
        id: "chocolate",
        title: "Herringbone Sofa Throw",
        href: "https://shop.everything-alpaca.com/Herringbone-Sofa-Throw-_p_584.html",
        images: ["/products/chocolatebrown.jpg"],
      },
      {
        id: "thermal",
        title: "Thermal Underwear",
        href: "https://shop.everything-alpaca.com/Thermal-Underwear_p_874.html",
        images: ["/products/Thermal Underwear.jpg"],
      },
    ],
    []
  )

  return (
    <section className="products" id="products">
      <div className="products-head">
        <h2>{t("Featured Products")}</h2>
        <p>{t("A curated selection of our best pieces in alpaca fiber.")}</p>
      </div>

      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      <div className="products-more">
        <a
          className="products-more-btn"
          href="https://shop.everything-alpaca.com/"
          target="_blank"
          rel="noreferrer"
        >
          {t("SEE MORE PRODUCTS")}
        </a>
      </div>
    </section>
  )
}

function ProductCard({ p }) {
  const [imgIndex, setImgIndex] = useState(0)
  const timerRef = useRef(null)

  const hasCarousel = Array.isArray(p.images) && p.images.length > 1

  useEffect(() => {
    if (!p.images || p.images.length === 0) return
    p.images.forEach((src) => {
      const img = new Image()
      img.src = encodeURI(src)
    })
  }, [p.images])

  const stopHover = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    setImgIndex(0)
  }

  const startHover = () => {
    if (!hasCarousel) return
    if (timerRef.current) return

    setImgIndex(1)

    timerRef.current = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % p.images.length)
    }, 900)
  }

  const currentSrc = p.images?.[imgIndex] ? encodeURI(p.images[imgIndex]) : ""

  return (
    <a className="product-card" href={p.href} target="_blank" rel="noreferrer">
      <div
        className="product-media"
        onMouseEnter={startHover}
        onMouseLeave={stopHover}
        onTouchStart={startHover}
        onTouchEnd={stopHover}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={`${p.id}-${imgIndex}`}
            src={currentSrc}
            alt={p.title}
            className="product-img"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
          />
        </AnimatePresence>

        {/* ✅ Ojito al hover */}
        <span className="product-eye" aria-hidden="true">
          👁
        </span>
      </div>

      <div className="product-meta">
        <div className="product-name">{p.title}</div>
      </div>
    </a>
  )
}
