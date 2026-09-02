import { useEffect, useState } from "react";
import { getTournamentField } from "../services/tournamentService";
import { createLineup } from "../services/lineupService";
import { useParams, useNavigate } from "react-router-dom";
import PlayerCard from "../components/PlayerCard";
import styles from "../App.module.css";

export default function LineupBuilderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [field, setField] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function load() {
      const f = await getTournamentField(id);
      setField(f);
    }
    load();
  }, [id]);

  function toggle(entryId) {
    if (selected.includes(entryId)) {
      setSelected(selected.filter(s => s !== entryId));
    } else if (selected.length < 4) {
      setSelected([...selected, entryId]);
    }
  }

  async function submit() {
    console.log("Submitting:", {
      tournamentId: id,
      entryIds: selected
    });


    const lineup = await createLineup(id, selected);
    navigate(`/lineup/${lineup._id}`);
  }

  return (
    <div className="page">
      <h1 className={styles.title}>Select 4 Golfers</h1>

      <div className={styles.grid}>
        {field.map(entry => (
          <PlayerCard
            key={entry._id}
            player={entry.golferId}
            selected={selected.includes(entry._id)}
            onClick={() => toggle(entry._id)}
          />
        ))}
      </div>

      <button disabled={selected.length !== 4} onClick={submit}>
        Submit Lineup ({selected.length}/4)
      </button>
    </div>
  );
}



