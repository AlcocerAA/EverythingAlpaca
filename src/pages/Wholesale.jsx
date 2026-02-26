import "../styles/wholesale.css"
import { useTranslation } from "react-i18next"

export default function Wholesale() {
  const { t } = useTranslation()

  return (
    <section className="wholesale-hero">
      
      {/* VIDEO DESKTOP / IPAD */}
      <video
        className="wholesale-bgvid wholesale-bgvid-horizontal"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/wholesale-horizontal.mp4" type="video/mp4" />
      </video>

      {/* VIDEO MOBILE */}
      <video
        className="wholesale-bgvid wholesale-bgvid-vertical"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/wholesale-vertical.mp4" type="video/mp4" />
      </video>

      <div className="wholesale-overlay" />

      <div className="wholesale-content">
        <h1 className="wholesale-title">
          {t("pages.wholesale.heroTitle", "WHOLESALE")}
        </h1>

        <p className="wholesale-subtitle">
          {t(
            "pages.wholesale.heroSubtitle",
            "Wholesale manufacturing solutions for retailers, boutiques, and distributors. Partner with us to develop, produce, and scale premium alpaca collections with reliable lead times and consistent quality."
          )}
        </p>

        <div className="wholesale-card">
          <div className="wholesale-grid">
            <div className="wholesale-box">
              <h3>{t("pages.wholesale.items.retail.title", "Retail Programs")}</h3>
              <p>
                {t(
                  "pages.wholesale.items.retail.text",
                  "Wholesale programs tailored to boutiques and retail chains, with curated assortments aligned to your market and customer profile."
                )}
              </p>
            </div>

            <div className="wholesale-box">
              <h3>{t("pages.wholesale.items.volume.title", "Volume Pricing")}</h3>
              <p>
                {t(
                  "pages.wholesale.items.volume.text",
                  "Competitive pricing structures based on order volume, supporting scalable growth and long-term wholesale partnerships."
                )}
              </p>
            </div>

            <div className="wholesale-box">
              <h3>{t("pages.wholesale.items.catalog.title", "Catalog Planning")}</h3>
              <p>
                {t(
                  "pages.wholesale.items.catalog.text",
                  "Assistance in selecting core styles, seasonal pieces, and best-sellers to build a balanced and profitable wholesale catalog."
                )}
              </p>
            </div>

            <div className="wholesale-box">
              <h3>{t("pages.wholesale.items.support.title", "Support")}</h3>
              <p>
                {t(
                  "pages.wholesale.items.support.text",
                  "Dedicated wholesale support including production coordination, order tracking, and post-delivery assistance."
                )}
              </p>
            </div>
          </div>

          <div className="wholesale-cta-row">
            <div className="wholesale-cta-block">
              <p>Become a wholesale customer. Contact us now.</p>
              <a
                href="https://shop.everything-alpaca.com/crm.asp?action=contactus"
                target="_blank"
                rel="noreferrer"
                className="wholesale-btn"
              >
                CONTACT US NOW
              </a>
            </div>

            <div className="wholesale-cta-block">
              <p>Wholesale account holders access your account here.</p>
              <a
                href="https://shop.everything-alpaca.com/myaccount.asp"
                target="_blank"
                rel="noreferrer"
                className="wholesale-btn"
              >
                ACCESS ACCOUNT
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}