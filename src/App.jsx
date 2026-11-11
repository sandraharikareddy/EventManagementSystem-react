import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Events from './pages/Events'
import CreateEvent from './pages/CreateEvent'
import MyEvents from './pages/MyEvents'
import MyRegistrations from './pages/MyRegistrations'

function App() {

  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route
        path="/user-dashboard"
        element={<UserDashboard />}
      />

      <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
      />

      <Route path="/events" element={<Events />} />

      <Route
        path="/create-event"
        element={<CreateEvent />}
      />

      <Route path="/my-events" element={<MyEvents />} />

      <Route
        path="/my-registrations"
        element={<MyRegistrations />}
      />

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  )
}

export default App