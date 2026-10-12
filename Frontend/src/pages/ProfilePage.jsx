import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserLineups } from "../services/lineupService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { user } = useAuth();
  const [lineups, setLineups] = useState([]);
  const [stats, setStats] = useState({
    tournamentsPlayed: 0,
    bestFinish: null,
    averageScore: null,
  });

  useEffect(() => {
    async function load() {
      const userLineups = await getUserLineups();
      setLineups(userLineups);

      computeStats(userLineups);
    }

    if (user) load();
  }, [user]);

  function computeStats(lineups) {
    if (!lineups.length) {
      setStats({
        tournamentsPlayed: 0,
        bestFinish: null,
        averageScore: null,
      });
      return;
    }

    const tournamentsPlayed = lineups.length;

    // Best finish = highest score
    const bestFinish = lineups.reduce((best, l) =>
      (l.score ?? 0) > (best.score ?? 0) ? l : best
    );

    // Average score
    const averageScore =
      lineups.reduce((sum, l) => sum + (l.score ?? 0), 0) / lineups.length;

    setStats({
      tournamentsPlayed,
      bestFinish,
      averageScore: averageScore.toFixed(1),
    });
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.headerSection}>
        <img
          src={user.imgUrl}
          alt={user.name}
          className={styles.avatar}
        />

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
            <h3>{stats.bestFinish ? stats.bestFinish.score : "-"}</h3>
            <p>Best Score</p>
          </div>

          <div className={styles.statCard}>
            <h3>{stats.averageScore || "-"}</h3>
            <p>Average Score</p>
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
                  <p>Score: {l.score ?? 0}</p>
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
