import "../styles/featured-carousel.css"
import { motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

export default function FeaturedCarousel() {
  const { t } = useTranslation()

  const items = useMemo(
    () => [
      { id: 1, title: "Baby Alpaca Scarf", image: "/featured/f1.jpg" },
      { id: 2, title: "Luxury Blanket", image: "/featured/f2.jpg" },
      { id: 3, title: "Minimal Cardigan", image: "/featured/f3.jpg" },
      { id: 4, title: "Premium Poncho", image: "/featured/f4.jpg" },
      { id: 5, title: "Soft Gloves", image: "/featured/f5.jpg" },
    ],
    []
  )

  const wrapRef = useRef(null)
  const [perView, setPerView] = useState(window.innerWidth <= 640 ? 1 : 3)
  const [cardW, setCardW] = useState(0)
  const [index, setIndex] = useState(0)

  const measure = () => {
    const w = wrapRef.current?.offsetWidth || 0
    const pv = window.innerWidth <= 640 ? 1 : 3
    setPerView(pv)
    setCardW(w / pv)
  }

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 4200)
    return () => clearInterval(timer)
  }, [items.length])

  const x = -(index * cardW)

  return (
    <section className="featured">
      <div className="featured__header">
        <h2>{t("featured.title")}</h2>
        <p>{t("featured.subtitle")}</p>
      </div>

      <div className="featured__wrap" ref={wrapRef}>
        <motion.div
          className="featured__track"
          animate={{ x }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          {items.map((it) => (
            <a
              key={it.id}
              className="featured__card"
              href="https://shop.everything-alpaca.com/"
              target="_blank"
              rel="noreferrer"
              style={{ width: `${cardW}px` }}
            >
              <div
                className="featured__img"
                style={{ backgroundImage: `url(${it.image})` }}
              />
              <div className="featured__shade" />
              <span className="featured__label">{it.title}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
