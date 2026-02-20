import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, Recycle } from "lucide-react"
import "../styles/sustainability.css"
import { useTranslation } from "react-i18next"

const items = [
  { icon: Leaf, key: "eco" },
  { icon: Recycle, key: "zero" },
]

export default function Sustainability() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  const startXRef = useRef(0)
  const draggingRef = useRef(false)
  const offsetRef = useRef(0)

  const intervalRef = useRef(null)

  const stopAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  const startAuto = () => {
    stopAuto()
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 4500)
  }

  useEffect(() => {
    startAuto()
    return () => stopAuto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const next = () => setIndex((prev) => (prev + 1) % items.length)
  const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length)

  const onPointerDown = (e) => {
    draggingRef.current = true
    offsetRef.current = 0
    stopAuto()
    startXRef.current = e.clientX
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!draggingRef.current) return
    offsetRef.current = e.clientX - startXRef.current
  }

  const onPointerUp = (e) => {
    if (!draggingRef.current) return
    draggingRef.current = false

    e.currentTarget.releasePointerCapture?.(e.pointerId)

    const delta = offsetRef.current
    const threshold = 55

    if (delta <= -threshold) next()
    else if (delta >= threshold) prev()

    startAuto()
  }

  return (
    <section className="sustainability">
      {/* DESKTOP */}
      <div className="sustainability-grid">
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={i}
              className="sustain-card"
              whileHover={{
                y: -10,
                boxShadow: "0 28px 50px rgba(0,0,0,0.18)",
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="icon-circle">
                <Icon size={34} strokeWidth={1.4} />
              </div>
              <h3>{t(`sustainability.items.${item.key}.title`)}</h3>
              <p>{t(`sustainability.items.${item.key}.text`)}</p>
            </motion.div>
          )
        })}
      </div>

      {/* MOBILE */}
      <div
        className="sustainability-mobile"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ cursor: draggingRef.current ? "grabbing" : "grab" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="sustain-card mobile"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="icon-circle">
              {(() => {
                const Icon = items[index].icon
                return <Icon size={34} strokeWidth={1.4} />
              })()}
            </div>
            <h3>{t(`sustainability.items.${items[index].key}.title`)}</h3>
            <p>{t(`sustainability.items.${items[index].key}.text`)}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}