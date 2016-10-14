-- 1. create owner table
CREATE TABLE owner (
id SERIAL PRIMARY KEY,
first_name varchar(80) NOT NULL,
last_name varchar(80) NOT NULL
);

-- 2. create pets TABLE
CREATE TABLE pets (
id SERIAL PRIMARY KEY,
name varchar(80) NOT NULL,
breed varchar(80) NOT NULL,
color varchar(80) NOT NULL
);

-- 3. create visits TABLE
CREATE TABLE visits (
id SERIAL PRIMARY KEY,
check_in DATE NOT NULL,
check_out DATE
);
