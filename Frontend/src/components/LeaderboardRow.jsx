import { useState } from "react";
import styles from "./LeaderboardRow.module.css";

export default function LeaderboardRow({ lineup, rank }) {
  const [open, setOpen] = useState(false);

  const user = lineup.user;
  const totalScore = lineup.totalScore ?? 0;

  return (
    <div className={styles.wrapper}>
      {/* Main row */}
      <div
        className={`${styles.row} ${open ? styles.selectedRow : ""}`}
        onClick={() => setOpen(prev => !prev)}
      >
        <div className={styles.rank}>{rank}</div>

        <img
          src={user?.imgUrl || "/default-avatar.png"}
          alt={user?.name}
          className={styles.avatar}
        />

        <div className={styles.name}>{user?.name}</div>

        <div className={styles.score}>{totalScore}</div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className={styles.dropdown}>
          {lineup.golfers.map(golfer => (
            <div key={golfer._id} className={styles.golferRow}>
              <img
                src={golfer.imageUrl}
                alt={golfer.name}
                className={styles.golferAvatar}
              />
              <span className={styles.golferName}>{golfer.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}






