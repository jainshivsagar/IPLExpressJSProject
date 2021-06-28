const {
  CREATE_SEASON_TBL_QUERY,
  CREATE_CITY_TBL_QUERY,
  CREATE_VENUE_TBL_QUERY,
  CREATE_PLAYER_TBL_QUERY,
  CREATE_TEAM_TBL_QUERY,
  CREATE_UMPIRE_TBL_QUERY,
  CREATE_MATCHES_TBL_QUERY,
  CREATE_DELIVERIES_TBL_QUERY,
  DROP_TABLES_QUERY,
} = require("./ddlQueryConstants");

async function createTables(client) {
  await client.query(CREATE_SEASON_TBL_QUERY);

  await client.query(CREATE_CITY_TBL_QUERY);

  await client.query(CREATE_VENUE_TBL_QUERY);

  await client.query(CREATE_PLAYER_TBL_QUERY);

  await client.query(CREATE_TEAM_TBL_QUERY);

  await client.query(CREATE_UMPIRE_TBL_QUERY);

  await client.query(CREATE_MATCHES_TBL_QUERY);

  await client.query(CREATE_DELIVERIES_TBL_QUERY);
}

async function dropAllTables(client) {
  await client.query(DROP_TABLES_QUERY);
}

module.exports = {
  createTables,
  dropAllTables,
};
