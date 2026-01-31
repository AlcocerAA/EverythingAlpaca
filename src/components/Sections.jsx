import { useMemo } from "react"
import { motion } from "framer-motion"
import "../styles/sections.css"
import { useTranslation } from "react-i18next"

export default function Sections() {
  const { t } = useTranslation()

  // ✅ SOLO 3 OPCIONES ESTÁTICAS
  const items = useMemo(
    () => [
      { key: "woman", image: "/sections/women.jpg", href: "https://shop.everything-alpaca.com/Women_c_7.html" },
      { key: "men", image: "/sections/men.jpg", href: "https://shop.everything-alpaca.com/Men_c_70.html" },
      { key: "accessories", image: "/sections/accessories.jpg", href: "https://shop.everything-alpaca.com/Knitted-Accessories_c_9.html" },
    ],
    []
  )

  return (
    <section className="sections">
      <div className="sections-wrap">
        {items.map((item) => (
          <motion.a
            key={item.key}
            href={item.href || "#"}
            target="_blank"
            rel="noreferrer"
            className="section-slide"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          >
            <span className="section-ph" aria-hidden="true" />
            <img className="section-img show" src={item.image} alt={item.key} draggable="false" />

            <motion.span
              className="section-slide-pop"
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            />

            <span className="section-slide-label">
              {item.key === "woman"
                ? t("categories.women", "WOMEN")
                : item.key === "men"
                  ? t("categories.men", "MEN")
                  : t("categories.accessories", "ACCESSORIES")}
            </span>
            <span className="section-slide-shade" />
          </motion.a>
        ))}
      </div>

      <a
        className="sections-see-more"
        href="https://shop.everything-alpaca.com/category_index.asp"
        target="_blank"
        rel="noreferrer"
      >
        {t("sections.more", "SEE MORE")} <span className="sections-see-more-icon">∨</span>
      </a>
    </section>
  )
}
