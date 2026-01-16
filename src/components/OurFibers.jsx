import "../styles/our-fibers.css"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

// ✅ dejamos SOLO 2 fibras como pediste (alpacať + baby alpaca)
const fibers = [
  { key: "alpaca", tag: "ALPACA", descKey: "fibers.items.alpaca" },
  { key: "baby", tag: "BABY ALPACA", descKey: "fibers.items.baby" },
]

export default function OurFibers() {
  const { t } = useTranslation()

  // ✅ aquí van las imágenes del carrusel (ponlas en /public/fibers/)
  const images = useMemo(
    () => [
      "/fibers/fiber-2.jpg",
      "/fibers/fiber-3.jpg",
    ],
    []
  )

  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  const stopAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
  }

  const startAuto = () => {
    stopAuto()
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 3200)
  }

  useEffect(() => {
    if (!images.length) return

    // ✅ preload para evitar parpadeos
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    startAuto()
    return () => stopAuto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length])

  return (
    <section className="fibers" id="fibers">
      <div className="fibers__header">
        <h2>{t("fibers.title")}</h2>
        <p>{t("fibers.subtitle")}</p>
      </div>

      {/* ✅ NUEVO layout: izquierda (cards) / derecha (carrusel) */}
      <div className="fibers__layout">
        {/* LEFT: cards verticales */}
        <div className="fibers__left">
          {fibers.map((f, idx) => (
            <motion.div
              key={f.key}
              className="fiber-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
            >
              <div className="fiber-card__top">
                <span className="fiber-card__tag">{f.tag}</span>
              </div>
              <p className="fiber-card__text">{t(f.descKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* RIGHT: carrusel de imágenes */}
        <div
          className="fibers__right"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          <div className="fiber-carousel">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[index]}
                src={images[index]}
                alt={`fiber-${index + 1}`}
                className="fiber-carousel__img"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
            </AnimatePresence>

            {/* dots */}
            <div className="fiber-carousel__dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`fiber-dot ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
