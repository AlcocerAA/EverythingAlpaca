import { useTranslation } from "react-i18next"
import "../styles/footer.css"

const LOGO_SRC = "/logo.png"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* BRAND / LOGO */}
        <div className="footer-col brand">
          <a href="/" className="footer-logo" aria-label="Everything Alpaca Home">
            <img
              src={LOGO_SRC}
              alt="Everything Alpaca"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </a>

          {/* Social icons */}
          <div className="socials" aria-label="Social links">
            <a
              className="social-btn"
              href="https://www.facebook.com/everythingalpaca"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M13.5 22v-8h2.6l.4-3h-3V9.1c0-.9.2-1.5 1.5-1.5H16V5c-.5-.1-1.5-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.6V11H6v3h2.8v8h4.7z"
                />
              </svg>
            </a>

            <a
              className="social-btn"
              href="https://www.pinterest.com/everythingalpac/"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
              title="Pinterest"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 0 0-3.5 19.4c-.1-.8-.2-2 0-2.9l1.4-6s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.6-.2 1.1.6 2 1.7 2 2.1 0 3.7-2.2 3.7-5.3 0-2.8-2-4.7-4.8-4.7-3.3 0-5.2 2.5-5.2 5 0 1 .4 2.1.9 2.7.1.1.1.2.1.4l-.3 1.2c-.1.4-.3.5-.7.3-1.3-.6-2.1-2.6-2.1-4.1 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.8-2.4 6.9-5.7 6.9-1.1 0-2.1-.6-2.5-1.3l-.7 2.5c-.2.9-.8 2-1.2 2.7A10 10 0 1 0 12 2z"
                />
              </svg>
            </a>

            {/*<a
              className="social-btn"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"
                />
              </svg>
            </a>*/}
          </div>
        </div>

        {/* LINKS */}
        <div className="footer-col">
          <h4 className="footer-title">{t("footer.links.title", "LINKS")}</h4>

          <ul className="footer-list">
            <li>
              <a
                href="https://shop.everything-alpaca.com/Terms-and-Conditions_ep_2-1.html"
                target="_blank"
                rel="noreferrer"
              >
                {t("footer.links.terms", "Terms and Conditions")}
              </a>
            </li>
            <li>
              <a
                href="https://shop.everything-alpaca.com/product_index.asp"
                target="_blank"
                rel="noreferrer"
              >
                {t("footer.links.productIndex", "Product Index")}
              </a>
            </li>
            <li>
              <a
                href="https://shop.everything-alpaca.com/affiliateInfo.asp"
                target="_blank"
                rel="noreferrer"
              >
                {t("footer.links.affiliate", "Become an Affiliate")}
              </a>
            </li>
            <li>
              <a
                href="https://shop.everything-alpaca.com/category_index.asp"
                target="_blank"
                rel="noreferrer"
              >
                {t("footer.links.categoryIndex", "Category Index")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Everything Alpaca. {t("footer.rights")}
      </div>
    </footer>
  )
}