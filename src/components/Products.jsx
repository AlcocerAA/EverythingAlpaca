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
        images: ["/products/Blanket-blue.jpg", "/products/Blanket-orange.jpg", "/products/Blanket-red.jpg"],
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

  // ======== refs ========
  const wrapRef = useRef(null)
  const holdTimerRef = useRef(null)
  const autoTimerRef = useRef(null)

  const draggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const didDragRef = useRef(false)
  const pointerIdRef = useRef(null)

  const [perView, setPerView] = useState(3)
  const [cardW, setCardW] = useState(0)
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [dragOffset, setDragOffset] = useState(0)

  // ✅ precarga total para que NO haya delay en loop
  useEffect(() => {
    const all = []
    products.forEach((p) => (p.images || []).forEach((src) => all.push(src)))
    all.forEach((src) => {
      const img = new Image()
      img.src = encodeURI(src)
    })
  }, [products])

  const getPerView = (w) => {
    if (w >= 1180) return 4
    if (w >= 980) return 3
    if (w >= 700) return 2
    return 1
  }

  const measure = () => {
    const wrap = wrapRef.current
    if (!wrap) return

    const pv = getPerView(window.innerWidth)
    setPerView(pv)

    const w = wrap.getBoundingClientRect().width
    if (!w) return
    setCardW(w / pv)
  }

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    const tmr = setTimeout(measure, 80)
    return () => {
      clearTimeout(tmr)
      window.removeEventListener("resize", measure)
    }
  }, [])

  const items = useMemo(() => products, [products])

  // ✅ clones según perView (esto elimina el hueco mientras avanza)
  const slides = useMemo(() => {
    if (!items.length) return []
    const pv = Math.min(perView, items.length)
    const head = items.slice(0, pv)
    const tail = items.slice(-pv)
    return [...tail, ...items, ...head]
  }, [items, perView])

  // ✅ index inicial = perView (porque antes están los clones)
  useEffect(() => {
    if (!slides.length) return
    setAnimate(false)
    setDragOffset(0)
    setIndex(perView)
    const t = setTimeout(() => setAnimate(true), 30)
    return () => clearTimeout(t)
  }, [slides.length, perView])

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
  }, [slides.length, cardW, perView])

  // ✅ Loop invisible sin “retroceso” visible
  useEffect(() => {
    if (!slides.length) return
    const n = items.length

    // si pasas el final real -> vuelve al inicio real (sin animación)
    if (index >= perView + n) {
      const tmr = setTimeout(() => {
        setAnimate(false)
        setDragOffset(0)
        setIndex(perView)
      }, 520)
      return () => clearTimeout(tmr)
    }

    // si pasas al inicio por la izquierda -> vuelve al final real
    if (index < perView) {
      const tmr = setTimeout(() => {
        setAnimate(false)
        setDragOffset(0)
        setIndex(perView + n - 1)
      }, 520)
      return () => clearTimeout(tmr)
    }
  }, [index, perView, items.length, slides.length])

  // Hold zones
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

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
  const rubberBand = (value, min, max, factor = 0.22) => {
    if (value < min) return min - (min - value) * factor
    if (value > max) return max + (value - max) * factor
    return value
  }

  // ✅ bounds considerando perView (para no generar blancos)
  const minX = cardW ? -((slides.length - perView) * cardW) : 0
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

    const threshold = cardW * 0.16
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

  const rawX = -(index * cardW) + dragOffset
  const x = animate ? clamp(rawX, minX, maxX) : rawX

  return (
    <section className="products" id="products">
      <div className="products-head">
        <h2>{t("Featured Products")}</h2>
        <p>{t("A curated selection of our best pieces in alpaca fiber.")}</p>
      </div>

      <div
        className="products-wrap"
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ cursor: draggingRef.current ? "grabbing" : "grab" }}
        aria-label="Featured products carousel"
      >
        <div
          className="products-hold-zone left"
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

        <div
          className="products-hold-zone right"
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
          className="products-track"
          animate={{ x }}
          transition={animate ? { type: "spring", stiffness: 140, damping: 18 } : { duration: 0 }}
        >
          {slides.map((p, i) => (
            <div key={`${p.id}-${i}`} className="products-slide" style={{ width: `${cardW}px` }}>
              <ProductCard p={p} disableClick={didDragRef} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="products-more">
        <a className="products-more-btn" href="https://shop.everything-alpaca.com/" target="_blank" rel="noreferrer">
          {t("SEE MORE PRODUCTS")}
        </a>
      </div>
    </section>
  )
}

function ProductCard({ p, disableClick }) {
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

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

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
    <a
      className="product-card"
      href={p.href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => {
        if (disableClick?.current) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
    >
      <div className="product-media" onMouseEnter={startHover} onMouseLeave={stopHover}>
        <AnimatePresence mode="wait">
          <motion.img
            key={`${p.id}-${imgIndex}`}
            src={currentSrc}
            alt={p.title}
            className="product-img"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            draggable="false"
            loading="eager"
            decoding="async"
            onDragStart={(e) => e.preventDefault()}
          />
        </AnimatePresence>

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
