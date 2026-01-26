import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import "./i18n/i18n"

import { I18nextProvider } from "react-i18next"
import i18n from "./i18n/i18n"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      {/* ✅ FIX: evita “white flash” por drag lateral */}
      <div style={{ width: "100%", overflowX: "hidden" }}>
        <App />
      </div>
    </I18nextProvider>
  </React.StrictMode>
)
