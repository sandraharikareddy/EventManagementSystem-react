import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom'

import { useStore } from '../context/Store'

function Navbar() {

  const {
    currentUser,
    adminLoggedIn,
    logout
  } = useStore()

  const navigate = useNavigate()
  const location = useLocation()

  const authPage =
    location.pathname === '/login' ||
    location.pathname === '/signup'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (

    <header>

      <div className="nav-container">

        <Link
          to={
            adminLoggedIn
              ? '/admin-dashboard'
              : currentUser
                ? '/user-dashboard'
                : '/'
          }
          className="logo"
        >
          Event Management System
        </Link>

        <nav>

          {authPage ? (

            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>

          ) : adminLoggedIn ? (

            <>
              <Link to="/admin-dashboard">
                Admin Dashboard
              </Link>

              <Link to="/events">
                Events
              </Link>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>

          ) : currentUser ? (

            <>
              <Link to="/user-dashboard">
                Dashboard
              </Link>

              <Link to="/events">
                Events
              </Link>

              {currentUser.role === 'organizer' && (
                <>
                  <Link to="/create-event">
                    Create Event
                  </Link>

                  <Link to="/my-events">
                    My Events
                  </Link>
                </>
              )}

              {currentUser.role === 'attendee' && (
                <Link to="/my-registrations">
                  My Registrations
                </Link>
              )}

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>

          )}

        </nav>

      </div>

    </header>
  )
}

export default Navbar