import { useEffect, useState } from "react";
import { getTournamentById, getTournamentField } from "../services/tournamentService";
import { useParams, useNavigate } from "react-router-dom";
import PlayerCard from "../components/PlayerCard";
import TournamentCard from "../components/TournamentCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../App.module.css";
import Leaderboard from "../components/Leaderboard";


export default function TournamentPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [field, setField] = useState([]);

  useEffect(() => {
    async function load() {
      const [t, f] = await Promise.all([
        getTournamentById(id),
        getTournamentField(id)
      ]);

      setTournament(t);
      setField(f);
    }

    load();
  }, [id]);


  if (!tournament) return <p>Loading...</p>;

  return (
    <div className="page">
      <Header />
      {/* <h1 className={styles.title}>{tournament.name}</h1> */}
      <TournamentCard tournament={tournament} />

      {tournament.status === "Scheduled" && (
        <div>
          <h2>Field</h2>
          <button onClick={() => navigate(`/tournament/${id}/build`)}>
            Build Lineup
          </button>
        </div>
      )}

      {tournament.status === "Completed" && (
        <Leaderboard tournamentId={id} />
      )}

      <div className="section">
        {field.length === 0 ? (
          <p className={styles.noField}>Field has not been released.</p>
        ) : (
          <div className={styles.grid}>
            {field.map(entry => (
              <PlayerCard
                key={entry._id}
                player={entry.golferId}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div >
  );
}

