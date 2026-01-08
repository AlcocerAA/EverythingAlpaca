import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Button from "./Button"
import "../styles/carousel.css"

const images = [
  "/ai-images/alpaca-1.jpg",
  "/ai-images/alpaca-2.jpg",
  "/ai-images/andes-1.jpg",
]

export default function Carousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="carousel" id="home">
      {/* IMÁGENES */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt="Everything Alpaca Hero"
          className="carousel-image"
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
            key={`title-${index}`}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Premium Alpaca Lifestyle
          </motion.h1>

          <motion.p
            key={`text-${index}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Luxury alpaca fashion & home décor, crafted in Peru for the world.
          </motion.p>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              onClick={() =>
                (window.location.href =
                  "https://shop.everything-alpaca.com/")
              }
            >
              SHOP NOW
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
