import { useEffect, useState } from "react";
import { getLineup } from "../services/lineupService";
import { useParams } from "react-router-dom";

export default function LineupPage() {
  const { id } = useParams();
  const [lineup, setLineup] = useState(null);

  useEffect(() => {
    async function load() {
      const l = await getLineup(id);
      setLineup(l);
    }
    load();
  }, [id]);

  if (!lineup) return <p>Loading...</p>;

  return (
    <div className="page">
      <h1 className={styles.title}>{lineup.tournament.name}</h1>

      <div className="section">
        <h2>Your Golfers</h2>
        <div className={styles.grid}>
          {lineup.entries.map(entry => (
            <PlayerCard
              key={entry._id}
              player={entry.golferId}
            />
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Total Score</h2>
        <p className="card">{lineup.totalScore ?? "Not scored yet"}</p>
      </div>
    </div>
  );
}


