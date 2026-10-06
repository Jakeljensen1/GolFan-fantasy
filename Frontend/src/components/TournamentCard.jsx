import { Link } from "react-router-dom";
import styles from "./TournamentCard.module.css";

export default function TournamentCard({ tournament }) {
  return (
    <Link to={`/tournament/${tournament._id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <h3 className={styles.name}>{tournament.name}</h3>
        <p className={styles.startData}>{
          new Date(tournament.startDate).toDateString()
        }</p>
        <p style={{ color: tournament.status === "Completed" ? "green" : "black" }}>
          {tournament.status}
        </p>

      </div>
    </Link>
  );
}
