import PlayerCard from "./PlayerCard";
import styles from "./UserLineup.module.css";

export default function UserLineup({ lineup, onClose }) {
  if (!lineup) return null;

  return (
    <div className={styles.wrapper}>
      <p className={styles.tournamentName}>
        Tournament: {lineup.tournament.name}
      </p>

      <div className={styles.playersGrid}>
        {lineup.entries.map(entry => (
          <PlayerCard
            key={entry._id}
            player={entry.golferId}
          />
        ))}
      </div>
    </div>
  );
}


