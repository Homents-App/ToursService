-- Will have to change SDC if you want to create a different database name

DROP DATABASE IF EXISTS SDC;
CREATE DATABASE SDC;

\c SDC

-- requests schema: id, name, number, email, type, date, time, call, listing_id

CREATE TABLE IF NOT EXISTS agents (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  title VARCHAR(50),
  number INT,
  stars INT,
  reviews INT,
  sales INT,
  photo VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS listings (
	id INT PRIMARY KEY NOT NULL,
  agent1 INT REFERENCES agents (id),
  agent2 INT REFERENCES agents (id),
  agent3 INT REFERENCES agents (id),
  agent4 INT REFERENCES agents (id)
);

CREATE TABLE IF NOT EXISTS requests (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(80),
  number INT,
  email VARCHAR(80),
  type VARCHAR(80),
  date VARCHAR(80),
  time VARCHAR(80),
  call BOOLEAN,
  listing_id INT NOT NULL REFERENCES listings (id)
);

-- Run these commands to seed the database with your generated csv files
-- COPY listings FROM <path to your csv file> CSV HEADER;
-- COPY photos FROM <path to your csv file> CSV HEADER;