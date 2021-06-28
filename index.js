const { dbConnection } = require("./dbModules/dbConnection");
const { insertDataIntoDB } = require("./insertDataIntoDB");
const { getDataFromCsvFile } = require("./utilites/utilitiFunctions");
const { createTables, dropAllTables } = require("./dbModules/ddlSqlFunctions");
const {
  MATCHES_CSV_FILE,
  DELIVERIES_CSV_FILE,
} = require("./utilites/constants");
const {
  getMatchesPlayedPerYear,
  getMatchesWonPerTeamPerYear,
  getExtraRunsConcededPerTeam,
  getTopTenEconomicalBowlers,
} = require("./iplStatistics");

async function startIPL() {
  const promises = Promise.all([
    getDataFromCsvFile(MATCHES_CSV_FILE),
    getDataFromCsvFile(DELIVERIES_CSV_FILE),
  ]);

  let matches;
  let deliveries;

  promises
    .then((values) => {
      matches = values[0];
      deliveries = values[1];
      return dbConnection.connect();
    })
    .then(async (client) => {
      await createTables(client);

      await insertDataIntoDB(matches, deliveries, client);

      const matchesPlayedPerYearResult = await getMatchesPlayedPerYear(client);
      console.log("\nMatches Played Per Yer Table");
      console.table(matchesPlayedPerYearResult.rows);

      const matchesWonPerTeamPerYearResult = await getMatchesWonPerTeamPerYear(
        client
      );
      console.log("\nMatches Won Per Team Per Year Table");
      console.table(matchesWonPerTeamPerYearResult.rows);

      const extraRunsConcedePerTeamResult = await getExtraRunsConcededPerTeam(
        2016,
        client
      );
      console.log("\nExtra Runs Conceded By Teams in Year 2016 Table");

      console.table(extraRunsConcedePerTeamResult.rows);

      const topTenEconomicalBowlerResult = await getTopTenEconomicalBowlers(
        2015,
        client
      );
      console.log("\nTop Ten Economical Bowlers Of Year 2015 Table");
      console.table(topTenEconomicalBowlerResult.rows);

      await dropAllTables(client);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      dbConnection.end();

      console.log("DB Connection Ended...");
      process.exit();
    });
}

startIPL();
