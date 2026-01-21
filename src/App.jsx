import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Carousel from "./components/Carousel"
import Sections from "./components/Sections"
import Products from "./components/Products"
import Sustainability from "./components/Sustainability"
import Footer from "./components/Footer"

// ✅ IMPORTA TU VISTA (ajusta la ruta si tu archivo está en otra carpeta)
import Us from "./pages/Us"

function Home() {
  return (
    <>
      <Carousel />
      <Sections />
      <Products />
      <Sustainability />
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/us" element={<Us />} />
      </Routes>

      <Footer />
    </Router>
  )
}
