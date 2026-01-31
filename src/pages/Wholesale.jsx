import "../styles/wholesale.css"

export default function Wholesale() {
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
        <h1 className="wholesale-title">WHOLESALE</h1>

        <p className="wholesale-subtitle">
          Wholesale options for retailers and distributors. Build your assortment with premium alpaca pieces and consistent stock planning.
        </p>

        <div className="wholesale-card">
          <div className="wholesale-grid">
            <div className="wholesale-box">
              <h3>Retail Programs</h3>
              <p>Assortment recommendations based on season, location and target customers.</p>
            </div>

            <div className="wholesale-box">
              <h3>Volume Pricing</h3>
              <p>Competitive wholesale rates for bulk purchases and long-term partnerships.</p>
            </div>

            <div className="wholesale-box">
              <h3>Catalog Planning</h3>
              <p>We help you select best-sellers and organize collections for your store.</p>
            </div>

            <div className="wholesale-box">
              <h3>Support</h3>
              <p>Reliable communication, order tracking, and post-sale assistance.</p>
            </div>
          </div>

          <a
            className="wholesale-btn"
            href="https://shop.everything-alpaca.com/crm.asp?action=contactus"
            target="_blank"
            rel="noreferrer"
          >
            REQUEST INFO
          </a>
        </div>
      </div>
    </section>
  )
}
