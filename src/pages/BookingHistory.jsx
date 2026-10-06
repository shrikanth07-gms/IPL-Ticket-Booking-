import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function History() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchBookings() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: false });

    if (error) {
      console.error(error);
      setError("Unable to load booking history.");
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function deleteBooking(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Unable to delete booking.");
      return;
    }

    setBookings((previous) =>
      previous.filter((booking) => booking.id !== id)
    );
  }

  const totalBookings = bookings.length;

  const totalTickets = bookings.reduce(
    (sum, booking) => sum + booking.tickets,
    0
  );

  const totalAmount = bookings.reduce(
    (sum, booking) => sum + booking.total_amount,
    0
  );

  return (
    <main className="history-page">

      <div className="ipl-badge">
        🏏 IPL 2026
      </div>

      <h1>My Booking History</h1>

      <p className="booking-subtitle">
        Manage and view all your IPL ticket bookings.
      </p>

      <div className="history-stats">

        <div className="stat-card">
          <span>Total Bookings</span>
          <h2>{totalBookings}</h2>
        </div>

        <div className="stat-card">
          <span>Total Tickets</span>
          <h2>{totalTickets}</h2>
        </div>

        <div className="stat-card">
          <span>Total Amount</span>
          <h2>
            ₹{totalAmount.toLocaleString("en-IN")}
          </h2>
        </div>

      </div>

      <div className="history-heading">
        <h2>Recent Bookings</h2>

        <button
          className="refresh-btn"
          onClick={fetchBookings}
        >
          ↻ Refresh
        </button>
      </div>

      {loading && (
        <p className="loading-message">
          Loading bookings...
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="empty-history">
          <h3>No bookings yet!</h3>
          <p>Your IPL bookings will appear here.</p>
        </div>
      )}

      <div className="history-list">

        {bookings.map((booking, index) => (
          <div className="history-card" key={booking.id}>

            <div className="history-card-header">

              <div>
                <span className="booking-number">
                  BOOKING #{index + 1}
                </span>

                <h3>{booking.match_name}</h3>
              </div>

              <span className="status-badge">
                {booking.status}
              </span>

            </div>

            <div className="history-details">

              <div>
                <span>Booking ID</span>
                <strong>{booking.booking_id}</strong>
              </div>

              <div>
                <span>Customer</span>
                <strong>{booking.customer_name}</strong>
              </div>

              <div>
                <span>Venue</span>
                <strong>{booking.venue}</strong>
              </div>

              <div>
                <span>Stand</span>
                <strong>{booking.stand}</strong>
              </div>

              <div>
                <span>Tickets</span>
                <strong>{booking.tickets}</strong>
              </div>

              <div>
                <span>Booking Date</span>
                <strong>
                  {new Date(
                    booking.booking_date
                  ).toLocaleDateString("en-IN")}
                </strong>
              </div>

            </div>

            <div className="history-card-footer">

              <div>
                <span>Total Amount</span>
                <h2>
                  ₹{booking.total_amount.toLocaleString("en-IN")}
                </h2>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteBooking(booking.id)}
              >
                Delete Booking
              </button>

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}

export default History;