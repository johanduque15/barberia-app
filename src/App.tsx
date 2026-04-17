import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import BookingPage from "./pages/BookingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/servicios" element={<ServicesPage />} />
      <Route path="/reservar" element={<BookingPage />}/> 
      <Route path="/login" element={<LoginPage />}/>
      <Route path="registro" element={<RegisterPage />}/>
    </Routes>
  )
}

export default App