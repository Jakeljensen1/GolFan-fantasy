export default function UserLineup({ lineup }) {
  if (!lineup) return null;

  return (
    <div className="card">
      <h3>Your Lineup</h3>
      <p>Tournament: {lineup.tournament.name}</p>

      <ul>
        {lineup.entries.map(e => (
          <li key={e._id}>
            {e.golferId.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
