import "../styles/wholesale.css"
import { useTranslation } from "react-i18next"

export default function Wholesale() {
  const { t } = useTranslation()

  return (
    <section className="wholesale-hero">
      {/* VIDEO FONDO (loop) */}
      <video
        className="wholesale-bgvid"
        src="/wholesale-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="wholesale-overlay" />

      <div className="wholesale-content">
        <h1 className="wholesale-title">{t("pages.wholesale.heroTitle", "WHOLESALE")}</h1>

        <p className="wholesale-subtitle">
          {t(
            "pages.wholesale.heroSubtitle",
            "Wholesale options for retailers and distributors. Build your assortment with premium alpaca pieces and consistent stock planning."
          )}
        </p>

        <div className="wholesale-card">
          <div className="wholesale-grid">
            <div className="wholesale-box">
              <h3>{t("pages.wholesale.items.retail.title", "Retail Programs")}</h3>
              <p>
                {t(
                  "pages.wholesale.items.retail.text",
                  "Assortment recommendations based on season, location and target customers."
                )}
              </p>
            </div>

            <div className="wholesale-box">
              <h3>{t("pages.wholesale.items.volume.title", "Volume Pricing")}</h3>
              <p>
                {t(
                  "pages.wholesale.items.volume.text",
                  "Competitive wholesale rates for bulk purchases and long-term partnerships."
                )}
              </p>
            </div>

            <div className="wholesale-box">
              <h3>{t("pages.wholesale.items.catalog.title", "Catalog Planning")}</h3>
              <p>
                {t(
                  "pages.wholesale.items.catalog.text",
                  "We help you select best-sellers and organize collections for your store."
                )}
              </p>
            </div>

            <div className="wholesale-box">
              <h3>{t("pages.wholesale.items.support.title", "Support")}</h3>
              <p>
                {t(
                  "pages.wholesale.items.support.text",
                  "Reliable communication, order tracking, and post-sale assistance."
                )}
              </p>
            </div>
          </div>

          <a
            className="wholesale-btn"
            href="https://shop.everything-alpaca.com/crm.asp?action=contactus"
            target="_blank"
            rel="noreferrer"
          >
            {t("pages.wholesale.cta", "REQUEST INFO")}
          </a>
        </div>
      </div>
    </section>
  )
}
