import { motion } from "framer-motion"
import "../styles/sustainability-page.css"

export default function SustainabilityPage() {
  return (
    <main className="sus-page" id="sustainability">
      {/* HERO */}
      <section className="sus-hero">
        <div className="sus-hero__bg" aria-hidden="true" />
        <div className="sus-hero__content">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            Sustainability
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          >
            Responsible alpaca craftsmanship — natural fibers, ethical sourcing, and
            long-term care for people and planet.
          </motion.p>

          <motion.a
            className="sus-hero__cta"
            href="https://everything-alpaca.com/contact-us/"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
          >
            CONTACT US
          </motion.a>
        </div>
      </section>

      {/* CONTENT */}
      <section className="sus-wrap">
        {/* INTRO */}
        <motion.section
          className="sus-intro"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2>Our Commitment</h2>
          <p>
            Everything Alpaca designs and manufactures fine alpaca textiles with a
            focus on quality, traceability and respectful production. From fiber
            selection to finishing, we aim to keep our impact low while keeping our
            standards high.
          </p>
        </motion.section>

        {/* SECTIONS (sin Apparel) */}
        <div className="sus-blocks">
          <SusBlock
            flip={false}
            kicker="TEXTILE & YARN LINE"
            title="Natural fibers, thoughtfully developed"
            text={
              "We work with premium alpaca fibers and blends to create refined yarns and textiles. Our approach prioritizes durability, comfort and long-term value — with careful sourcing and efficient production."
            }
            imgClass="sus-img s1"
          />

          <SusBlock
            flip={true}
            kicker="THE FIBER"
            title="Alpaca: a naturally sustainable luxury"
            text={
              "Alpaca fiber is biodegradable and naturally versatile. It comes in a wide range of colors, offers excellent warmth with lightness, and is prized for softness and resilience — ideal for long-lasting pieces."
            }
            imgClass="sus-img s2"
          />

          <SusBlock
            flip={false}
            kicker="ANIMAL WELFARE"
            title="Respectful care throughout the supply chain"
            text={
              "We support ethical handling and responsible practices. Our partners follow standards that protect the well-being of alpacas and promote respectful treatment from shearing to processing."
            }
            imgClass="sus-img s3"
          />

          <SusBlock
            flip={true}
            kicker="RESPONSIBLE PRODUCTION"
            title="Better processes, less waste"
            text={
              "We aim to reduce waste through smart planning, efficient cutting and careful material use. Our goal is consistent: elevate quality while minimizing unnecessary impact."
            }
            imgClass="sus-img s4"
          />
        </div>

        {/* CONTACT (igual idea que la antigua) */}
        <motion.section
          className="sus-contact"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="sus-contact__kicker">CONTACT US</div>

          <div className="sus-contact__grid">
            <div className="sus-contact__block">
              <div className="sus-contact__label">Wholesale (USA)</div>
              <a className="sus-contact__link" href="mailto:wholesale@everything-alpaca.com">
                wholesale@everything-alpaca.com
              </a>
            </div>

            <div className="sus-contact__block">
              <div className="sus-contact__label">Other Countries</div>
              <a className="sus-contact__link" href="mailto:info@everything-alpaca.com">
                info@everything-alpaca.com
              </a>
            </div>

            <div className="sus-contact__block">
              <div className="sus-contact__label">Hours</div>
              <div className="sus-contact__text">9.00 to 6.00 WEST.</div>
            </div>

            <div className="sus-contact__block">
              <div className="sus-contact__label">Address</div>
              <div className="sus-contact__text">
                Ayacucho Street 204, Cercado, Arequipa – Perú
              </div>
            </div>
          </div>

          <a className="sus-contact__btn" href="https://everything-alpaca.com/contact-us/">
            CONTACT FORM
          </a>
        </motion.section>
      </section>
    </main>
  )
}

function SusBlock({ flip, kicker, title, text, imgClass }) {
  return (
    <motion.section
      className={`sus-block ${flip ? "flip" : ""}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="sus-block__text">
        <div className="sus-kicker">{kicker}</div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <div className={imgClass} aria-hidden="true" />
    </motion.section>
  )
}
