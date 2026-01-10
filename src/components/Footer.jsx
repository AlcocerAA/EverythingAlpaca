import "../styles/footer.css"
import { Facebook, Pinterest } from "lucide-react"

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    if (!email) return

    // Aquí luego puedes conectar a backend / API real
    console.log("Email sent:", email)
    e.target.reset()
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* BRAND */}
        <div className="footer-brand">
          <h3>
            everything <span>ALPACA</span>
          </h3>
          <p>
            Luxury Peruvian textiles crafted with care and conscience.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              <Facebook size={18} strokeWidth={1.6} />
            </a>
            <a href="#" aria-label="Pinterest">
              <Pinterest size={18} strokeWidth={1.6} />
            </a>
          </div>
        </div>

        {/* SHOP */}
        <div className="footer-column">
          <h4>Shop</h4>
          <a href="#">New Arrivals</a>
          <a href="#">Bestsellers</a>
          <a href="#">Sale</a>
          <a href="#">Offers</a>
        </div>

        {/* INFORMATION */}
        <div className="footer-column">
          <h4>Information</h4>
          <a href="#">About us</a>
          <a href="#">Care guide</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
        </div>

        {/* CONTACT */}
        <div className="footer-column footer-contact">
          <h4>Contact us or Subscribe</h4>
          <p>
            Subscribe for exclusive offers and updates
          </p>

          <form onSubmit={handleSubmit} className="footer-form">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Everything Alpaca. All rights reserved.
      </div>
    </footer>
  )
}
