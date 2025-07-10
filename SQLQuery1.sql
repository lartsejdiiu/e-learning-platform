CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,         -- Unique ID
  name VARCHAR(100) NOT NULL,                -- Full name
  email VARCHAR(255) NOT NULL UNIQUE,        -- Unique email
  password VARCHAR(255) NOT NULL,            -- Hashed password
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
