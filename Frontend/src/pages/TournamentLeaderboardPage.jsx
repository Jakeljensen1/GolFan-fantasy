import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTournamentLineups } from "../services/lineupService";
import UserLineup from "../components/UserLineup";
import LeaderboardRow from "../components/LeaderboardRow";
import PlayerCard from "../components/PlayerCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TournamentLeaderboardPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [userLineup, setUserLineup] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedLineup, setSelectedLineup] = useState(null);

  useEffect(() => {
    async function load() {
      //console.log("Auth user:", user);

      const all = await getTournamentLineups(id);
      //console.log("Lineup users:", all.map(l => l.user._id));

      // Find the logged-in user's lineup
      const mine = all.find(l => l.user._id === user._id);
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

      {/* User Lineup */}
      <div className="section">
        <h2>Your Lineup</h2>
        {userLineup ? (
          <UserLineup lineup={userLineup} />
        ) : (
          <p>You have not created a lineup for this tournament.</p>
        )}
      </div>

      {/* Selected Lineup within leaderboard*/}
      {selectedLineup && (
        <UserLineup line={selectedLineup} onClose={() => setSelectedLineup(null)} />
      )}


      {/* Leaderboard */}
      <div className="section">
        <h2>Leaderboard</h2>

        {leaderboard.length === 0 ? (
          <p>Leaderboard Unavailable</p>
        ) : (
          <div className="grid">
            {leaderboard.map((l, index) => (
              <LeaderboardRow
                key={l._id}
                lineup={l}
                rank={index + 1} //ranking
                onSelect={setSelectedLineup} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

