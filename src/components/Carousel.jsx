import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/carousel.css"

export default function Carousel() {
  // ✅ EDITA AQUÍ tus slides (imagen + link)
  const slides = useMemo(
    () => [
      {
        id: "s1",
        image: "/hero/slide-1.jpg",
        href: "https://shop.everything-alpaca.com/Knitted-Mens-Infinity-Scarf-_p_685.html", // <-- cambia
        title: "Knitted Men's Infinity Scarf",
      },
      {
        id: "s2",
        image: "/hero/slide-2.jpg",
        href: "https://shop.everything-alpaca.com/Plaid-Scarf_p_214.html", // <-- cambia
        title: "Plaid Scarf",
      },
    ],
    []
  )

  // loop con clones: [last, ...slides, first]
  const loopSlides = useMemo(() => {
    if (!slides.length) return []
    return [slides[slides.length - 1], ...slides, slides[0]]
  }, [slides])

  const [index, setIndex] = useState(1)
  const [animate, setAnimate] = useState(true)
  const timerRef = useRef(null)

  const stopAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
  }

  const startAuto = () => {
    stopAuto()
    timerRef.current = setInterval(() => {
      setAnimate(true)
      setIndex((p) => p + 1)
    }, 5200)
  }

  useEffect(() => {
    if (!loopSlides.length) return
    startAuto()
    return () => stopAuto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopSlides.length])

  // salto invisible cuando cae en clones
  useEffect(() => {
    if (!loopSlides.length) return

    if (index === loopSlides.length - 1) {
      const t = setTimeout(() => {
        setAnimate(false)
        setIndex(1)
      }, 520)
      return () => clearTimeout(t)
    }

    if (index === 0) {
      const t = setTimeout(() => {
        setAnimate(false)
        setIndex(loopSlides.length - 2)
      }, 520)
      return () => clearTimeout(t)
    }
  }, [index, loopSlides.length, loopSlides])

  const goTo = (realIdx) => {
    // realIdx: 0..slides.length-1
    setAnimate(true)
    setIndex(realIdx + 1)
  }

  const current = loopSlides[index] || loopSlides[1]

  return (
    <section
      className="hero"
      onPointerEnter={stopAuto}
      onPointerLeave={startAuto}
    >
      <div className="hero__wrap">
        <AnimatePresence mode="wait">
          <motion.a
            key={`${current?.id}-${index}`}
            href={current?.href || "#"}
            className="hero__slide"
            style={{ backgroundImage: `url(${current?.image})` }}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          >
            {/* overlay suave (menos difuminado) */}
            <span className="hero__overlay" aria-hidden="true" />

            <div className="hero__content">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                {String(current?.title || "").split("\n").map((line, i) => (
                  <span key={i} className="hero__line">
                    {line}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
              >
                {current?.subtitle}
              </motion.p>

              <motion.span
                className="hero__cta"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
              >
                EXPLORE →
              </motion.span>
            </div>
          </motion.a>
        </AnimatePresence>

        {/* dots (real slides) */}
        <div className="hero__dots" role="tablist" aria-label="Hero slides">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`hero__dot ${index === i + 1 ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}