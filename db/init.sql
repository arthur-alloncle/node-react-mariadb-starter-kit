CREATE TABLE users (
  id VARCHAR(255) AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(50),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  date_of_birth DATE
);