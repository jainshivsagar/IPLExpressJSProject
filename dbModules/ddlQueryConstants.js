const CREATE_CITY_TBL_QUERY = `CREATE TABLE IF NOT EXISTS city_tbl ( id serial, name text,CONSTRAINT city_tbl_pkey PRIMARY KEY (id))`;
const CREATE_SEASON_TBL_QUERY = `CREATE TABLE IF NOT EXISTS season_tbl ( id serial , season integer, CONSTRAINT season_tbl_pkey PRIMARY KEY (id))`;
const CREATE_PLAYER_TBL_QUERY = `CREATE TABLE IF NOT EXISTS player_tbl (id serial, name text , CONSTRAINT player_tb_pkey PRIMARY KEY (id))`;
const CREATE_TEAM_TBL_QUERY = `CREATE TABLE IF NOT EXISTS teams_tbl ( id serial, name text, CONSTRAINT teams_tbl_pkey PRIMARY KEY (id))`;
const CREATE_UMPIRE_TBL_QUERY = `CREATE TABLE IF NOT EXISTS umpire_tbl ( id serial, name text, CONSTRAINT umpire_pkey PRIMARY KEY (id))`;
const CREATE_VENUE_TBL_QUERY = `CREATE TABLE IF NOT EXISTS venue_tbl (id serial, name text, city_id integer NOT NULL, CONSTRAINT venue_tbl_pkey PRIMARY KEY (id))`;
const CREATE_MATCHES_TBL_QUERY = `CREATE TABLE IF NOT EXISTS matches_tbl
(
    id integer,
    season integer,
    city integer,
    date date,
    team1 integer,
    team2 integer,
    toss_winner integer,
    toss_decision text,
    result text,
    dl_applied integer,
    winner integer,
    win_by_runs integer,
    win_by_wickets integer,
    man_of_the_match integer,
    venue integer,
    umpire1 integer,
    umpire2 integer,
    umpire3 integer,
    CONSTRAINT matches_tbl_pkey PRIMARY KEY (id),
    CONSTRAINT matches_tbl_man_of_the_match_fkey FOREIGN KEY (man_of_the_match)
        REFERENCES public.player_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT matches_tbl_season_fkey FOREIGN KEY (season)
        REFERENCES public.season_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT matches_tbl_team1_fkey FOREIGN KEY (team1)
        REFERENCES public.teams_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT matches_tbl_team2_fkey FOREIGN KEY (team2)
        REFERENCES public.teams_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT matches_tbl_toss_winner_fkey FOREIGN KEY (toss_winner)
        REFERENCES public.teams_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT matches_tbl_umpire1_fkey FOREIGN KEY (umpire1)
        REFERENCES public.umpire_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT matches_tbl_umpire2_fkey FOREIGN KEY (umpire2)
        REFERENCES public.umpire_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT matches_tbl_umpire3_fkey FOREIGN KEY (umpire3)
        REFERENCES public.umpire_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT matches_tbl_venue_fkey FOREIGN KEY (venue)
        REFERENCES public.venue_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT matches_tbl_winner_fkey FOREIGN KEY (winner)
        REFERENCES public.teams_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)`;

const CREATE_DELIVERIES_TBL_QUERY = `CREATE TABLE IF NOT EXISTS deliveries_tbl
(
    match_id integer,
    inning integer,
    bating_team integer,
    bowling_team integer,
    over integer,
    ball integer,
    batsman integer,
    non_strick integer,
    bowler integer,
    is_supper_over integer,
    wide_runs integer,
    bye_runs integer,
    leg_by_runs integer,
    noball_runs integer,
    penalty_runs integer,
    batsman_runs integer,
    extra_runs integer,
    total_runs integer,
    player_dismissed integer,
    dismissal_kind text,
    fielder integer,
    CONSTRAINT deliveries_tbl_bating_team_fkey FOREIGN KEY (bating_team)
        REFERENCES public.teams_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT deliveries_tbl_batsman_fkey FOREIGN KEY (batsman)
        REFERENCES public.player_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT deliveries_tbl_bowler_fkey FOREIGN KEY (bowler)
        REFERENCES public.player_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT deliveries_tbl_bowling_team_fkey FOREIGN KEY (bowling_team)
        REFERENCES public.teams_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT deliveries_tbl_fielder_fkey FOREIGN KEY (fielder)
        REFERENCES public.player_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT deliveries_tbl_match_id_fkey FOREIGN KEY (match_id)
        REFERENCES public.matches_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT deliveries_tbl_non_strick_fkey FOREIGN KEY (non_strick)
        REFERENCES public.player_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT deliveries_tbl_player_dismissed_fkey FOREIGN KEY (player_dismissed)
        REFERENCES public.player_tbl (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)`;

const DROP_TABLES_QUERY = `DROP TABLE city_tbl, season_tbl, player_tbl, teams_tbl, umpire_tbl, venue_tbl, matches_tbl, deliveries_tbl`;

module.exports = {
  CREATE_SEASON_TBL_QUERY,
  CREATE_CITY_TBL_QUERY,
  CREATE_VENUE_TBL_QUERY,
  CREATE_PLAYER_TBL_QUERY,
  CREATE_TEAM_TBL_QUERY,
  CREATE_UMPIRE_TBL_QUERY,
  CREATE_MATCHES_TBL_QUERY,
  CREATE_DELIVERIES_TBL_QUERY,
  DROP_TABLES_QUERY,
};
