// Ingestion service must match the corresponding Mongoose schemas
module.exports = {

  //ESPN mappers
  mapPlayer(p) {
    return {
      externalId: p.id,
      name: p.displayName,
      firstName: p.firstName,
      lastName: p.lastName,
      country: p.birthPlace?.country ?? "Unknown",
      countryCode: null, // ESPN does not provide this
      worldRanking: p.rank ?? null,
      imageUrl: p.headshot?.href ?? null,
      active: true,
      tours: ["PGA"]
    }
  },

  mapTournament(t) {
    const comp = t.competitions?.[0];

    return {
      externalId: t.id,
      name: t.name,
      tour: "PGA",
      course: comp?.venue?.fullName ?? "Unknown Course",
      location: comp?.venue?.address?.city ?? "Unknown Location",
      startDate: t.startDate ? new Date(t.startDate) : null,
      endDate: t.endDate ? new Date(t.endDate) : null,
      status: t.status?.type?.name ?? "unknown",
      purse: t.purse ?? null
    };
  },

  mapTournamentEntry(competitor, tournamentId, golferId) {
    const ls = competitor.linescores?.[0];

    return {
      tournamentId,
      golferId,
      status: competitor.status?.name ?? "active",
      teeTime: competitor.teeTime ? new Date(competitor.teeTime) : null,
      position: competitor.position ?? null,
      round: ls?.period ?? null,
      score: ls?.value ?? null,
      totalToPar: competitor.relativeScore ?? null,
      madeCut: competitor.cut ?? false
    };
  },

  mapTournamentResult(leader, tournamentId, golferId) {
    return {
      tournamentId,
      golferId,
      finalPosition: leader.position ?? null,
      totalScore: leader.score ?? null,
      totalToPar: leader.relativeScore ?? null,
      earnings: leader.earnings ?? null
    };
  },

  //GolfData Mappers
  mapGolfDataPlayer(p) {
    return {
      externalId: p.id,
      name: p.fullName,
      firstName: p.fullName?.split(" ")[0] ?? null,
      lastName: p.fullName?.split(" ").slice(1).join(" ") ?? null,
      nationality: p.country ?? null,
      headshot: p.imageUrl ?? null,
      dateOfBirth: p.dateOfBirth ?? null,
      biography: p.biography ?? null,
    };
  },


  mapGolfDataTournament(t) {
    return {
      externalId: t.id,
      name: t.name,
      tour: t.tour ?? "PGA",
      course: t.courseId ?? "Unknown Course",
      location: t.location ?? "Unknown Location",
      startDate: t.startDate ? new Date(t.startDate) : null,
      endDate: t.endDate ? new Date(t.endDate) : null,
      status: t.status ?? "unknown",
      purse: t.purseAmount ?? null,
    };
  },

  mapGolfDataTournamentEntry(f, tournamentId, golferId) {
    return {
      tournamentId,
      golferId,

      // Field data
      status: f.removedAt ? "withdrawn" : "active",
      isAlternate: f.isAlternate ?? false,
      isAmateur: f.isAmateur ?? false,

      // Tee time info (published later)
      teeTime: f.scheduledAt ?? null,
      localTime: f.localTime ?? null,
      startHole: f.startHole ?? null,

      // Ranking
      dataGolfRank: f.dataGolfRank ?? null,
      owgrRank: f.owgrRank ?? null,

      // Scoring fields intentionally left null
      position: null,
      round: null,
      score: null,
      totalToPar: null,
      madeCut: null,
    };
  },

  mapGolfDataTournamentResult(row, tournamentId, golferId) {
    return {
      tournamentId,
      golferId,

      // Leaderboard fields
      position: row.position ?? null,
      positionText: row.positionText ?? null,
      totalToPar: row.totalToPar ?? null,
      totalStrokes: row.totalStrokes ?? null,
      todayToPar: row.todayToPar ?? null,
      thruHole: row.thruHole ?? null,
      currentRound: row.currentRound ?? null,
      status: row.status ?? null,

      // Round-by-round scoring
      roundStrokes: row.roundStrokes ?? [],

      // Earnings not provided by GolfData leaderboard
      earnings: null,
    };
  }
};
