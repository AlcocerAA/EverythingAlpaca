import { useTranslation } from "react-i18next"
import "../styles/footer.css"
import { useState } from "react"
import { Facebook, Instagram, Pin } from "lucide-react"

export default function Footer() {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return

    const subject = encodeURIComponent(t("footer.subscribe.mailSubject"))
    const body = encodeURIComponent(`${t("footer.subscribe.mailBody")}: ${email}`)
    window.location.href = `mailto:contact@everything-alpaca.com?subject=${subject}&body=${body}`

    setEmail("")
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-col brand">
          <h2>everything ALPACA</h2>
          <p>{t("footer.description")}</p>

          <div className="socials">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={20} strokeWidth={1.5} />
            </a>

            <a
              href="https://www.pinterest.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
            >
              <Pin size={20} strokeWidth={1.5} />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* SHOP */}
        <div className="footer-col">
          <h4>{t("footer.shop.title")}</h4>
          <ul>
            <li>{t("footer.shop.new")}</li>
            <li>{t("footer.shop.best")}</li>
            <li>{t("footer.shop.sale")}</li>
            <li>{t("footer.shop.offers")}</li>
          </ul>
        </div>

        {/* INFO */}
        <div className="footer-col">
          <h4>{t("footer.info.title")}</h4>
          <ul>
            <li>{t("footer.info.about")}</li>
            <li>{t("footer.info.care")}</li>
            <li>{t("footer.info.shipping")}</li>
            <li>{t("footer.info.returns")}</li>
          </ul>
        </div>

        {/* SUBSCRIBE */}
        <div className="footer-col subscribe">
          <h4>{t("footer.subscribe.title")}</h4>
          <p>{t("footer.subscribe.text")}</p>

          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={t("footer.subscribe.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              {t("footer.subscribe.button")}
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Everything Alpaca. {t("footer.rights")}
      </div>
    </footer>
  )
}
