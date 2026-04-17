import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import BookingPage from "./pages/BookingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import PublicLayout from "./layouts/PublicLayout/PublicLayout"

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />} >
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/reservar" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="registro" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App