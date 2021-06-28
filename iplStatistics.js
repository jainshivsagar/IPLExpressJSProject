const format = require("pg-format");

async function getMatchesPlayedPerYear(client) {
  const selectQuery = `SELECT s.season AS "Season", COUNT(m.id) AS "No. Of Matches Played" FROM season_tbl AS s 
                       INNER JOIN matches_tbl AS m 
                       ON s.id = m.season
                       GROUP BY s.season ORDER BY s.season`;
  return client.query(selectQuery);
}

async function getMatchesWonPerTeamPerYear(client) {
  const selectQuery = `SELECT s.season as "Season", t.name AS "Team", COUNT(m.winner) AS "No. Of Matches Won" FROM teams_tbl AS t 
                       INNER JOIN matches_tbl AS m ON t.id=m.winner 
                       INNER JOIN season_tbl AS s on m.season=s.id 
                       GROUP BY s.season, t.name 
                       ORDER BY t.name`;
  return client.query(selectQuery);
}

async function getExtraRunsConcededPerTeam(season, client) {
  const selectQuery = `SELECT t.name as "Team", sum(d.extra_runs) as "Total Runs Conceded" FROM teams_tbl as t 
                       INNER JOIN deliveries_tbl as d ON t.id = d.bowling_team  
                       INNER JOIN matches_tbl as m ON d.match_id=m.id 
                       INNER JOIN season_tbl as s ON s.id=m.season 
                       WHERE s.season = ${season} 
                       GROUP BY t.name`;

  return client.query(selectQuery);
}

async function getTopTenEconomicalBowlers(season, client) {
  const selectQuery = `SELECT p.name AS "Player", (sum(d.total_runs - d.bye_runs - leg_by_runs)*6.0::decimal/ count(d.ball) ) AS "Economy"
                       FROM deliveries_tbl AS d 
                       INNER JOIN player_tbl AS p ON d.bowler = p.id 
                       WHERE d.match_id in (SELECT id FROM matches_tbl WHERE season =(SELECT id FROM season_tbl WHERE season = ${season}))
                       GROUP BY p.name ORDER BY "Economy" limit 10`;
  return client.query(selectQuery);
}

module.exports = {
  getMatchesPlayedPerYear,
  getMatchesWonPerTeamPerYear,
  getExtraRunsConcededPerTeam,
  getTopTenEconomicalBowlers,
};
