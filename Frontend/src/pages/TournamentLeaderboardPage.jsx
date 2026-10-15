import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTournamentLeaderboard, computeLineupScore } from "../services/lineupService";
import UserLineup from "../components/UserLineup";
import LeaderboardRow from "../components/LeaderboardRow";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TournamentLeaderboardPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [userLineup, setUserLineup] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  //const [selectedLineup, setSelectedLineup] = useState(null);

  useEffect(() => {
    async function computeAllScores(lineups) {
      for (const lineup of lineups) {
        try {
          await computeLineupScore(lineup._id);
        } catch (err) {
          console.error("Failed to compute score for lineup:", lineup._id, err);
        }
      }
    }

    async function load() {
      const data = await getTournamentLeaderboard(id);

      const all = data.fantasyLeaderboard;

      await computeAllScores(all); //Compute ALL scores for LeaderboardRow here instead of every Row rendering

      const updated = await getTournamentLeaderboard(id);  // Re-fetch leaderboard after scoring

      // Find logged-in user's lineup
      const mine = all.find(l => l.user._id === user._id);
      setUserLineup(mine);

      // Sort by totalScore (lower is better)
      const sorted = [...all].sort((a, b) => (a.totalScore ?? 9999) - (b.totalScore ?? 9999));
      setLeaderboard(sorted);
    }

    async function computeAllScores(lineups) {
      for (const lineup of lineups) {
        try {
          await computeLineupScore(lineup._id);
        } catch (err) {
          console.error("Failed to compute score for lineup:", lineup._id, err);
        }
      }
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
                rank={index + 1}
              //Removed state for selectedLineup and moved to LeaderboardRow component
              //selected={selectedLineup?._id === l._id}
              //onSelect={setSelectedLineup}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}


