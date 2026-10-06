import { useEffect, useState } from "react";
import { getTournamentResults } from "../services/tournamentService";
import styles from "./Leaderboard.module.css";

export default function Leaderboard({ tournamentId }) {
  //console.log('leaderboard render: tourneyid:', tournamentId);
  const [entries, setResults] = useState(null);

  useEffect(() => {
    //console.log("Leaderboard useEffect fired with:", tournamentId);
    if (!tournamentId) return;
    async function load() {
      //console.log("Calling getTournamentResults for:", tournamentId);
      const data = await getTournamentResults(tournamentId);
      //console.log("Results received:", data?.length);
      setResults(data);
    }
    load();
  }, [tournamentId]);

  if (!entries)
    return <p className={styles.leaderboardLoading}>Loading leaderboard...</p>;

  if (entries.length === 0)
    return <p className={styles.leaderboardEmpty}>No leaderboard available.</p>;

  return (
    <div className={styles.leaderboardContainer}>
      <h2 className={styles.leaderboardTitle}>Leaderboard</h2>

      <table className={styles.leaderboardTable}>
        <thead>
          <tr className={styles.leaderboardHeaderRow}>
            <th className={styles.leaderboardHeaderCell}>Pos</th>
            <th className={styles.leaderboardHeaderCell}>Golfer</th>
            <th className={styles.leaderboardHeaderCell}>To Par</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((e) => (
            <tr key={e._id} className={styles.leaderboardRow}>
              <td className={styles.leaderboardPos}>{e.finalPosition ?? "-"}</td>
              <td className={styles.leaderboardName}><img
                src={e.golferId?.imageUrl}
                alt={e.golferId?.name}
                className={styles.headshotSmall}
              />
                <span>{e.golferId?.name}</span></td>
              <td className={styles.leaderboardScore}>{e.totalToPar ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



