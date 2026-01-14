import "../styles/our-fibers.css"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const fibers = [
  { key: "alpaca", tag: "ALPACA", descKey: "fibers.items.alpaca" },
  { key: "baby", tag: "BABY ALPACA", descKey: "fibers.items.baby" },
  { key: "merino", tag: "MERINO", descKey: "fibers.items.merino" },
  { key: "pima", tag: "PIMA COTTON", descKey: "fibers.items.pima" },
]

export default function OurFibers() {
  const { t } = useTranslation()

  return (
    <section className="fibers" id="fibers">
      <div className="fibers__header">
        <h2>{t("fibers.title")}</h2>
        <p>{t("fibers.subtitle")}</p>
      </div>

      <div className="fibers__grid">
        {fibers.map((f, idx) => (
          <motion.div
            key={f.key}
            className="fiber-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.55, delay: idx * 0.05 }}
            whileHover={{ y: -6 }}
          >
            <div className="fiber-card__top">
              <span className="fiber-card__tag">{f.tag}</span>
            </div>
            <p className="fiber-card__text">{t(f.descKey)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
