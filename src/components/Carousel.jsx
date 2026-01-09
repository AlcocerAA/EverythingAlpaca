import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import "../styles/carousel.css"

const images = [
  "/ai-images/banner-1.jpg",
  "/ai-images/banner-2.jpg",
  "/ai-images/banner-3.jpg",
]

export default function Carousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="carousel" id="home">
      {/* IMAGEN */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="carousel-image"
          style={{ backgroundImage: `url(${images[index]})` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* OVERLAY */}
      <div className="carousel-overlay">
        <div className="carousel-content">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Premium Alpaca Lifestyle
          </motion.h1>

          <motion.p
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Luxury alpaca fashion & home décor, crafted in Peru for the world.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
