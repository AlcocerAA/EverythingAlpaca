export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-montserrat text-alpaca-brown dark:text-alpaca-cream">
        {title}
      </h2>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        {subtitle}
      </p>
    </div>
  )
}
