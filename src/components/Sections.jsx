import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import "../styles/sections.css"

export default function Sections() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  const items = [
    { key: "woman", image: "/sections/women.jpg" },
    { key: "men", image: "/sections/men.jpg" },
    { key: "socks", image: "/sections/socks.jpg" },
    { key: "accessories", image: "/sections/accessories.jpg" },
    { key: "home", image: "/sections/home.jpg" },
    { key: "collectables", image: "/sections/collectibles.jpg" },
    { key: "andean", image: "/sections/andean-fashion.jpg", wide: true }
  ]

  const visibleItems = expanded ? items : items.slice(0, 4)

  return (
    <section className="sections">
      <h2 className="sections-title">
        {t("sections.title")}
      </h2>

      <div className="sections-grid">
        <AnimatePresence>
          {visibleItems.map((item) => (
            <motion.div
              key={item.key}
              className={`section-card ${item.wide ? "wide" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div
                className="section-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <span className="section-label">
                {t(`sections.items.${item.key}`)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!expanded && (
        <div className="sections-more">
          <button onClick={() => setExpanded(true)}>
            {t("sections.more")}
          </button>
        </div>
      )}
    </section>
  )
}
