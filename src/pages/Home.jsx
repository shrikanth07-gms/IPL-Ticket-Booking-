import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="home-hero">

        <div className="hero-content">

          <span className="home-badge">
            🏏 IPL 2026
          </span>

          <h1>
            Book Your IPL Tickets
            <br />
            <span>Experience Cricket Live!</span>
          </h1>

          <p>
            Choose your favourite IPL match, select your seats,
            and get your booking confirmed instantly.
          </p>

          <div className="hero-buttons">

            <button
              className="hero-primary-btn"
              onClick={() => navigate("/matches")}
            >
              View Matches →
            </button>

            <button
              className="hero-secondary-btn"
              onClick={() => navigate("/booking")}
            >
              Book Ticket
            </button>

          </div>

        </div>

        <div className="hero-cricket">
          🏏
        </div>

      </section>


      {/* Features Section */}
      <section className="features-section">

        <h2>Why Choose IPL Ticket Booking?</h2>

        <p className="features-subtitle">
          Simple, fast and convenient ticket booking experience.
        </p>

        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🎟️
            </div>

            <h3>Easy Booking</h3>

            <p>
              Select your favourite match and book your tickets
              in just a few simple steps.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔒
            </div>

            <h3>Secure Database</h3>

            <p>
              Your booking information is stored securely using
              a Supabase database.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ✅
            </div>

            <h3>Instant Confirmation</h3>

            <p>
              Get a unique booking ID and confirmation as soon
              as your ticket is booked.
            </p>

          </div>

        </div>

      </section>


      {/* Call To Action */}
      <section className="home-cta">

        <h2>Ready for the IPL action?</h2>

        <p>
          Explore upcoming matches and reserve your tickets today.
        </p>

        <button
          onClick={() => navigate("/matches")}
          className="cta-btn"
        >
          Explore Matches →
        </button>

      </section>

    </main>
  );
}

export default Home;