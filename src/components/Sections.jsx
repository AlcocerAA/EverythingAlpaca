import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import "../styles/sections.css"
import { useTranslation } from "react-i18next"

export default function Sections() {
  const { t } = useTranslation()

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

  // ✅ mobile detect robusto
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640)

  const visibleItems = useMemo(() => {
    if (!isMobile) return items
    return items.filter((x) => x.key === "men" || x.key === "woman" || x.key === "accessories")
  }, [items, isMobile])

  // loop con clones: [last, ...items, first]
  const slides = useMemo(() => {
    if (!visibleItems.length) return []
    return [visibleItems[visibleItems.length - 1], ...visibleItems, visibleItems[0]]
  }, [visibleItems])

  const wrapRef = useRef(null)
  const holdTimerRef = useRef(null)
  const autoTimerRef = useRef(null)

  const draggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const didDragRef = useRef(false)
  const pointerIdRef = useRef(null)

  const [cardW, setCardW] = useState(0)
  const [index, setIndex] = useState(1)
  const [animate, setAnimate] = useState(true)
  const [dragOffset, setDragOffset] = useState(0)

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

  // ✅ MEDIDA REAL (enteros) + recalcular mobile
  const measure = () => {
    const wrap = wrapRef.current
    if (!wrap) return

    const mobile = window.innerWidth <= 640
    setIsMobile(mobile)

    const pv = mobile ? 1 : 3
    const w = Math.floor(wrap.getBoundingClientRect().width)
    if (!w) return

    // ✅ clave: enteros para evitar huecos por acumulación de decimales
    const cw = Math.floor(w / pv)
    setCardW(cw)
  }

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    const tmr = setTimeout(measure, 120)
    return () => {
      clearTimeout(tmr)
      window.removeEventListener("resize", measure)
    }
  }, [])

  // ✅ cuando cambia slides, resetea index para evitar “saltos raros”
  useEffect(() => {
    setAnimate(false)
    setDragOffset(0)
    setIndex(1)
    const t = setTimeout(() => setAnimate(true), 30)
    return () => clearTimeout(t)
  }, [slides.length])

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

  // ✅ loop invisible (clones)
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

  // hold zones
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

  // ✅ límites reales (con cardW entero)
  const minX = cardW ? -((slides.length - 1) * cardW) : 0
  const maxX = 0

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

    // ✅ clamp duro SIEMPRE
    const clampedX = clamp(desiredX, minX, maxX)
    setDragOffset(clampedX - baseX)
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

  // ✅ clamp final (siempre)
  const rawX = -(index * cardW) + dragOffset
  const x = clamp(rawX, minX, maxX)

  // ✅ track width REAL (esto mata el blanco)
  const trackW = cardW ? slides.length * cardW : "auto"

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
        {/* ZONA HOLD IZQUIERDA */}
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

        {/* ZONA HOLD DERECHA */}
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
          style={{ width: trackW }} // ✅ clave
          animate={{ x }}
          transition={animate ? { type: "spring", stiffness: 140, damping: 18 } : { duration: 0 }}
        >
          {slides.map((item, i) => {
            const isActive = i === index

            return (
              <motion.a
                key={`${item.key}-${i}`}
                href={item.href || "#"}
                target="_blank"
                rel="noreferrer"
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
                <span className="section-slide-label">{t(`sections.items.${item.key}`)}</span>
                <span className="section-slide-shade" />
              </motion.a>
            )
          })}
        </motion.div>
      </div>

      {/* ✅ SOLO EN MOBILE: See more */}
      <a
        className="sections-see-more"
        href="https://shop.everything-alpaca.com/category_index.asp"
        target="_blank"
        rel="noreferrer"
      >
        SEE MORE <span className="sections-see-more-icon">∨</span>
      </a>
    </section>
  )
}
