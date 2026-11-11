import { Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useStore } from '../context/Store'

function AdminDashboard() {

  const {
    events,
    users,
    registrations,
    deleteEvent,
    adminLoggedIn
  } = useStore()

  // Protect admin dashboard

  if (!adminLoggedIn) {
    return <Navigate to="/login" replace />
  }

  // Calculate total revenue

  const totalRevenue = registrations.reduce(
    (total, reg) => total + Number(reg.amount || 0),
    0
  )

  // Delete event

  const handleDelete = (eventId) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this event?'
    )

    if (confirmDelete) {
      deleteEvent(eventId)
      alert('Event deleted successfully!')
    }
  }

  return (
    <>
      <Navbar />

      <section className="dashboard">

        {/* Dashboard Heading */}

        <div className="dashboard-heading">

          <p className="role-label">
            ADMINISTRATOR
          </p>

          <h1>Admin Dashboard</h1>

          <p>
            Manage users, events, registrations and revenue.
          </p>

        </div>

        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Events</h3>
            <p>{events.length}</p>
          </div>

          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>

          <div className="stat-card">
            <h3>Total Registrations</h3>
            <p>{registrations.length}</p>
          </div>

          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>₹{totalRevenue}</p>
          </div>

        </div>

        {/* Event Management */}

        <div className="dashboard-section">

          <h2>Event Management</h2>

          <p>
            View and manage all events created in the system.
          </p>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Tickets</th>
                  <th>Revenue</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {events.length > 0 ? (

                  events.map(event => {

                    const eventRegistrations =
                      registrations.filter(
                        reg => reg.eventId === event.id
                      )

                    const revenue =
                      eventRegistrations.reduce(
                        (total, reg) =>
                          total + Number(reg.amount || 0),
                        0
                      )

                    return (

                      <tr key={event.id}>

                        <td>{event.title}</td>

                        <td>{event.date}</td>

                        <td>{event.venue}</td>

                        <td>
                          {eventRegistrations.length}
                          {' / '}
                          {event.capacity}
                        </td>

                        <td>₹{revenue}</td>

                        <td>

                          <button
                            className="btn btn-danger table-btn"
                            onClick={() => handleDelete(event.id)}
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    )
                  })

                ) : (

                  <tr>
                    <td colSpan="6">
                      No events available.
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* User Management */}

        <div className="dashboard-section">

          <h2>Registered Users</h2>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>

                {users.length > 0 ? (

                  users.map(user => (

                    <tr key={user.id}>

                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td>{user.role}</td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="3">
                      No registered users yet.
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </section>
    </>
  )
}

export default AdminDashboard