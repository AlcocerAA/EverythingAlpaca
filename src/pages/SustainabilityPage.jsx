import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/sustainability-page.css"
import { useTranslation } from "react-i18next"

export default function SustainabilityPage() {
  const { t } = useTranslation()

  const heroSlides = useMemo(
    () => [
      {
        title: t("pages.sus.hero.title", "Sustainability"),
        subtitle: t("pages.sus.hero.subtitle", "Crafted with respect for nature, people, and alpacas."),
        cta: t("pages.sus.hero.cta", "VISIT THE SHOP"),
        href: "https://shop.everything-alpaca.com/",
        image: "/bannersustainability/hero/hero-1.jpg",
      },
    ],
    [t]
  )

  const quickLinks = useMemo(
    () => [
      { key: "vision", label: t("pages.sus.quick.vision", "Our Vision & Mission"), href: "/us" },
      {
        key: "contact",
        label: t("pages.sus.quick.contact", "Contact Us"),
        href: "https://shop.everything-alpaca.com/crm.asp?action=contactus",
      },
      { key: "shop", label: t("pages.sus.quick.shop", "Shop"), href: "https://shop.everything-alpaca.com/" },
    ],
    [t]
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
          <div className="sus-hero__bg" style={{ backgroundImage: `url(${active.image})` }} />
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
            <div className="sus-kicker">{t("pages.sus.approach.kicker", "OUR APPROACH")}</div>
            <h2 className="sus-title">{t("pages.sus.approach.title", "Sustainability at Everything Alpaca")}</h2>
            <p className="sus-text">
              {t(
                "pages.sus.approach.text",
                "We focus on natural fine fibers, responsible production, and long-term quality. Our goal is to create pieces that last — respecting people, alpacas, and the environment."
              )}
            </p>

            <div className="sus-mini-links">
              {quickLinks.map((l) => (
                <a key={l.key} className="sus-link" href={l.href}>
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
              {t("pages.sus.sideNote", "Natural fiber • Ethical production • Designed to last")}
            </div>
          </motion.aside>
        </div>

        {/* ================= COMMITMENTS ================= */}
        <div className="sus-section" id="commitments">
          <div className="sus-section__head">
            <div className="sus-kicker">{t("pages.sus.commit.kicker", "OUR COMMITMENTS")}</div>
            <h3 className="sus-h3">{t("pages.sus.commit.title", "What we stand for")}</h3>
          </div>

          <div className="sus-grid">
            {[
              {
                key: "animal",
                title: t("pages.sus.commit.items.animal.title", "Animal Welfare"),
                text: t("pages.sus.commit.items.animal.text", "Respectful care and ethical treatment of alpacas."),
              },
              {
                key: "sourcing",
                title: t("pages.sus.commit.items.sourcing.title", "Responsible Sourcing"),
                text: t("pages.sus.commit.items.sourcing.text", "Natural fibers and mindful sourcing."),
              },
              {
                key: "process",
                title: t("pages.sus.commit.items.process.title", "Low-Impact Process"),
                text: t("pages.sus.commit.items.process.text", "Efficiency to reduce waste."),
              },
              {
                key: "quality",
                title: t("pages.sus.commit.items.quality.title", "Long-Term Quality"),
                text: t("pages.sus.commit.items.quality.text", "Durability is sustainability."),
              },
            ].map((c) => (
              <div key={c.key} className="sus-mini">
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
