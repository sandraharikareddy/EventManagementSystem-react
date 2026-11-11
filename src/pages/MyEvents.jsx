import Navbar from '../components/Navbar'
import { useStore } from '../context/Store'
import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom'

function MyEvents() {

  const {
    events,
    currentUser,
    updateEvent,
    deleteEvent
  } = useStore()

  const myEvents = events.filter(
    event => event.owner === currentUser?.email
  )

  const handleEdit = (event) => {

    const title = prompt(
      'Enter new event title:',
      event.title
    )

    if (title === null || !title.trim()) return

    const price = prompt(
      'Enter ticket price:',
      event.price
    )

    if (price === null || price.trim() === '') return

    const capacity = prompt(
      'Enter event capacity:',
      event.capacity
    )

    if (capacity === null || capacity.trim() === '') return

    if (
      Number(price) < 0 ||
      Number(capacity) < 1 ||
      !Number.isFinite(Number(price)) ||
      !Number.isFinite(Number(capacity))
    ) {
      alert('Please enter valid values.')
      return
    }

    updateEvent(event.id, {
      title: title.trim(),
      price: Number(price),
      capacity: Number(capacity)
    })

    alert('Event updated successfully!')
  }

  const handleDelete = (id) => {

    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id)
    }
  }

  return (
    <>
      <Navbar />

      <section className="page-section">

        <div className="page-header">

          <div>
            <h1>My Events</h1>
            <p>Manage the events you created.</p>
          </div>

          <Link
            to="/create-event"
            className="btn"
          >
            + Create Event
          </Link>

        </div>

        <div className="event-grid">

          {myEvents.length > 0 ? (

            myEvents.map(event => (

              <div key={event.id}>

                <EventCard event={event} />

                <div className="event-actions">

                  <button
                    className="btn btn-small btn-outline"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="empty-message">
              <h3>No events created yet.</h3>

              <p>
                Start by creating your first event.
              </p>

            </div>

          )}

        </div>

      </section>
    </>
  )
}

export default MyEvents