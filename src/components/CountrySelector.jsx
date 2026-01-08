import { countries } from "../data/countries"

export default function CountrySelector({ country, setCountry }) {
  return (
    <select
      value={country.code}
      onChange={(e) =>
        setCountry(
          countries.find(c => c.code === e.target.value)
        )
      }
      className="px-2 py-2 rounded-lg border bg-transparent text-sm dark:border-gray-600"
    >
      {countries.map(c => (
        <option key={c.code} value={c.code}>
          {c.name} ({c.symbol})
        </option>
      ))}
    </select>
  )
}
