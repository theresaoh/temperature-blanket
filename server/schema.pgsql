CREATE TABLE users (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  salt text UNIQUE NOT NULL
);

CREATE TABLE projects (
  id serial PRIMARY KEY,
  user_id int REFERENCES users (id) NOT NULL,
  name text NOT NULL,
  created timestamp default current_timestamp,
  start_date timestamp NOT NULL,
  end_date timestamp NOT NULL,
  weather_station text NOT NULL,
  num_colors int NOT NULL,
  temp_high int NOT NULL,
  temp_low int NOT NULL,
  colors json[],
  last_date_seeded timestamp
);

CREATE TABLE project_rows (
  id serial PRIMARY KEY,
  project_id int REFERENCES projects (id) NOT NULL,
  avg_temp int NOT NULL,
  color text NOT NULL,
  completed boolean NOT NULL
)