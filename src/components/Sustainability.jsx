import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, Handshake, Recycle, Heart } from "lucide-react"
import "../styles/sustainability.css"

const items = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    text:
      "Alpaca fiber is one of the most sustainable natural fibers, biodegradable and requiring minimal environmental impact.",
  },
  {
    icon: Handshake,
    title: "Fair Trade",
    text:
      "We work closely with artisans and suppliers, ensuring ethical and fair trade practices at every stage.",
  },
  {
    icon: Recycle,
    title:
      "Zero Waste",
    text:
      "Our production minimizes waste through responsible sourcing and efficient manufacturing processes.",
  },
  {
    icon: Heart,
    title: "Animal Welfare",
    text:
      "We are committed to ethical treatment and respectful care of alpacas throughout the supply chain.",
  },
]

export default function Sustainability() {
  const [index, setIndex] = useState(0)

  // ✅ drag helpers
  const startXRef = useRef(0)
  const draggingRef = useRef(false)
  const offsetRef = useRef(0)

  // ✅ auto
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

  // ✅ swipe/drag en mobile (sin flechas)
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
    const threshold = 55 // ✅ sensibilidad swipe

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
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          )
        })}
      </div>

      {/* MOBILE (sin flechas, swipe/drag) */}
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
            <h3>{items[index].title}</h3>
            <p>{items[index].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
