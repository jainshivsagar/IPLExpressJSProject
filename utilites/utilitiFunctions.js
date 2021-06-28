const csvParser = require("csvtojson");
const fs = require("fs");

module.exports = {
  getDataFromCsvFile: function (filePath) {
    return csvParser()
      .fromFile(filePath)
      .then((data) => data);
  },
  getObjectOfEntityArrays(matchArray) {
    const cities = [];
    const seasons = [];
    const teams = [];
    const venues = {};
    const umpires = [];
    for (let match of matchArray) {
      if (!cities.includes(match.city)) {
        cities.push(match.city);
      }

      if (!seasons.includes(match.season)) {
        seasons.push(match.season);
      }

      if (!teams.includes(match.team1)) {
        teams.push(match.team1);
      }

      if (!teams.includes(match.team2)) {
        teams.push(match.team2);
      }

      if (!teams.includes(match.winner)) {
        teams.push(match.winner);
      }

      if (!venues.hasOwnProperty(match.venue)) {
        //Storing Venue & City As Key/Value Pair
        venues[match.venue] = cities.indexOf(match.city);
      }

      if (!umpires.includes(match.umpire1)) {
        umpires.push(match.umpire1);
      }

      if (!umpires.includes(match.umpire2)) {
        umpires.push(match.umpire2);
      }

      if (!umpires.includes(match.umpire3)) {
        umpires.push(match.umpire3);
      }
    }

    return { cities, seasons, teams, venues, umpires };
  },
  getPlayersArray(deliveries) {
    const players = [];

    for (let delivery of deliveries) {
      if (!players.includes(delivery.batsman)) {
        players.push(delivery.batsman);
      }

      if (!players.includes(delivery.non_striker)) {
        players.push(delivery.non_striker);
      }

      if (!players.includes(delivery.bowler)) {
        players.push(delivery.bowler);
      }

      if (!players.includes(delivery.player_dismissed)) {
        players.push(delivery.player_dismissed);
      }
      if (!players.includes(delivery.fielder)) {
        players.push(delivery.fielder);
      }
    }
    return players;
  },
};
