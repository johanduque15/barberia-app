import Navbar from "./components/common/Navbar/Navbar"
import Hero from "./components/common/Hero/Hero"
import Services from "./components/common/Services/Services"
import Barbers from "./components/common/Barbers/Barbers"
import ReservationCTA from "./components/common/ReservationCTA/ReservationCTA"

function App() {
  return (
    <div className="min-h-screen bg-barber-black text-barber-gold">
       
        <Navbar />
        <Hero />
        <Services />
        <Barbers />
        <ReservationCTA />

    </div>
  )
}

export default App