CREATE TABLE IF NOT EXISTS posts(
  id SERIAL PRIMARY KEY,
  title varchar(50),
  body varchar(500),
  user_id INTEGER
);