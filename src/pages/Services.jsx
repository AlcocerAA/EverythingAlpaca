import "../styles/services.css"

export default function Services() {
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

      {/* Overlay suave (para que el texto negro se lea) */}
      <div className="services-overlay" />

      <div className="services-content">
        <h1 className="services-title">SERVICES</h1>

        <p className="services-subtitle">
          We offer tailored alpaca solutions for brands, boutiques, and custom projects — from product sourcing to private label.
        </p>

        <div className="services-card">
          <div className="services-grid">
            <div className="service-box">
              <h3>PRIVATE LABEL</h3>
              <p>Custom products with your brand identity: labels, packaging, and curated materials.</p>
            </div>

            <div className="service-box">
              <h3>CUSTOMIZATION</h3>
              <p>Colors, patterns, and finishes adapted to your collection and market needs.</p>
            </div>

            <div className="service-box">
              <h3>PRODUCT SOURCING</h3>
              <p>Help selecting the right alpaca items for your audience: apparel, accessories and home decor.</p>
            </div>

            <div className="service-box">
              <h3>LOGISTICS SUPPORT</h3>
              <p>Guidance for shipping, packing, documentation and order planning.</p>
            </div>
          </div>

          <a
            href="https://shop.everything-alpaca.com/crm.asp?action=contactus"
            className="services-btn"
            target="_blank"
            rel="noreferrer"
          >
            CONTACT US
          </a>
        </div>
      </div>
    </section>
  )
}
