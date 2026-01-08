import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { ThemeProvider } from "./context/ThemeContext"

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Home />
    </ThemeProvider>
  )
}
