import { useEffect, useState } from "react";
import { getTournamentById, getTournamentField } from "../services/tournamentService";
import { useParams, useNavigate } from "react-router-dom";
import PlayerCard from "../components/PlayerCard";

import styles from "../App.module.css";
import TournamentCard from "../components/TournamentCard";

export default function TournamentPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [field, setField] = useState([]);

  useEffect(() => {
    async function load() {
      const t = await getTournamentById(id);
      setTournament(t);

      const f = await getTournamentField(id);
      setField(f);
    }

    load();
  }, [id]);

  if (!tournament) return <p>Loading...</p>;

  return (
    <div className="page">
      <h1 className={styles.title}>{tournament.name}</h1>

      <button onClick={() => navigate(`/tournament/${id}/build`)}>
        Build Lineup
      </button>

      <div className="section">
        <h2>Field</h2>
        <div className={styles.grid}>
          {field.map(entry => (
            <PlayerCard
              key={entry._id}
              player={entry.golferId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

