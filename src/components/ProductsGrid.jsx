import "../styles/products-grid.css"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const products = [
  { id: 1, key: "p1", name: "Classic Alpaca Scarf", price: "$120", image: "/products/p1.jpg" },
  { id: 2, key: "p2", name: "Premium Sweater", price: "$220", image: "/products/p2.jpg" },
  { id: 3, key: "p3", name: "Elegant Poncho", price: "$260", image: "/products/p3.jpg" },
  { id: 4, key: "p4", name: "Soft Gloves", price: "$65", image: "/products/p4.jpg" },
  { id: 5, key: "p5", name: "Luxury Socks", price: "$35", image: "/products/p5.jpg" },
  { id: 6, key: "p6", name: "Andean Hat", price: "$75", image: "/products/p6.jpg" },
  { id: 7, key: "p7", name: "Home Blanket", price: "$310", image: "/products/p7.jpg" },
  { id: 8, key: "p8", name: "Minimal Cardigan", price: "$240", image: "/products/p8.jpg" },
  { id: 9, key: "p9", name: "Baby Alpaca Shawl", price: "$180", image: "/products/p9.jpg" },
]

export default function ProductsGrid() {
  const { t } = useTranslation()

  return (
    <section className="products-grid" id="products">
      <div className="products-grid__header">
        <h2>{t("products.title")}</h2>
        <p>{t("products.subtitle")}</p>
      </div>

      <div className="products-grid__wrap">
        {products.map((p, idx) => (
          <motion.a
            key={p.id}
            href="https://shop.everything-alpaca.com/"
            target="_blank"
            rel="noreferrer"
            className="product-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.03 }}
            whileHover={{ y: -6 }}
          >
            <div
              className="product-card__img"
              style={{ backgroundImage: `url(${p.image})` }}
            />
            <div className="product-card__info">
              <h3>{p.name}</h3>
              <span>{p.price}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
