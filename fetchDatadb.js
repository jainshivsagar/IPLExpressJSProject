const { Pool } = require("pg");

const dbConnection = new Pool({
  user: "postgres",
  host: "localhost",
  database: "example",
  password: "root",
  port: 5432,
});
dbConnection.query(
  'select season, count(id) as "No. Of Matches" from matches group by season order by season',
  (error, response) => {
    console.table(error ? error.stack : response.rows);
    dbConnection.end();
  }
);
