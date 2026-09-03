// Ingestion service must match the corresponding Mongoose schemas
module.exports = {
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
  }
};
