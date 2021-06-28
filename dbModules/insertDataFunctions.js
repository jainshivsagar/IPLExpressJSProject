const format = require("pg-format");

async function insertTeamData(teamArray, client) {
  const values = [];
  for (let team of teamArray) {
    values.push([team]);
  }
  let insertQuery = format("INSERT INTO teams_tbl(name) VALUES %L", values);

  return client.query(insertQuery);
}

async function insertCityData(cityArray, client) {
  const values = [];
  for (let city of cityArray) {
    values.push([city]);
  }
  let insertQuery = format("INSERT INTO city_tbl(name) VALUES %L", values);

  return client.query(insertQuery);
}

async function insertVenueData(venuesObject, client) {
  const values = [];

  for (let [venue, city] of Object.entries(venuesObject)) {
    values.push([venue, city + 1]);
  }

  const insertQuery = format(
    "INSERT INTO venue_tbl(name,city_id) VALUES %L",
    values
  );
  return client.query(insertQuery);
}

async function insertSeasonData(seasonArray, client) {
  const values = [];
  for (let season of seasonArray) {
    values.push([season]);
  }
  let insertQuery = format("INSERT INTO season_tbl(season) VALUES %L", values);

  return client.query(insertQuery);
}

async function insertUmpireData(umpireArray, client) {
  const values = [];
  for (let umpire of umpireArray) {
    values.push([umpire]);
  }
  let insertQuery = format("INSERT INTO umpire_tbl(name) VALUES %L", values);

  return client.query(insertQuery);
}

async function insertPlayerData(playerArray, client) {
  const values = [];

  for (let player of playerArray) {
    values.push([player]);
  }

  let insertQuery = format("INSERT INTO player_tbl(name) VALUES %L", values);

  return client.query(insertQuery);
}

async function insertMatchData(entitiesObject, matchesArray, client) {
  const cities = entitiesObject.cities;
  const seasons = entitiesObject.seasons;
  const teams = entitiesObject.teams;
  const venues = entitiesObject.venues;
  const umpires = entitiesObject.umpires;
  const players = entitiesObject.players;

  const values = [];

  for (let match of matchesArray) {
    values.push([
      match.id,
      seasons.indexOf(match.season) + 1,
      cities.indexOf(match.city) + 1,
      match.date,
      teams.indexOf(match.team1) + 1,
      teams.indexOf(match.team2) + 1,
      teams.indexOf(match.toss_winner) + 1,
      match.toss_decision,
      match.result,
      match.dl_applied,
      teams.indexOf(match.winner) + 1,
      match.win_by_runs,
      match.win_by_wickets,
      players.indexOf(match.player_of_match) + 1,
      venues[match.venue] + 1,
      umpires.indexOf(match.umpire1) + 1,
      umpires.indexOf(match.umpire2) + 1,
      umpires.indexOf(match.umpire3) + 1,
    ]);
  }

  const insertQuery = format(
    `INSERT INTO public.matches_tbl(
    id, season, city, date, team1, team2, toss_winner, toss_decision, result, dl_applied, winner, 
    win_by_runs, win_by_wickets, man_of_the_match, venue, umpire1, umpire2, umpire3)
    VALUES %L`,
    values
  );
  return client.query(insertQuery);
}

async function insertDeliveryData(
  deliveriesArray,
  ObjectOfTeamAndPlayersArrays,
  client
) {
  const values = [];
  const teams = ObjectOfTeamAndPlayersArrays.teams;
  const players = ObjectOfTeamAndPlayersArrays.players;

  for (let delivery of deliveriesArray) {
    values.push([
      delivery.match_id,
      delivery.inning,
      teams.indexOf(delivery.batting_team) + 1,
      teams.indexOf(delivery.bowling_team) + 1,
      delivery.over,
      delivery.ball,
      players.indexOf(delivery.batsman) + 1,
      players.indexOf(delivery.non_striker) + 1,
      players.indexOf(delivery.bowler) + 1,
      delivery.is_super_over,
      delivery.wide_runs,
      delivery.bye_runs,
      delivery.legbye_runs,
      delivery.noball_runs,
      delivery.penalty_runs,
      delivery.batsman_runs,
      delivery.extra_runs,
      delivery.total_runs,
      players.indexOf(delivery.player_dismissed) + 1,
      delivery.dismissal_kind,
      players.indexOf(delivery.fielder) + 1,
    ]);
  }
  const insertQuery = format(
    `INSERT INTO public.deliveries_tbl(
    match_id, inning, bating_team, bowling_team, over, ball, batsman, non_strick, bowler, is_supper_over, wide_runs, bye_runs,
    leg_by_runs, noball_runs, penalty_runs, batsman_runs, extra_runs, total_runs, player_dismissed, dismissal_kind, fielder)
    VALUES %L`,
    values
  );

  return client.query(insertQuery);
}
module.exports = {
  insertTeamData,
  insertCityData,
  insertVenueData,
  insertSeasonData,
  insertUmpireData,
  insertPlayerData,
  insertMatchData,
  insertDeliveryData,
};
