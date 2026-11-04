
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <header>
        <div className="nav-container">
          <div className="logo">
            Event Management System
          </div>

          <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Plan. Manage. Experience.</h1>

          <p>
            Create, manage and attend events easily
            with our Event Management System.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="btn">
              Get Started
            </Link>

            <Link to="/signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Our Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Event Management</h3>
            <p>
              Organizers can create, edit and manage their events.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎟️</div>
            <h3>Ticket Management</h3>
            <p>
              Manage registrations, tickets and event capacity.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Event Reminders</h3>
            <p>
              Set reminders and keep track of registered events.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics</h3>
            <p>
              Track registrations, tickets and event revenue.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Event Management System</p>
      </footer>
    </>
  )
}

export default Home
