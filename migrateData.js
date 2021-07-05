const { dbConnection } = require("./dbModules/dbConnection");
const { insertDataIntoDB } = require("./insertDataIntoDB");
const { getDataFromCsvFile } = require("./utilites/utilitiFunctions");
const { createTables, dropAllTables } = require("./dbModules/ddlSqlFunctions");
const {
  MATCHES_CSV_FILE,
  DELIVERIES_CSV_FILE,
} = require("./utilites/constants");

(async function startIPL() {
  console.time("shiv");
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
      await dropAllTables(client);

      await createTables(client);

      await insertDataIntoDB(matches, deliveries, client);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      dbConnection.end();

      console.log("DB Connection Ended...");
      console.timeEnd("shiv");
      process.exit();
    });
})();
