DROP DATABASE IF EXISTS soccer;
CREATE DATABASE soccer;
\c soccer

-- Create the Teams table
CREATE TABLE Teams (
  team_id SERIAL PRIMARY KEY,
  team_name VARCHAR(50),
  league_id INT
);

-- Create the Players table
CREATE TABLE Players (
  player_id SERIAL PRIMARY KEY,
  player_name VARCHAR(50),
  team_id INT
  FOREIGN KEY (team_id) REFERENCES Teams(team_id) 
);

-- Create the Goals table
CREATE TABLE Goals (
  goal_id SERIAL PRIMARY KEY,
  player_id INT,
  game_id INT,
  goal_timestamp TIMESTAMP,
  goal_description VARCHAR(100),
  FOREIGN KEY (player_id) REFERENCES Players(player_id),
  FOREIGN KEY (game_id) REFERENCES Games(game_id)
);

-- Create the Referees table
CREATE TABLE Referees (
  referee_id SERIAL PRIMARY KEY,
  referee_name VARCHAR(50)
);

-- Create the Games table
CREATE TABLE Games (
  game_id SERIAL PRIMARY KEY,
  home_team_id INT,
  away_team_id INT,
  referee_id INT,
  game_date DATE,
  game_location VARCHAR(50),
  FOREIGN KEY (home_team_id) REFERENCES Teams(team_id),
  FOREIGN KEY (away_team_id) REFERENCES Teams(team_id),
  FOREIGN KEY (referee_id) REFERENCES Referees(referee_id)
);

-- Create the Leagues table
CREATE TABLE Leagues (
  league_id SERIAL PRIMARY KEY,
  league_name VARCHAR(50),
  start_date DATE,
  end_date DATE
);
