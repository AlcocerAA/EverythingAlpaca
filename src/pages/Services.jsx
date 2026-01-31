import "../styles/services.css"
import { useTranslation } from "react-i18next"

export default function Services() {
  const { t } = useTranslation()

  return (
    <section className="services-hero">
      {/* VIDEO FONDO (loop) */}
      <video
        className="services-bgvid"
        src="/services-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Overlay suave */}
      <div className="services-overlay" />

      <div className="services-content">
        <h1 className="services-title">
          {t("pages.services.heroTitle", "SERVICES")}
        </h1>

        <p className="services-subtitle">
          {t(
            "pages.services.heroSubtitle",
            "We are a clothing manufacturer that specializes in woven and knitted luxurious Alpaca and Alpaca blends textiles and apparel. We help you realize your ideas from the sketch board to a final manufactured product."
          )}
        </p>

        <div className="services-card">
          <div className="services-grid">
            <div className="service-box">
              <h3>
                {t(
                  "pages.services.items.privateLabel.title",
                  "PROTOTYPING AND SAMPLING"
                )}
              </h3>
              <p>
                {t(
                  "pages.services.items.privateLabel.text",
                  "We can collaborate to create a physical prototype of your idea and/or deliver a sample from your tech pack."
                )}
              </p>
            </div>

            {/* ✅ MANUFACTURING (igual que lo dejaste) */}
            <div className="service-box">
              <h3>
                {t("pages.services.items.customization.title", "MANUFACTURING")}
              </h3>

              <p>
                {t(
                  "pages.services.items.customization.text",
                  "Woven - Scarves - Shawls - Throws - Blankets GSM capabilities vary from super lightweight pashminas to robust blankets and reversible fabrics"
                )}
              </p>

              <div className="service-sub">
                <h4>{t("pages.services.items.sourcing.title", "KNIT")}</h4>
                <p>
                  {t(
                    "pages.services.items.sourcing.text",
                    "Knit gauge 3 to gauge 14 - Sweater - Cardigans - Jackets - Shirts - Hats - Scarves - Gloves - Socks - Capes/Wraps"
                  )}
                </p>
              </div>
            </div>

            {/* ✅ LOGISTICS (limpio) */}
            <div className="service-box">
              <h3>{t("pages.services.items.logistics.title", "LOGISTICS")}</h3>
              <p>
                {t(
                  "pages.services.items.logistics.text",
                  "We ship your order from Los Angeles, so you do not have to worry about freight/customs."
                )}
              </p>
            </div>

            {/* ✅ LOW MOQ + GARMENT LABELING (como antes, pero texto parpadea) */}
            <div className="service-box service-box-center">
              <h3>LOW MOQ</h3>
              <p className="service-big">GARMENT LABELING</p>
            </div>
          </div>

          <a
            href="https://shop.everything-alpaca.com/crm.asp?action=contactus"
            className="services-btn"
            target="_blank"
            rel="noreferrer"
          >
            {t("pages.services.contactCta", "CONTACT US")}
          </a>
        </div>
      </div>
    </section>
  )
}
