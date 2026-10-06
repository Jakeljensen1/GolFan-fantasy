export default function LeaderboardRow({ lineup }) {
  return (
    <div className="card">
      <h4>{lineup.user.username}</h4>
      <p>Score: {lineup.score ?? 0}</p>

      <ul>
        {lineup.entries.map(e => (
          <li key={e._id}>{e.golferId.name}</li>
        ))}
      </ul>
    </div>
  );
}
