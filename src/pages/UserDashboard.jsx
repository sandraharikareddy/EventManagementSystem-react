import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useStore } from '../context/Store'

function UserDashboard() {

  const {
    currentUser,
    events,
    registrations
  } = useStore()

  if (!currentUser) {
    return (
      <>
        <Navbar />
        <div className="empty-message">
          <h2>Please login first.</h2>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      </>
    )
  }

  const isOrganizer = currentUser.role === 'organizer'

  const myEvents = events.filter(
    event => event.owner === currentUser.email
  )

  const myRegistrations = registrations.filter(
    reg => reg.userEmail === currentUser.email
  )

  const organizerRegistrations = registrations.filter(
    reg => myEvents.some(event => event.id === reg.eventId)
  )

  const revenue = organizerRegistrations.reduce(
    (total, reg) => total + Number(reg.amount),
    0
  )

  const spent = myRegistrations.reduce(
    (total, reg) => total + Number(reg.amount),
    0
  )

  return (
    <>
      <Navbar />

      <section className="dashboard">

        <div className="dashboard-heading">

          <p className="role-label">
            {currentUser.role}
          </p>

          <h1>
            Welcome, {currentUser.name}!
          </h1>

          <p>
            Welcome to your Event Management Dashboard.
          </p>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>
              {isOrganizer ? 'My Events' : 'Available Events'}
            </h3>

            <p>
              {isOrganizer ? myEvents.length : events.length}
            </p>
          </div>

          <div className="stat-card">
            <h3>
              {isOrganizer ? 'Registrations' : 'My Registrations'}
            </h3>

            <p>
              {isOrganizer
                ? organizerRegistrations.length
                : myRegistrations.length}
            </p>
          </div>

          <div className="stat-card">
            <h3>
              {isOrganizer ? 'Total Revenue' : 'Total Spent'}
            </h3>

            <p>
              ₹{isOrganizer ? revenue : spent}
            </p>
          </div>

        </div>

        <div className="quick-actions">

          <h2>Quick Actions</h2>

          {isOrganizer ? (

            <>
              <Link to="/create-event" className="btn">
                Create Event
              </Link>

              <Link to="/my-events" className="btn btn-secondary">
                Manage Events
              </Link>
            </>

          ) : (

            <>
              <Link to="/events" className="btn">
                Explore Events
              </Link>

              <Link to="/my-registrations" className="btn btn-secondary">
                My Registrations
              </Link>
            </>

          )}

        </div>

      </section>
    </>
  )
}

export default UserDashboard