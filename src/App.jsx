import Navbar from "./components/Navbar"
import Carousel from "./components/Carousel"
import Sections from "./components/Sections"
import ProductsGrid from "./components/ProductsGrid"
import FeaturedCarousel from "./components/FeaturedCarousel"
import OurFibers from "./components/OurFibers"
import Sustainability from "./components/Sustainability"
import Footer from "./components/Footer"


export default function App() {
  return (
    <>
      <Navbar />
      <Carousel />
      <Sections />
      <ProductsGrid />
      <FeaturedCarousel />
      <OurFibers />
      <Sustainability />
      <Footer />
    </>
  )
}
