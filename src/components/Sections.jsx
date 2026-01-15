import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import "../styles/sections.css"
import { useTranslation } from "react-i18next"

export default function Sections() {
  const { t } = useTranslation()

  // ✅ AQUÍ linkeas cada categoría
  const items = useMemo(
    () => [
      { key: "woman", image: "/sections/women.jpg", href: "https://shop.everything-alpaca.com/Women_c_7.html" },
      { key: "men", image: "/sections/men.jpg", href: "https://shop.everything-alpaca.com/Men_c_70.html" },
      { key: "socks", image: "/sections/socks.jpg", href: "https://shop.everything-alpaca.com/Socks_c_56.html" },
      { key: "accessories", image: "/sections/accessories.jpg", href: "https://shop.everything-alpaca.com/Knitted-Accessories_c_9.html" },
      { key: "home", image: "/sections/home.jpg", href: "https://shop.everything-alpaca.com/Home-Decor_c_10.html" },
      { key: "collectables", image: "/sections/collectibles.jpg", href: "https://shop.everything-alpaca.com/Collectables-and-Souvenirs_c_11.html" },
      { key: "andean", image: "/sections/andean-fashion.jpg", href: "https://shop.everything-alpaca.com/Andean-Fashion_c_15.html" },
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

  // drag
  const draggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const didDragRef = useRef(false)
  const pointerIdRef = useRef(null)

  const [cardW, setCardW] = useState(0)
  const [index, setIndex] = useState(1)
  const [animate, setAnimate] = useState(true)
  const [dragOffset, setDragOffset] = useState(0)

  // ✅ medir bien SIEMPRE (y no explota si width=0)
  const measure = () => {
    const wrap = wrapRef.current
    if (!wrap) return

    const pv = window.innerWidth <= 640 ? 1 : 3
    const w = wrap.getBoundingClientRect().width

    if (!w) return
    setCardW(w / pv)
  }

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)

    // ✅ por si carga fonts/imágenes y cambia el layout
    const tmr = setTimeout(measure, 80)

    return () => {
      clearTimeout(tmr)
      window.removeEventListener("resize", measure)
    }
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

  // ✅ Loop invisible: al llegar a clone, salta sin animación
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

  // ======== helpers (evitar blanco) ========
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

  const rubberBand = (value, min, max, factor = 0.22) => {
    if (value < min) return min - (min - value) * factor
    if (value > max) return max + (value - max) * factor
    return value
  }

  const minX = cardW ? -((slides.length - 1) * cardW) : 0
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
    if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return

    const delta = e.clientX - dragStartXRef.current
    if (Math.abs(delta) > 6) didDragRef.current = true

    const baseX = -(index * cardW)
    const desiredX = baseX + delta
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

  // ✅ clamp duro al animar para que jamás muestre “blanco”
  const rawX = -(index * cardW) + dragOffset
  const x = animate ? clamp(rawX, minX, maxX) : rawX

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
                href={item.href || "#"}   // ✅ AQUÍ LINK REAL
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
                  // ✅ si venimos de drag, NO navegar
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
