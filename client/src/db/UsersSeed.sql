DROP DATABASE IF EXISTS PARKP2P;
CREATE DATABASE PARKP2P;
USE PARKP2P;
CREATE TABLE driveways
(

	ID INT AUTO_INCREMENT NOT NULL,
    Email VARCHAR(80) UNIQUE NOT NULL,
    Pass BINARY(60) NOT NULL,
	PRIMARY KEY(ID)
);

	USE PARKP2P;
	INSERT INTO driveways (Email, Pass)
	values ("test@gmail.com", "hashedpassword")



-- DROP DATABASE IF EXISTS PARKP2P;
-- CREATE DATABASE PARKP2P;
-- USE PARKP2P;
-- CREATE TABLE driveways
-- (

-- 	ID INT
-- 	AUTO_INCREMENT NOT NULL,
--     Email VARCHAR(80) NOT NULL,
--     Pass VARCHAR(15) NOT NULL,
--     Username VARCHAR(15) NOT NULL,
-- 	First_Name VARCHAR(100),
-- 	Last_Name VARCHAR(100),
-- 	Phone_Number VARCHAR(15),
-- 	Address VARCHAR(100),
--     Address_Extra VARCHAR(100),
-- 	City VARCHAR(100),
-- 	State VARCHAR(100),
-- 	Zip INTEGER(10), 
-- 	Spots INTEGER(10),
-- 	Active_State BOOLEAN,
-- 	Hourly INTEGER(10),
-- 	Daily INTEGER(10),
-- 	Weekly INTEGER(10),
-- 	Monthly INTEGER(10),
-- 	Overnight INTEGER(10),
--     Balance INTEGER(10),
-- 	PRIMARY KEY(ID)
-- );

-- 	USE PARKP2P;
-- 	INSERT INTO driveways
-- 		(Email, Pass, Username, First_Name, Last_Name, Phone_Number, Address, Address_Extra, City, State, Zip, Spots, Active_State, Hourly, Daily, Weekly, Monthly, Overnight, Balance)
-- 	values
-- 		("Nicholastysh@gmail.com", "hashedpassword", "NT5K", null, null, null, null, null, null, null, null, null, false, null, null, null, null, null, null)
