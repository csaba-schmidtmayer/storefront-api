CREATE TABLE users (
  id varchar(50) PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL
);
