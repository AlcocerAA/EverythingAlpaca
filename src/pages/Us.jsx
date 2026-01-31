import { motion } from "framer-motion"
import "../styles/us.css"
import { useTranslation } from "react-i18next"

export default function Us() {
  const { t } = useTranslation()

  return (
    <main className="us-page" id="us">
      {/* HERO */}
      <section className="us-hero">
        {/* ✅ Imagen:
            /public/us/hero.jpg
        */}
        <div className="us-hero__bg" aria-hidden="true" />

        <div className="us-hero__content">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {t("pages.us.hero.title", "Our Vision & Mission")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          >
            {t(
              "pages.us.hero.subtitle",
              "Timeless alpaca pieces crafted in Peru — designed to last, made with care."
            )}
          </motion.p>

          <motion.a
            className="us-hero__cta"
            href="https://shop.everything-alpaca.com/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
          >
            {t("pages.us.hero.cta", "VISIT THE SHOP")}
          </motion.a>
        </div>
      </section>

      {/* CONTENT */}
      <section className="us-wrap">
        <div className="us-grid">
          <motion.section
            className="us-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="us-card__kicker">{t("pages.us.about.kicker", "ABOUT US")}</div>
            <h2 className="us-card__title">{t("pages.us.about.title", "Everything Alpaca")}</h2>

            <p className="us-card__text">
              {t(
                "pages.us.about.p1",
                "Everything Alpaca was established in 1998. We design and manufacture textile garments focusing on natural fine fibers, mainly alpaca wool. Our main office and distribution center is located in Los Angeles, United States, while our production center is located in Arequipa, Peru."
              )}
            </p>

            <p className="us-card__text">
              {t(
                "pages.us.about.p2",
                "Everything Alpaca is present in the American, Canadian and South American markets."
              )}
            </p>
          </motion.section>

          <motion.aside
            className="us-side"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
          >
            {/* ✅ Imagen:
                /public/us/about.jpg
            */}
            <div className="us-side__img" aria-hidden="true" />
            <div className="us-side__note">
              {t("pages.us.about.note", "Designed in the U.S. • Crafted in Arequipa, Peru")}
            </div>
          </motion.aside>
        </div>

        <div className="us-two">
          <motion.section
            className="us-panel"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="us-panel__kicker">{t("pages.us.mission.kicker", "OUR MISSION")}</div>
            <p className="us-panel__text">
              {t(
                "pages.us.mission.p1",
                "Our mission is to provide finished garments of exceptional quality and durability. We grow hand in hand with our suppliers and artisans, manufacturing natural and sustainable products with the smallest possible environmental footprint."
              )}
            </p>
            <p className="us-panel__text">
              {t(
                "pages.us.mission.p2",
                "We have 4 production lines: Garments, Accessories, Home Decor and Andean Fashion."
              )}
            </p>
          </motion.section>

          <motion.section
            className="us-panel"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
          >
            <div className="us-panel__kicker">{t("pages.us.vision.kicker", "OUR VISION")}</div>
            <p className="us-panel__text">
              {t(
                "pages.us.vision.p1",
                "To be a trusted alpaca brand worldwide — recognized for refined design, responsible production, and a long-term commitment to the people behind every piece."
              )}
            </p>

            <div className="us-quote">
              {t(
                "pages.us.vision.quote",
                "“OUR COMMITMENT IS AIMED AT EXCELLENT CUSTOMER SERVICE AND YOUR COMPLETE SATISFACTION.”"
              )}
            </div>
          </motion.section>
        </div>

        <motion.section
          className="us-contact"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="us-contact__kicker">{t("pages.us.contact.kicker", "CONTACT US")}</div>

          <div className="us-contact__grid">
            <div className="us-contact__block">
              <div className="us-contact__label">{t("pages.us.contact.wholesaleLabel", "Wholesale (USA)")}</div>
              <a className="us-contact__link" href="mailto:wholesale@everything-alpaca.com">
                wholesale@everything-alpaca.com
              </a>
            </div>

            <div className="us-contact__block">
              <div className="us-contact__label">{t("pages.us.contact.otherLabel", "Other Countries")}</div>
              <a className="us-contact__link" href="mailto:info@everything-alpaca.com">
                info@everything-alpaca.com
              </a>
            </div>

            <div className="us-contact__block">
              <div className="us-contact__label">{t("pages.us.contact.hoursLabel", "Hours")}</div>
              <div className="us-contact__text">{t("pages.us.contact.hoursText", "9.00 to 6.00 WEST.")}</div>
            </div>

            <div className="us-contact__block">
              <div className="us-contact__label">{t("pages.us.contact.addressLabel", "Address")}</div>
              <div className="us-contact__text">
                {t("pages.us.contact.addressText", "Ayacucho Street 204, Cercado, Arequipa – Perú")}
              </div>
            </div>
          </div>

          {/* ✅ BOTÓN ELIMINADO como pediste */}
        </motion.section>
      </section>
    </main>
  )
}
