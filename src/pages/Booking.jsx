import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const PRICE_PER_TICKET = 1500;

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedMatch = location.state?.match;

  const [name, setName] = useState("");
  const [tickets, setTickets] = useState("");
  const [stand, setStand] = useState("");
  const [venue, setVenue] = useState(
    selectedMatch?.venue || ""
  );

  const [booked, setBooked] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = Number(tickets) * PRICE_PER_TICKET;

  async function handleBooking(e) {
    e.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !tickets ||
      Number(tickets) < 1 ||
      Number(tickets) > 10 ||
      !stand ||
      !venue
    ) {
      setError("Please fill in all details correctly.");
      return;
    }

    setLoading(true);

    const generatedId = `IPL-${Date.now()}`;

    const newBooking = {
      booking_id: generatedId,
      customer_name: name.trim(),
      match_name: selectedMatch
        ? `${selectedMatch.team1} vs ${selectedMatch.team2}`
        : "General IPL Booking",
      venue: venue,
      stand: stand,
      tickets: Number(tickets),
      price_per_ticket: PRICE_PER_TICKET,
      total_amount: totalAmount,
      status: "Confirmed"
    };

    try {
      const { error: insertError } = await supabase
        .from("bookings")
        .insert([newBooking]);

      if (insertError) {
        throw insertError;
      }

      setBookingId(generatedId);
      setBooked(true);

    } catch (err) {
      console.error("Booking error:", err);
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="booking-page">

      <div className="ipl-badge">
        🏏 IPL 2026
      </div>

      <h1>Book Your IPL Ticket</h1>

      <p className="booking-subtitle">
        Experience the excitement of live cricket.
        Reserve your seats today!
      </p>

      <div className="booking-container">

        {!booked ? (
          <>
            <h2>Booking Details</h2>

            {selectedMatch && (
              <div className="selected-match">
                <span>SELECTED MATCH</span>

                <h3>
                  {selectedMatch.team1} vs {selectedMatch.team2}
                </h3>

                <p>📅 {selectedMatch.date}</p>
                <p>🕒 {selectedMatch.time}</p>
                <p>📍 {selectedMatch.venue}</p>
              </div>
            )}

            <form
              onSubmit={handleBooking}
              className="booking-form"
            >

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label htmlFor="tickets">
                Number of Tickets
              </label>

              <input
                id="tickets"
                type="number"
                min="1"
                max="10"
                placeholder="Enter tickets (1-10)"
                value={tickets}
                onChange={(e) => setTickets(e.target.value)}
                required
              />

              <label htmlFor="stand">
                Select Stand
              </label>

              <select
                id="stand"
                value={stand}
                onChange={(e) => setStand(e.target.value)}
                required
              >
                <option value="">Select Stand</option>
                <option value="General Stand">
                  General Stand
                </option>
                <option value="VIP Stand">
                  VIP Stand
                </option>
              </select>

              <label htmlFor="venue">
               Venue
              </label>

              <input
              id="venue"
              type="text"
              value={selectedMatch?.venue || venue}
              readOnly
              />

              <div className="price-summary">

                <div className="price-row">
                  <span>Selected Stand</span>
                  <strong>{stand || "Not selected"}</strong>
                </div>

                <div className="price-row">
                  <span>Price per ticket</span>
                  <strong>₹1,500</strong>
                </div>

                <div className="price-row total-row">
                  <span>Total Amount</span>
                  <strong>
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </strong>
                </div>

              </div>

              {error && (
                <p className="error-message">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="confirm-btn"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "Confirm Booking →"}
              </button>

            </form>

            <p className="demo-note">
              🔒 Demo booking system. No actual payment is collected.
            </p>
          </>
        ) : (
          <div className="success-message">

            <div className="success-icon">✓</div>

            <h2>Booking Confirmed!</h2>

            <p>Thank you, {name}!</p>

            <div className="success-details">
              <p>
                Booking ID: <strong>{bookingId}</strong>
              </p>

              <p>
                Match: <strong>
                  {selectedMatch
                    ? `${selectedMatch.team1} vs ${selectedMatch.team2}`
                    : "General IPL Booking"}
                </strong>
              </p>

              <p>
                Venue: <strong>{venue}</strong>
              </p>

              <p>
                Stand: <strong>{stand}</strong>
              </p>

              <p>
                Tickets: <strong>{tickets}</strong>
              </p>

              <p>
                Total Amount: <strong>
                  ₹{totalAmount.toLocaleString("en-IN")}
                </strong>
              </p>

              <p>
                Status: <strong>Confirmed</strong>
              </p>
            </div>

            <button
              className="confirm-btn"
              onClick={() => navigate("/history")}
            >
              View Booking History →
            </button>

          </div>
        )}

      </div>
    </main>
  );
}

export default Booking;