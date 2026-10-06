import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { getUserLineups } from "../services/lineupService";
import { getTournaments } from "../services/tournamentService";
import TournamentCard from "../components/TournamentCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../App.module.css"

export default function DashboardPage() {
  const { user } = useAuth();
  const [lineups, setLineups] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    async function load() {

      const l = await getUserLineups();
      setLineups(l);

      const t = await getTournaments();
      setTournaments(t);
    }

    load();
  }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="page">
      <Header />
      <div className={styles.header}>
        <h1 className={styles.title}>Home</h1>
      </div>

      <div className="section">
        <h2>Your Lineups</h2>
        <div className={styles.grid}>
          {lineups.map(l => (
            <Link
              key={l._id}
              to={`/tournament/${l.tournament._id}/leaderboard`}
              className={styles.cardLink}
            >
              <div className="card">
                <p>{l.tournament.name}</p>
              </div>
            </Link>
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
      <Footer />
    </div>
  );
}


