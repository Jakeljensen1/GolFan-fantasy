import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLoggedInUser } from "../services/authService";
import { getUserLineups } from "../services/lineupService";
import { getTournaments } from "../services/tournamentService";
import TournamentCard from "../components/TournamentCard";

import styles from "../App.module.css"

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [lineups, setLineups] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    async function load() {
      const u = await getLoggedInUser();
      setUser(u);

      const l = await getUserLineups();
      setLineups(l);

      const t = await getTournaments();
      setTournaments(t);
    }

    load();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="page">
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
      </div>

      <div className="section">
        <h2>Your Lineups</h2>
        <div className={styles.grid}>
          {lineups.map(l => (
            <div key={l._id} className="card">
              <p>{l.tournament.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Tournaments</h2>
        <div className={styles.grid}>
          {tournaments.map(t => (
            <TournamentCard key={t._id} tournament={t} />
          ))}
        </div>
      </div>
    </div>
  );
}


