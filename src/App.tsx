import Navbar from "./components/common/Navbar/Navbar"
import Hero from "./components/common/Hero/Hero"
import Services from "./components/common/Services/Services"

function App() {
  return (
    <div className="min-h-screen bg-barber-black text-barber-gold">
       
        <Navbar />
        <Hero />
        <Services />

    </div>
  )
}

export default App