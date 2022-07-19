SET 
	foreign_key_checks = 0;

DROP TABLE IF EXISTS accommodation; 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pets; 
DROP TABLE IF EXISTS needs; 
DROP TABLE IF EXISTS accomodateNeeds; 

SET
    foreign_key_checks = 1;

CREATE TABLE accommodation (
	accommodationID INT NOT NULL AUTO_INCREMENT,
	address VARCHAR(255) NOT NULL,
	photo_place VARCHAR(255) NOT NULL,
	fk_user INT,
	fk_accomodateNeeds INT,
	PRIMARY KEY (accommodationID)
);

CREATE TABLE pets (
	petID INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50),
	species VARCHAR(50),
	breed VARCHAR(50),
	description VARCHAR(500),
	fk_needs INT,
	fk_user INT,
	PRIMARY KEY (petID)
);


CREATE TABLE needs (
	needsID INT NOT NULL AUTO_INCREMENT,
	medical VARCHAR(255) NOT NULL,
	exercise VARCHAR(255) NOT NULL,
	food VARCHAR(255) NOT NULL,
	special VARCHAR(255) NOT NULL,
	PRIMARY KEY (needsID)
);


CREATE TABLE accomodateNeeds (
	accomodateNeedsID INT NOT NULL AUTO_INCREMENT,
	medical VARCHAR(255) NOT NULL,
	exercise VARCHAR(255) NOT NULL,
	food VARCHAR(255) NOT NULL,
	special VARCHAR(255) NOT NULL,
	PRIMARY KEY (accomodateNeedsID)
);


CREATE TABLE users (
	userID INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(30) NOT NULL,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	hashPass VARCHAR(2000) NOT NULL,
	profilePicture VARCHAR(255),
	host TINYINT,
	-- fk_pet INT,
	PRIMARY KEY (userID)
);

ALTER TABLE pets ADD FOREIGN KEY (fk_needs) REFERENCES needs(needsID);
ALTER TABLE pets ADD FOREIGN KEY (fk_user) REFERENCES users(userID);

ALTER TABLE accommodation ADD FOREIGN KEY (fk_accomodateNeeds) REFERENCES accomodateNeeds(accomodateNeedsID);
ALTER TABLE accommodation ADD FOREIGN KEY (fk_user) REFERENCES users(userID);

-- ALTER TABLE users ADD FOREIGN KEY (fk_pet) REFERENCES pets(petID);



-- INSERT NEEDS
INSERT INTO needs (medical, exercise, food, special) VALUES 
("none", "short walk daily", "kibble twice a day", "none"), 
("eye drops twice a day", "run three times a week", "kibble twice a day", "brushed weekly"),
("none", "short walk every day", "can of food twice a day", "needs lots of attention");

-- INSERT USERS
INSERT INTO users (username, name, email, hashPass, host, profilePicture) VALUES 
('jason1', 'Jason', 'jason@gmail.com', '$2b$12$eLuI47oNK80IAGGLqzgRUOPxCSdbQrRypXhT8F/UDjYxI5l4Q6upy', 0, 'https://cff2.earth.com/uploads/2019/07/08191128/The-personalities-of-animal-owners-are-reflected-in-their-pets.jpg'), 
('camandsantiago', 'Camile and Santiago', 'cam@gmail.com', '$2b$12$eLuI47oNK80IAGGLqzgRUOPxCSdbQrRypXhT8F/UDjYxI5l4Q6upy', 1, 'https://www.petspyjamas.com/uploads/2020/04/shutterstock_189642425-690x460.jpg'),
('oscar123', 'Oscar', 'oscarb@email.com', '$2b$12$eLuI47oNK80IAGGLqzgRUOPxCSdbQrRypXhT8F/UDjYxI5l4Q6upy', 1, 'https://media.istockphoto.com/photos/kitten-bengal-cat-pet-and-man-cuddling-picture-id1192677733?k=20&m=1192677733&s=612x612&w=0&h=5D-Q7fie2a_8KlmgLZSoX0GUXafIGQEQ6r7TJ27vI0M=');


-- INSERT PETS
INSERT INTO pets (name, species, breed, description, fk_needs, fk_user) VALUES 
('Cooper', 'Dog', 'german shepard', 'freindly dog who needs lots of love and play time', 1, 1), 
('Bonito', 'Dog','mixed','likes to go for run, he does have long hair that gets eveywhere', 2, 2),
('Arena', 'Cat','tabby','keeps to herself most of the time, but will come seeking pets', 3, 3);

-- INSERT ACCOMODATENEEDS
INSERT INTO accomodateNeeds (medical, exercise, food, special) VALUES 
("none", "short walk daily", "kibble twice a day", "none"), 
("eye drops twice a day", "run three times a week", "kibble twice a day", "brushed weekly"),
("none", "short walk every day", "can of food twice a day", "needs lots of attention");

-- INSERT accommodation
INSERT INTO accommodation (address, photo_place, fk_accomodateNeeds, fk_user) VALUES 
('Barcelona', 'https://encrypted-tbn0.gstatic.com/photo_places?q=tbn:ANd9GcRpBWQBA_UdJrPGWvYo_g1dDwpC6jwfbwCArYgLPNz5pOFC-cj-p5u6B82MBNZgNQ-k5MU&usqp=CAU', 1, 2),
('Barcelona', 'https://thumbor.bigedition.com/cute-dog-room-ideas/c3tNAv_dSbIiQX8mPCxizCKFtqI=/800x0/filters:quality(80)/granite-web-prod/b3/cd/b3cd0e4a21be4a9aac07d41566410628.jpeg', 2, 3);

