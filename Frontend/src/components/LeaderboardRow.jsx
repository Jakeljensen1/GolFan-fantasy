import styles from "./LeaderboardRow.module.css";

export default function LeaderboardRow({ lineup, rank, onSelect }) {
  return (
    <div className={styles.row} onClick={onSelect}>

      {/* Ranking */}
      <div className={styles.rank}>
        {rank}
      </div>

      {/* User image*/}
      <img
        src={lineup.user.imgUrl}
        alt={lineup.user.name}
        className={styles.avatar}
      />

      {/* User info */}
      <div className={styles.info}>
        <h4 className={styles.name}>{lineup.user.name}</h4>
        <p className={styles.score}>Score: {lineup.score ?? 0}</p>
      </div>
    </div>
  );
}

