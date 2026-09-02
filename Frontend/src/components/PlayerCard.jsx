// src/components/PlayerCard.jsx
import styles from "./PlayerCard.module.css";

export default function PlayerCard({ player, onClick, selected }) {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <img
        src={player.imageUrl}
        alt={player.name}
        className={styles.headshot}
      />

      <div className={styles.info}>
        <h3 className={styles.name}>{player.name}</h3>
        <p className={styles.country}>{player.countryCode}</p>
        <p className={styles.owgr}>OWGR: {player.worldRanking}</p>
      </div>
    </div>
  );
}

