import "../styles/about-mission.css"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const slideLeft = {
  hidden: { opacity: 0, x: -120 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -120 }
}

const slideRight = {
  hidden: { opacity: 0, x: 120 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 120 }
}

export default function AboutMission() {
  const { t } = useTranslation()

  return (
    <section className="about-wrapper">
      {/* ABOUT US */}
      <motion.div
        className="about-block left"
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="about-image">
          <img src="/about/about-us.jpg" alt={t("about.title")} />
        </div>

        <div className="about-text">
          <h2>{t("about.title")}</h2>
          <p>{t("about.text")}</p>
        </div>
      </motion.div>

      {/* OUR MISSION */}
      <motion.div
        className="about-block right"
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="about-text">
          <h2>{t("mission.title")}</h2>
          <p>{t("mission.text")}</p>
        </div>

        <div className="about-image">
          <img src="/about/our-mission.jpg" alt={t("mission.title")} />
        </div>
      </motion.div>
    </section>
  )
}
