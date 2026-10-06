import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function Matches() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchMatches() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("match_date", { ascending: true });

    if (error) {
      console.error("Matches error:", error);
      setError("Unable to load matches.");
    } else {
      setMatches(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchMatches();
  }, []);

  function handleBooking(match) {
    navigate("/booking", {
      state: {
        match: {
          ...match,
          date: new Date(match.match_date).toLocaleDateString("en-IN"),
          time: new Date(match.match_date).toLocaleTimeString(
            "en-IN",
            {
              hour: "numeric",
              minute: "2-digit"
            }
          )
        }
      }
    });
  }

  const teamColors = {
    "Chennai Super Kings": "#facc15",
    "Mumbai Indians": "#2563eb",
    "Royal Challengers Bengaluru": "#dc2626",
    "Kolkata Knight Riders": "#7c3aed",
    "Rajasthan Royals": "#ec4899",
    "Sunrisers Hyderabad": "#f97316",
    "Delhi Capitals": "#2563eb",
    "Punjab Kings": "#dc2626",
    "Gujarat Titans": "#1e3a8a",
    "Lucknow Super Giants": "#0ea5e9"
  };

  const teamShortNames = {
    "Chennai Super Kings": "CSK",
    "Mumbai Indians": "MI",
    "Royal Challengers Bengaluru": "RCB",
    "Kolkata Knight Riders": "KKR",
    "Rajasthan Royals": "RR",
    "Sunrisers Hyderabad": "SRH",
    "Delhi Capitals": "DC",
    "Punjab Kings": "PBKS",
    "Gujarat Titans": "GT",
    "Lucknow Super Giants": "LSG"
  };

  return (
    <main className="matches-page">

      <div className="matches-heading">
        <span className="matches-badge">🏏 IPL 2026</span>

        <h1>Upcoming Matches</h1>

        <p>
          Choose your favourite match and book your stadium experience!
        </p>
      </div>

      {loading && (
        <p className="loading-message">
          Loading matches...
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && matches.length === 0 && (
        <p className="loading-message">
          No matches available.
        </p>
      )}

      <div className="matches-grid">

        {matches.map((match) => (

          <div className="match-card" key={match.id}>

            <div className="match-top">
              <span>🏆 IPL Match</span>

              <span className="live-badge">
                {match.status || "Upcoming"}
              </span>
            </div>

            <div className="teams-container">

              <div className="team">

                <div
                  className="team-logo"
                  style={{
                    backgroundColor:
                      teamColors[match.team1] || "#2563eb"
                  }}
                >
                  {teamShortNames[match.team1] || "T1"}
                </div>

                <h3>{match.team1}</h3>

              </div>

              <span className="vs-text">
                VS
              </span>

              <div className="team">

                <div
                  className="team-logo"
                  style={{
                    backgroundColor:
                      teamColors[match.team2] || "#dc2626"
                  }}
                >
                  {teamShortNames[match.team2] || "T2"}
                </div>

                <h3>{match.team2}</h3>

              </div>

            </div>

            <div className="match-info">

              <p>
                📅{" "}
                {new Date(match.match_date).toLocaleDateString(
                  "en-IN"
                )}
              </p>

              <p>
                🕒{" "}
                {new Date(match.match_date).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "numeric",
                    minute: "2-digit"
                  }
                )}
              </p>

              <p>
                📍 {match.venue}
              </p>

            </div>

            <div className="match-bottom">

              <div>
                <span className="ticket-label">
                  Starting from
                </span>

                <h3>
                  ₹{Number(match.ticket_price).toLocaleString("en-IN")}
                </h3>
              </div>

              <button
                onClick={() => handleBooking(match)}
                className="match-book-btn"
              >
                Book Now →
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}

export default Matches;