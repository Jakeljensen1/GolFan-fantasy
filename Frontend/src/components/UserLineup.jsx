import PlayerCard from "./PlayerCard";
import styles from "./UserLineup.module.css";

export default function UserLineup({ lineup, onClose }) {
  if (!lineup) return null;

  const { tournament, golfers, user, totalScore } = lineup;

  return (
    <div className={styles.wrapper}>
      <p className={styles.tournamentName}>
        Tournament: {lineup.tournament.name}
      </p>

      <div className={styles.playersGrid}>
        {lineup.golfers.map(golfer => (
          <PlayerCard
            key={golfer._id}
            player={golfer}
          />
        ))}
      </div>
    </div>
  );
}
