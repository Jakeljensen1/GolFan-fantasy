import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserLineups, computeLineupScore, getTournamentLeaderboard } from "../services/lineupService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { user } = useAuth();
  const [lineups, setLineups] = useState([]);
  const [stats, setStats] = useState({
    tournamentsPlayed: 0,
    bestScore: null,
    bestFinishPlace: null,
  });

  async function computeAllScores(lineups) {
    for (const lineup of lineups) {
      try {
        await computeLineupScore(lineup._id);
      } catch (err) {
        console.error("Failed to compute score for lineup:", lineup._id, err);
      }
    }
  }

  async function getFinishPosition(lineup) {
    const data = await getTournamentLeaderboard(lineup.tournament._id);
    const leaderboard = data.fantasyLeaderboard;

    const sorted = leaderboard.sort(
      (a, b) => (a.totalScore ?? 9999) - (b.totalScore ?? 9999)
    );

    const index = sorted.findIndex(l => l._id === lineup._id);
    return index + 1;
  }


  useEffect(() => {
    async function load() {
      const userLineups = await getUserLineups();

      await computeAllScores(userLineups);

      const updatedLineups = await getUserLineups();
      setLineups(updatedLineups);

      computeStats(updatedLineups);
    }

    if (user) load();
  }, [user]);

  async function computeStats(lineups) {
    if (!lineups.length) {
      setStats({
        tournamentsPlayed: 0,
        bestScore: null,
        bestFinishTournament: null,
        bestFinishPlace: null,
      });
      return;
    }

    const tournamentsPlayed = lineups.length;

    // Best score = lowest totalScore
    const bestLineup = lineups.reduce((best, l) =>
      (l.totalScore ?? 9999) < (best.totalScore ?? 9999) ? l : best
    );

    const bestScore = bestLineup.totalScore ?? null;
    const bestFinishTournament = bestLineup.tournament?.name ?? null;

    // NEW: compute best finish place
    const bestFinishPlace = await getFinishPosition(bestLineup);

    setStats({
      tournamentsPlayed,
      bestScore,
      bestFinishTournament,
      bestFinishPlace,
    });
  }


  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.headerSection}>
        <img src={user.imgUrl} alt={user.name} className={styles.avatar} />
        <div>
          <h1 className={styles.name}>{user.name}</h1>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>

      <div className={styles.statsSection}>
        <h2>Your Stats</h2>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>{stats.tournamentsPlayed}</h3>
            <p>Tournaments Played</p>
          </div>

          <div className={styles.statCard}>
            <h3>{stats.bestScore ?? "-"}</h3>
            <p>Best Score</p>
          </div>

          <div className={styles.statCard}>
            <h3>{stats.bestFinishPlace || "-"}</h3>
            <p>Best Finish (Place)</p>
          </div>
        </div>
      </div>

      <div className={styles.historySection}>
        <h2>Lineup History</h2>

        {lineups.length === 0 ? (
          <p>You have not played any tournaments yet.</p>
        ) : (
          <ul className={styles.historyList}>
            {lineups.map(l => (
              <li key={l._id} className={styles.historyItem}>
                <div>
                  <strong>{l.tournament.name}</strong>
                  <p>Score: {l.totalScore ?? 0}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
}


