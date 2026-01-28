import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
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

  // ========= Image cache (anti blanco definitivo) =========
  const [imgMap, setImgMap] = useState({})
  const objectUrlsRef = useRef([])

  const allSrcs = useMemo(() => {
    const list = []
    for (const p of products) {
      for (const src of p.images || []) list.push(src)
    }
    return Array.from(new Set(list))
  }, [products])

  useEffect(() => {
    let mounted = true
    const controller = new AbortController()

    const run = async () => {
      const nextMap = {}
      try {
        await Promise.all(
          allSrcs.map(async (src) => {
            const encoded = encodeURI(src)

            // si ya lo tenemos, no recargar
            if (imgMap[encoded]) {
              nextMap[encoded] = imgMap[encoded]
              return
            }

            const res = await fetch(encoded, { signal: controller.signal, cache: "force-cache" })
            if (!res.ok) throw new Error(`Image fetch failed: ${encoded} (${res.status})`)
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            objectUrlsRef.current.push(url)
            nextMap[encoded] = url
          })
        )
      } catch (e) {
        // si alguna falla, igual seguimos con las que sí cargaron
        // y para las que no, usamos el src normal (fallback)
      }

      if (!mounted) return
      setImgMap((prev) => ({ ...prev, ...nextMap }))
    }

    run()

    return () => {
      mounted = false
      controller.abort()
      // revocar object urls
      for (const u of objectUrlsRef.current) URL.revokeObjectURL(u)
      objectUrlsRef.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSrcs])

  const getCached = (src) => {
    const encoded = encodeURI(src || "")
    return imgMap[encoded] || encoded
  }

  // ========= Carrusel =========
  const wrapRef = useRef(null)
  const autoTimerRef = useRef(null)
  const holdTimerRef = useRef(null)

  const draggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const didDragRef = useRef(false)
  const pointerIdRef = useRef(null)

  const [cardW, setCardW] = useState(0)
  const [index, setIndex] = useState(1)
  const [animate, setAnimate] = useState(true)
  const [dragOffset, setDragOffset] = useState(0)

  const slides = useMemo(() => {
    if (!products.length) return []
    return [products[products.length - 1], ...products, products[0]]
  }, [products])

  const measure = () => {
    const wrap = wrapRef.current
    if (!wrap) return
    const w = wrap.getBoundingClientRect().width
    if (!w) return

    const mobile = window.innerWidth <= 640
    const pv = mobile ? 1 : window.innerWidth <= 1024 ? 2 : 4
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

  const stopAuto = () => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current)
    autoTimerRef.current = null
  }
  const startAuto = () => {
    stopAuto()
    autoTimerRef.current = setInterval(() => {
      setAnimate(true)
      setDragOffset(0)
      setIndex((p) => p + 1)
    }, 4200)
  }

  useEffect(() => {
    if (!slides.length || !cardW) return
    startAuto()
    return () => stopAuto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length, cardW])

  const stopHold = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current)
    holdTimerRef.current = null
    startAuto()
  }

  const startHold = (dir) => {
    stopHold()
    stopAuto()
    const step = dir === "left" ? -1 : 1
    setAnimate(true)
    setDragOffset(0)
    setIndex((p) => p + step)
    holdTimerRef.current = setInterval(() => {
      setAnimate(true)
      setDragOffset(0)
      setIndex((p) => p + step)
    }, 240)
  }

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
  const rubberBand = (value, min, max, factor = 0.22) => {
    if (value < min) return min - (min - value) * factor
    if (value > max) return max + (value - max) * factor
    return value
  }

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
      setIndex((p) => p + 1)
    } else if (moved >= threshold) {
      setDragOffset(0)
      setIndex((p) => p - 1)
    } else {
      setDragOffset(0)
    }

    if (didDragRef.current) {
      setTimeout(() => (didDragRef.current = false), 90)
    }

    startAuto()
  }

  const rawX = -(index * cardW) + dragOffset
  const x = animate ? clamp(rawX, minX, maxX) : rawX

  // ✅ salto invisible exacto al final
  const onTrackTransitionEnd = () => {
    if (!slides.length) return
    if (index === slides.length - 1) {
      setAnimate(false)
      setDragOffset(0)
      setIndex(1)
      requestAnimationFrame(() => setAnimate(true))
    }
    if (index === 0) {
      setAnimate(false)
      setDragOffset(0)
      setIndex(slides.length - 2)
      requestAnimationFrame(() => setAnimate(true))
    }
  }

  return (
    <section className="products" id="products">
      <div className="products-head">
        <h2>{t("Featured Products")}</h2>
        <p>{t("A curated selection of our best pieces in alpaca fiber.")}</p>
      </div>

      <div className="products-wrap" ref={wrapRef} aria-label="Featured products carousel">
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

        <div className="products-viewport" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
          <motion.div
            className="products-track"
            animate={{ x }}
            transition={animate ? { type: "spring", stiffness: 140, damping: 18 } : { duration: 0 }}
            onTransitionEnd={onTrackTransitionEnd}
          >
            {slides.map((p, i) => (
              <div key={`${p.id}-${i}`} className="products-slide" style={{ width: `${cardW}px` }}>
                <ProductCard p={p} disableClick={didDragRef} getCached={getCached} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="products-more">
        <a className="products-more-btn" href="https://shop.everything-alpaca.com/" target="_blank" rel="noreferrer">
          {t("SEE MORE PRODUCTS")}
        </a>
      </div>
    </section>
  )
}

// ✅ Card: 2 capas (base + incoming) con fade.
// ✅ Pero ahora NO depende de la red: usa getCached()
function ProductCard({ p, disableClick, getCached }) {
  const timerRef = useRef(null)
  const hasCarousel = Array.isArray(p.images) && p.images.length > 1

  const [imgIndex, setImgIndex] = useState(0)
  const [activeSrc, setActiveSrc] = useState(() => getCached(p.images?.[0]))
  const [incomingSrc, setIncomingSrc] = useState("")
  const [incomingVisible, setIncomingVisible] = useState(false)

  useEffect(() => {
    setImgIndex(0)
    setActiveSrc(getCached(p.images?.[0]))
    setIncomingSrc("")
    setIncomingVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.id])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const swapTo = (nextIndex) => {
    const nextRaw = p.images?.[nextIndex]
    if (!nextRaw) return
    const next = getCached(nextRaw)

    if (!next || next === activeSrc) {
      setImgIndex(nextIndex)
      return
    }

    setIncomingVisible(false)
    setIncomingSrc(next)

    // como es cached (blob url), casi siempre está instant
    // igual mantenemos la lógica por seguridad
    const img = new Image()
    img.onload = () => {
      setIncomingVisible(true)
      setTimeout(() => {
        setActiveSrc(next)
        setIncomingSrc("")
        setIncomingVisible(false)
        setImgIndex(nextIndex)
      }, 180)
    }
    img.src = next
  }

  const stopHover = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    swapTo(0)
  }

  const startHover = () => {
    if (!hasCarousel) return
    if (timerRef.current) return

    swapTo(1)
    timerRef.current = setInterval(() => {
      setImgIndex((prev) => {
        const next = (prev + 1) % p.images.length
        swapTo(next)
        return prev
      })
    }, 900)
  }

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
        <img
          src={activeSrc}
          alt={p.title}
          className="product-img product-img-base"
          loading="eager"
          decoding="async"
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
        />

        {incomingSrc ? (
          <img
            src={incomingSrc}
            alt={p.title}
            className={`product-img product-img-incoming ${incomingVisible ? "is-visible" : ""}`}
            loading="eager"
            decoding="async"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
          />
        ) : null}

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
