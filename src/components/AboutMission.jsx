import "../styles/about-mission.css"
import { motion } from "framer-motion"

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
          <img src="/about/about-us.jpg" alt="About us" />
        </div>

        <div className="about-text">
          <h2>About us</h2>
          <p>
            Everything Alpaca was established in 1998. We design and manufacture
            textile garments focusing on natural fine fibers, mainly alpaca wool.
            Our main office and distribution center is located in The Angels,
            United States, while our production center is located in Arequipa,
            Peru. Everything Alpaca is present in the American, Canadian and South
            American markets.
          </p>
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
          <h2>Our mission</h2>
          <p>
            Our mission is to provide only finished garments of exceptional
            quality and durability over time. Therefore, it is in our best
            interest to grow hand in hand with our suppliers and artisans. In
            addition, we manufacture natural and sustainable products with the
            intention of generating the smallest possible environmental
            footprint.
          </p>
        </div>

        <div className="about-image">
          <img src="/about/our-mission.jpg" alt="Our mission" />
        </div>
      </motion.div>
    </section>
  )
}
