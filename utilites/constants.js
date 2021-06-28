const path = require("path");
module.exports = {
  DB_USER: "postgres",
  DB_HOST: "localhost",
  DB_NAME: "IPL",
  DB_PASSWORD: "root",
  DB_PORT: 5432,

  MATCHES_CSV_FILE: path.join(__dirname, "../data/matches.csv"),
  DELIVERIES_CSV_FILE: path.join(__dirname, "../data/deliveries.csv"),
};
