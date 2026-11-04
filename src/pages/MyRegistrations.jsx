import Navbar from '../components/Navbar'
import { useStore } from '../context/Store'

function MyRegistrations() {

  const {
    currentUser,
    registrations,
    events
  } = useStore()

  const myRegistrations = registrations.filter(
    reg => reg.userEmail === currentUser?.email
  )

  return (
    <>
      <Navbar />

      <section className="page-section">

        <div className="page-title-block">

          <h1>My Registrations</h1>

          <p>
            View your registered events and tickets.
          </p>

        </div>

        <div className="event-grid">

          {myRegistrations.length > 0 ? (

            myRegistrations.map(reg => {

              const event = events.find(
                e => e.id === reg.eventId
              )

              return (

                <div
                  className="event-card registration-card"
                  key={reg.id}
                >

                  <h2>{reg.eventTitle}</h2>

                  {event && (
                    <>
                      <p>
                        <strong>Date:</strong> {event.date}
                      </p>

                      <p>
                        <strong>Time:</strong> {event.time}
                      </p>

                      <p>
                        <strong>Venue:</strong> {event.venue}
                      </p>
                    </>
                  )}

                  <p>
                    <strong>Ticket ID:</strong>
                    {' '}{reg.ticketId}
                  </p>

                  <p>
                    <strong>Amount Paid:</strong>
                    {' '}₹{reg.amount}
                  </p>

                  <span className="event-badge">
                    Registered
                  </span>

                </div>

              )
            })

          ) : (

            <div className="empty-message">

              <h3>No registrations found.</h3>

              <p>
                Explore events and register for your favourite ones.
              </p>

            </div>

          )}

        </div>

      </section>
    </>
  )
}

export default MyRegistrations