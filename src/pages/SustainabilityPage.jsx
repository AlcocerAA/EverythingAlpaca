import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/sustainability-page.css"

export default function SustainabilityPage() {
  const heroSlides = useMemo(
    () => [
      {
        title: "Sustainability",
        subtitle: "Crafted with respect for nature, people, and alpacas.",
        cta: "VISIT THE SHOP",
        href: "https://shop.everything-alpaca.com/",
        image: "/sustainability/hero/hero-1.jpg",
      },
    ],
    []
  )

  const quickLinks = useMemo(
    () => [
      { label: "Our Vision & Mission", href: "/us" },
      { label: "Contact Us", href: "https://shop.everything-alpaca.com/crm.asp?action=contactus" },
      { label: "Shop", href: "https://shop.everything-alpaca.com/" },
    ],
    []
  )

  /* ================= SIDE CAROUSEL ================= */
  const sideImages = [
    "/sustainability/side/side-1.jpg",
    "/sustainability/side/side-2.jpg",
    "/sustainability/side/side-3.jpg",
  ]

  const [sideIndex, setSideIndex] = useState(0)
  const sideTimer = useRef(null)

  useEffect(() => {
    sideTimer.current = setInterval(() => {
      setSideIndex((prev) => (prev + 1) % sideImages.length)
    }, 4200)

    return () => clearInterval(sideTimer.current)
  }, [])

  const active = heroSlides[0]

  return (
    <main className="sus-page">
      {/* ================= HERO ================= */}
      <section className="sus-hero">
        <div className="sus-hero__media">
          <div
            className="sus-hero__bg"
            style={{ backgroundImage: `url(${active.image})` }}
          />
          <div className="sus-hero__overlay" />
        </div>

        <div className="sus-hero__content">
          <h1>{active.title}</h1>
          <p>{active.subtitle}</p>
          <a className="sus-hero__cta" href={active.href}>
            {active.cta} →
          </a>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="sus-wrap">
        <div className="sus-top">
          {/* LEFT */}
          <motion.section className="sus-card">
            <div className="sus-kicker">OUR APPROACH</div>
            <h2 className="sus-title">Sustainability at Everything Alpaca</h2>
            <p className="sus-text">
              We focus on natural fine fibers, responsible production, and long-term quality.
              Our goal is to create pieces that last — respecting people, alpacas, and the environment.
            </p>

            <div className="sus-mini-links">
              {quickLinks.map((l) => (
                <a key={l.label} className="sus-link" href={l.href}>
                  {l.label} →
                </a>
              ))}
            </div>
          </motion.section>

          {/* RIGHT – IMAGE CAROUSEL (NO CLICK) */}
          <motion.aside className="sus-side">
            <div className="sus-side-carousel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sideImages[sideIndex]}
                  className="sus-side-slide"
                  style={{ backgroundImage: `url(${sideImages[sideIndex]})` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </AnimatePresence>
            </div>

            <div className="sus-side__note">
              Natural fiber • Ethical production • Designed to last
            </div>
          </motion.aside>
        </div>

        {/* ================= COMMITMENTS ================= */}
        <div className="sus-section" id="commitments">
          <div className="sus-section__head">
            <div className="sus-kicker">OUR COMMITMENTS</div>
            <h3 className="sus-h3">What we stand for</h3>
          </div>

          <div className="sus-grid">
            {[
              { title: "Animal Welfare", text: "Respectful care and ethical treatment of alpacas." },
              { title: "Responsible Sourcing", text: "Natural fibers and mindful sourcing." },
              { title: "Low-Impact Process", text: "Efficiency to reduce waste." },
              { title: "Long-Term Quality", text: "Durability is sustainability." },
            ].map((c) => (
              <div key={c.title} className="sus-mini">
                <div className="sus-mini__title">{c.title}</div>
                <div className="sus-mini__text">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
