import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import BookingPage from "./pages/BookingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import PublicLayout from "./layouts/PublicLayout/PublicLayout"
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute"
import AdminPage from "./pages/AdminPage"
import MyAppointmentsPage from "./pages/MyAppointmensPage"

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />} >
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="registro" element={<RegisterPage />} />
        <Route
          path="/reservar"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-citas"
          element={
            <ProtectedRoute>
              <MyAppointmentsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App