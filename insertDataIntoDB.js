const {
  insertCityData,
  insertVenueData,
  insertSeasonData,
  insertTeamData,
  insertPlayerData,
  insertUmpireData,
  insertMatchData,
  insertDeliveryData,
} = require("./dbModules/insertDataFunctions");

const {
  getObjectOfEntityArrays,
  getPlayersArray,
} = require("./utilites/utilitiFunctions");

async function insertDataIntoDB(matchesArray, deliveriesArray, client) {
  const entities = getObjectOfEntityArrays(matchesArray);
  const cities = entities.cities;
  const seasons = entities.seasons;
  const teams = entities.teams;
  const venues = entities.venues;
  const umpires = entities.umpires;
  const players = getPlayersArray(deliveriesArray);
  entities.players = players;

  await insertCityData(cities, client);
  console.log("City Data Inserted Successfully");

  await insertVenueData(venues, client);
  await insertSeasonData(seasons, client);
  console.log("Season Data Inserted Successfully");

  await insertTeamData(teams, client);
  console.log("Team Data Inserted Successfully");

  await insertUmpireData(umpires, client);
  console.log("Umpire Data Inserted Successfully");

  await insertPlayerData(players, client);
  console.log("Player Data Inserted Successfully");

  await insertMatchData(entities, matchesArray, client);
  console.log("Matches Data Inserted Successfully");

  await insertDeliveryData(
    deliveriesArray,
    { teams: teams, players: players },
    client
  );
  console.log("Deliveries Data Inserted Successfully");
}

module.exports = {
  insertDataIntoDB,
};
