import Carousel from "../components/Carousel"
import SectionTitle from "../components/SectionTitle"

export default function Home() {
  return (
    <>
      <Carousel />

      <section className="py-24 px-6 bg-alpaca-cream dark:bg-alpaca-dark">
        <SectionTitle
          title="Crafted in the Andes"
          subtitle="Luxury alpaca products made with tradition"
        />
      </section>
    </>
  )
}
