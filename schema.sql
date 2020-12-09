-- Will have to change SDC if you want to create a different database name

DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

\c sdc

DROP TABLE IF EXISTS agents CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS requests CASCADE;

-- requests schema: name, number, email, type, date, time, call, listing_id

CREATE TABLE agents (
  name VARCHAR(50) NOT NULL,
  title VARCHAR(50),
  number VARCHAR(50),
  stars INT,
  reviews INT,
  sales INT,
  photo VARCHAR(100),
  id SERIAL PRIMARY KEY
);

CREATE TABLE listings (
  agent1 INT,
  agent2 INT,
  agent3 INT,
  agent4 INT,
  id SERIAL PRIMARY KEY
);

CREATE TABLE requests (
  name VARCHAR(50),
  number VARCHAR(50),
  email VARCHAR(50),
  type VARCHAR(50),
  date VARCHAR(50),
  time VARCHAR(50),
  call BOOLEAN,
  listing_id INT NOT NULL,
  id SERIAL PRIMARY KEY
);

  -- listing_id INT NOT NULL REFERENCES listings (id)

-- Run these commands to seed the database with your generated csv files
-- COPY listings FROM <path to your csv file> CSV HEADER;
-- COPY photos FROM <path to your csv file> CSV HEADER;



--  __dirname: /Users/leahcardon/Desktop/HackReactor/Immersive/System Design Capstone/ToursService/csvSeedScripts/{tableName}Data.csv