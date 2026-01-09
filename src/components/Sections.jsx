import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/sections.css"

const items = [
  { title: "WOMAN", image: "/sections/women.jpg" },
  { title: "MEN", image: "/sections/men.jpg" },
  { title: "SOCKS", image: "/sections/socks.jpg" },
  { title: "ACCESSORIES", image: "/sections/accessories.jpg" },
  { title: "HOME", image: "/sections/home.jpg" },
  { title: "COLLECTABLES", image: "/sections/collectibles.jpg" },
  { title: "ANDEAN FASHION", image: "/sections/andean-fashion.jpg", wide: true },
]

export default function Sections() {
  const [expanded, setExpanded] = useState(false)

  const visibleItems = expanded ? items : items.slice(0, 4)

  return (
    <section className="sections">
      <h2 className="sections-title">OUR COMMITMENT BEYOND SOFTNESS</h2>

      <div className="sections-grid">
        <AnimatePresence>
          {visibleItems.map((item, i) => (
            <motion.div
              key={item.title}
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
              <span className="section-label">{item.title}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!expanded && (
        <div className="sections-more">
          <button onClick={() => setExpanded(true)}>SEE MORE</button>
        </div>
      )}
    </section>
  )
}
