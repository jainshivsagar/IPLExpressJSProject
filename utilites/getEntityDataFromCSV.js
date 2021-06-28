module.exports = {
  getEntityArray(matchArray) {
    city = [];
    season = [];
    teams = [];
    venue = [];
    umpires = [];
    for (let match of matchArray) {
      if (!city.include(match.city)) {
        city.push(match.city);
      }

      if (!season.include(match.season)) {
        season.push(match.season);
      }

      if (!teams.include(match.team1)) {
        teams.push(match.team1);
      }

      if (!teams.include(match.team2)) {
        teams.push(match.team2);
      }

      if (!venue.include(match.venue)) {
        venue.push(match.venue);
      }

      if (match.umpire1 && !umpires.include(match.umpire1)) {
        umpires.push(match.umpire1);
      }

      if (match.umpire2 && !umpires.include(match.umpire2)) {
        umpires.push(match.umpire2);
      }

      if (match.umpire3 && !umpires.include(match.umpire3)) {
        umpires.push(match.umpire3);
      }
    }

    return [city, season, teams, venue, umpires];
  },
};
