import Hero from "../components/common/Hero/Hero";
import Services from "../components/common/Services/Services";
import Barbers from "../components/common/Barbers/Barbers";
import ReservationCTA from "../components/common/ReservationCTA/ReservationCTA";


export default function HomePage() {
    return(
        <>
        <Hero />
        <Services />
        <Barbers />
        <ReservationCTA />        
        </>

    )
}