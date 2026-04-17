import { Outlet } from "react-router"
import Navbar from "../../components/common/Navbar/Navbar"
import Footer from "../../components/common/Footer/Footer"

export default function PublicLayout(){
    return(
        <div className="min-h-screen bg-barber-black text-barber-gold">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}