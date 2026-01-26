import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Carousel from "./components/Carousel"
import Sections from "./components/Sections"
import Products from "./components/Products"
import Sustainability from "./components/Sustainability"
import Footer from "./components/Footer"

import Us from "./pages/Us"
import SustainabilityPage from "./pages/SustainabilityPage" // ✅ ESTE ES TU ARCHIVO REAL

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
        <Route path="/sustainability" element={<SustainabilityPage />} /> {/* ✅ */}
      </Routes>

      <Footer />
    </Router>
  )
}
