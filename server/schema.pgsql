CREATE TABLE users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL
);