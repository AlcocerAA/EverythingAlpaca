import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import "../styles/sections.css"
import { useTranslation } from "react-i18next"

export default function Sections() {
  const { t } = useTranslation()

  const items = useMemo(
    () => [
      { key: "woman", image: "/sections/women.jpg" },
      { key: "men", image: "/sections/men.jpg" },
      { key: "socks", image: "/sections/socks.jpg" },
      { key: "accessories", image: "/sections/accessories.jpg" },
      { key: "home", image: "/sections/home.jpg" },
      { key: "collectables", image: "/sections/collectibles.jpg" },
      { key: "andean", image: "/sections/andean-fashion.jpg" },
    ],
    []
  )

  // loop real con clones: [last, ...items, first]
  const slides = useMemo(() => {
    if (!items.length) return []
    return [items[items.length - 1], ...items, items[0]]
  }, [items])

  const wrapRef = useRef(null)
  const holdTimerRef = useRef(null)
  const autoTimerRef = useRef(null)

  // DRAG
  const draggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const didDragRef = useRef(false) // bloquear click real
  const pointerIdRef = useRef(null)

  const [perView, setPerView] = useState(window.innerWidth <= 640 ? 1 : 3)
  const [cardW, setCardW] = useState(0)
  const [index, setIndex] = useState(1) // empieza en el primero real
  const [animate, setAnimate] = useState(true)
  const [dragOffset, setDragOffset] = useState(0)

  const measure = () => {
    const wrap = wrapRef.current
    if (!wrap) return
    const pv = window.innerWidth <= 640 ? 1 : 3
    setPerView(pv)
    setCardW(wrap.offsetWidth / pv)
  }

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const stopAuto = () => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current)
    autoTimerRef.current = null
  }

  const startAuto = () => {
    stopAuto()
    autoTimerRef.current = setInterval(() => {
      goNext()
    }, 4200)
  }

  const goNext = () => {
    setAnimate(true)
    setDragOffset(0)
    setIndex((prev) => prev + 1)
  }

  const goPrev = () => {
    setAnimate(true)
    setDragOffset(0)
    setIndex((prev) => prev - 1)
  }

  useEffect(() => {
    if (!slides.length || !cardW) return
    startAuto()
    return () => stopAuto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length, cardW])

  // Loop invisible: al llegar a clone, salta sin animación
  useEffect(() => {
    if (!slides.length) return

    if (index === slides.length - 1) {
      const tmr = setTimeout(() => {
        setAnimate(false)
        setDragOffset(0)
        setIndex(1)
      }, 520)
      return () => clearTimeout(tmr)
    }

    if (index === 0) {
      const tmr = setTimeout(() => {
        setAnimate(false)
        setDragOffset(0)
        setIndex(slides.length - 2)
      }, 520)
      return () => clearTimeout(tmr)
    }
  }, [index, slides.length, slides])

  // Mantener click (zonas invisibles)
  const startHold = (dir) => {
    stopHold()
    stopAuto()
    const fn = dir === "left" ? goPrev : goNext
    fn()
    holdTimerRef.current = setInterval(fn, 240)
  }

  const stopHold = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current)
    holdTimerRef.current = null
    startAuto()
  }

  // ========= rubber band helpers =========
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

  // resistencia “premium”
  // si te pasas del límite, solo avanza una fracción (sin mostrar blanco)
  const rubberBand = (value, min, max, factor = 0.22) => {
    if (value < min) {
      const over = min - value
      return min - over * factor
    }
    if (value > max) {
      const over = value - max
      return max + over * factor
    }
    return value
  }

  // límites reales del carrusel (con clones)
  const minX = -((slides.length - 1) * cardW)
  const maxX = 0

  // ===== POINTER EVENTS (mouse + touch sólido) =====
  const onPointerDown = (e) => {
    if (!cardW || !slides.length) return
    if (e.button !== undefined && e.button !== 0) return

    draggingRef.current = true
    didDragRef.current = false
    setAnimate(false)
    stopHold()
    stopAuto()

    pointerIdRef.current = e.pointerId
    e.currentTarget.setPointerCapture?.(e.pointerId)

    dragStartXRef.current = e.clientX
  }

  const onPointerMove = (e) => {
    if (!draggingRef.current) return
    if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current)
      return

    const delta = e.clientX - dragStartXRef.current

    if (Math.abs(delta) > 6) didDragRef.current = true

    const baseX = -(index * cardW)
    const desiredX = baseX + delta

    // ✅ rubber band (no blanco, se siente pro)
    const bandedX = rubberBand(desiredX, minX, maxX, 0.22)

    setDragOffset(bandedX - baseX)
  }

  const onPointerUp = (e) => {
    if (!draggingRef.current) return
    draggingRef.current = false

    if (pointerIdRef.current !== null) {
      e.currentTarget.releasePointerCapture?.(pointerIdRef.current)
      pointerIdRef.current = null
    }

    const threshold = cardW * 0.14
    const moved = dragOffset
    setAnimate(true)

    if (moved <= -threshold) {
      setDragOffset(0)
      setIndex((prev) => prev + 1)
    } else if (moved >= threshold) {
      setDragOffset(0)
      setIndex((prev) => prev - 1)
    } else {
      setDragOffset(0)
    }

    if (didDragRef.current) {
      setTimeout(() => {
        didDragRef.current = false
      }, 90)
    }

    startAuto()
  }

  // seguridad extra: cuando ANIMA, clamp duro para no salir de rango
  const rawX = -(index * cardW) + dragOffset
  const x = animate ? (cardW ? clamp(rawX, minX, maxX) : 0) : rawX

  return (
    <section className="sections">
      <div
        className="sections-wrap"
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ cursor: draggingRef.current ? "grabbing" : "grab" }}
      >
        {/* ZONA HOLD IZQUIERDA (invisible) */}
        <div
          className="hold-zone left"
          onPointerDown={(e) => {
            e.stopPropagation()
            startHold("left")
          }}
          onPointerUp={(e) => {
            e.stopPropagation()
            stopHold()
          }}
          onPointerLeave={(e) => {
            e.stopPropagation()
            stopHold()
          }}
          aria-hidden="true"
        />

        {/* ZONA HOLD DERECHA (invisible) */}
        <div
          className="hold-zone right"
          onPointerDown={(e) => {
            e.stopPropagation()
            startHold("right")
          }}
          onPointerUp={(e) => {
            e.stopPropagation()
            stopHold()
          }}
          onPointerLeave={(e) => {
            e.stopPropagation()
            stopHold()
          }}
          aria-hidden="true"
        />

        <motion.div
          className="sections-track"
          animate={{ x }}
          transition={
            animate
              ? { type: "spring", stiffness: 140, damping: 18 }
              : { duration: 0 }
          }
        >
          {slides.map((item, i) => {
            const isActive = i === index

            return (
              <motion.a
                key={`${item.key}-${i}`}
                href="#"
                className="section-slide"
                style={{
                  width: `${cardW}px`,
                  backgroundImage: `url(${item.image})`,
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onClick={(e) => {
                  if (didDragRef.current) {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                }}
              >
                <motion.span
                  className="section-slide-pop"
                  animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                />
                <span className="section-slide-label">
                  {t(`sections.items.${item.key}`)}
                </span>
                <span className="section-slide-shade" />
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
