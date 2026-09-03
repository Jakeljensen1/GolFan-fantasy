// Espn script sync
const syncGolfers = require("../services/sync/golferSync");
const syncTournaments = require("../services/sync/tournamentSync");

(async () => {
  await syncGolfers();
  await syncTournaments();
  process.exit(0);
})();
