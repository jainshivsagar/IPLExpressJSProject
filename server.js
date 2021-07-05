const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const { dbConnection } = require("./dbModules/dbConnection");
const {
  getMatchesPlayedPerYear,
  getMatchesWonPerTeamPerYear,
  getExtraRunsConcededPerTeam,
  getTopTenEconomicalBowlers,
} = require("./iplStatistics");
const { cli } = require("winston/lib/winston/config");
let client = null;
const app = express();

//Handlebars Middleware
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname + "/views/layouts/"),
  })
);
//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use("/views", express.static("views"));

app.get("/", async (req, res) => {
  try {
    let matchesPlayedPerYear = await getMatchesPlayedPerYear(client);
    let matchesWonPerYear = await getMatchesWonPerTeamPerYear(client);
    let extraRunsConcede = await getExtraRunsConcededPerTeam(2016, client);
    let topTenEconomicalPlayers = await getTopTenEconomicalBowlers(
      2015,
      client
    );

    matchesPlayedPerYear = matchesPlayedPerYear.rows;
    matchesWonPerYear = matchesWonPerYear.rows;
    extraRunsConcede = extraRunsConcede.rows;
    topTenEconomicalPlayers = topTenEconomicalPlayers.rows;

    //format the matchesWonPerYear array
    let formattedObject = {};
    let seasonArray = [];

    matchesWonPerYear.forEach((temp) => {
      if (!seasonArray.includes(temp.Season)) {
        seasonArray.push(temp.Season);
      }
    });

    seasonArray.forEach((season) => {
      formattedObject[season] = matchesWonPerYear.filter(
        (matches) => matches.Season === season
      );
    });

    for (let seasonP in formattedObject) {
      formattedObject[seasonP].map((row) => delete row.Season);
    }

    matchesWonPerYear = formattedObject;

    res.render("index", {
      matchesPlayedPerYear,
      matchesWonPerYear,
      extraRunsConcede,
      topTenEconomicalPlayers,
    });
  } catch (error) {
    res.status(500).send("<h1>Error 500. Internal Server Error.</h1>");
    console.log(error);
  } finally {
  }
});

app.get("/charts", (req, res) => {
  res.render("charts");
});

app.get("/matches-played-perYear", async (req, res) => {
  let matchesPlayedPerYear = await getMatchesPlayedPerYear(client);
  matchesPlayedPerYear = matchesPlayedPerYear.rows;

  res.status(200).json(matchesPlayedPerYear);
});

app.get("/matches-won-per-year", async (req, res) => {
  let matchesWonPerYear = await getMatchesWonPerTeamPerYear(client);
  matchesWonPerYear = matchesWonPerYear.rows;
  //format the matchesWonPerYear array
  let formattedObject = {};
  let seasonArray = [];

  matchesWonPerYear.forEach((temp) => {
    if (!seasonArray.includes(temp.Season)) {
      seasonArray.push(temp.Season);
    }
  });

  seasonArray.forEach((season) => {
    formattedObject[season] = matchesWonPerYear.filter(
      (matches) => matches.Season === season
    );
  });

  for (let seasonP in formattedObject) {
    formattedObject[seasonP].map((row) => delete row.Season);
  }

  matchesWonPerYear = formattedObject;

  res.status(200).json(matchesWonPerYear);
});

app.get("/extra-runs-concede-per-team", async (req, res) => {
  let extraRunsConcede = await getExtraRunsConcededPerTeam(2016, client);
  extraRunsConcede = extraRunsConcede.rows;

  res.status(200).json(extraRunsConcede);
});

app.get("/top-ten-economical-bowlers", async (req, res) => {
  let topTenEconomicalPlayers = await getTopTenEconomicalBowlers(2015, client);
  topTenEconomicalPlayers = topTenEconomicalPlayers.rows;

  res.status(200).json(topTenEconomicalPlayers);
});

app.listen(5000, async () => {
  console.log("Server Started...");
  client = await dbConnection.connect();
  console.log("DB Connection Started...");
});
