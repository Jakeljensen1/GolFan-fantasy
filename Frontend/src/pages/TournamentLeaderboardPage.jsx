import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTournamentLineups } from "../services/lineupService";
import UserLineup from "../components/UserLineup";
import LeaderboardRow from "../components/LeaderboardRow";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TournamentLeaderboardPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [userLineup, setUserLineup] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function load() {
      const all = await getTournamentLineups(id);

      // Find the logged-in user's lineup
      const mine = all.find(l => l.user._id === user);
      setUserLineup(mine);

      // Sort all lineups by score
      const sorted = [...all].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
      setLeaderboard(sorted);
    }

    if (user) load();
  }, [id, user]);

  return (
    <div className="page">
      <Header />

      <h1>Tournament Leaderboard</h1>

      {/* USER LINEUP SECTION */}
      <div className="section">
        <h2>Your Lineup</h2>
        {userLineup ? (
          <UserLineup lineup={userLineup} />
        ) : (
          <p>You have not created a lineup for this tournament.</p>
        )}
      </div>

      {/* LEADERBOARD SECTION */}
      <div className="section">
        <h2>Leaderboard</h2>

        {leaderboard.length === 0 ? (
          <p>Leaderboard Unavailable</p>
        ) : (
          <div className="grid">
            {leaderboard.map(l => (
              <LeaderboardRow key={l._id} lineup={l} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

