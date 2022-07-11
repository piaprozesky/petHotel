SET 
	foreign_key_checks = 0;

DROP TABLE IF EXISTS hosts; 
DROP TABLE IF EXISTS owners;
DROP TABLE IF EXISTS pets; 
DROP TABLE IF EXISTS needs; 
DROP TABLE IF EXISTS hosts_needs; 
DROP TABLE IF EXISTS pets_needs; 
DROP TABLE IF EXISTS rating; 

SET
    foreign_key_checks = 1;

CREATE TABLE hosts (
	id INT NOT NULL AUTO_INCREMENT,
	adress varchar(40) NOT NULL,
	name varchar(30) NOT NULL,
	foto_hosts varchar(200) NOT NULL,
	foto_place varchar(200) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE pets (
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(20) NOT NULL,
	species varchar(20) NOT NULL,
	fk_pets_needsId INT,
	PRIMARY KEY (id)
);

CREATE TABLE pets_needs (
	id INT NOT NULL AUTO_INCREMENT,
	fk_needsId INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE needs (
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(20) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE hosts_needs (
	id INT NOT NULL AUTO_INCREMENT,
	fk_hostsId INT NOT NULL,
	fk_needsId INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE rating (
	id INT NOT NULL AUTO_INCREMENT,
	textReview TEXT(80),
	starRating INT(1) NOT NULL,
	titleReview varchar(15) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE owners (
	id INT NOT NULL AUTO_INCREMENT,
	adress varchar(40) NOT NULL,
	name varchar(30) NOT NULL,
	image varchar(200) NOT NULL,
	fk_petsId INT NOT NULL,
	PRIMARY KEY (id)
);

ALTER TABLE pets ADD CONSTRAINT pets_fk0 FOREIGN KEY (fk_pets_needsId) REFERENCES pets_needs(id);

ALTER TABLE pets_needs ADD CONSTRAINT pets_needs_fk0 FOREIGN KEY (fk_needsId) REFERENCES needs(id);

ALTER TABLE hosts_needs ADD CONSTRAINT hosts_needs_fk0 FOREIGN KEY (fk_hostsId) REFERENCES hosts(id);

ALTER TABLE owners ADD CONSTRAINT owners_fk0 FOREIGN KEY (fk_petsId) REFERENCES pets(id);


-- INSERT NEEDS
INSERT INTO needs (name) VALUES ("enviroment"), 

("companionship"),

("health");

-- INSERT PETS_NEEDS | ENVIROMENT, DIET, HEALTH, BEHAVIOR, COMPANIONSHIP
INSERT INTO pets_needs (fk_needsId) VALUES (1), 

(2),

(3);

-- INSERT HOSTS
INSERT INTO hosts (adress, name, foto_hosts, foto_place) VALUES ('Barcelona', 'Liza', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/09/24/15/cat-pet-owner.jpg?width=1200', 'https://cdna.artstation.com/p/assets/images/images/006/058/656/large/prompiriya-kengz-88888fn.jpg?1495725634'), 

('Barcelona', 'Anika', 'https://www.britishcollegeofcaninestudies.com/wordpress/wp-content/uploads/2020/07/RDO1-image.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpBWQBA_UdJrPGWvYo_g1dDwpC6jwfbwCArYgLPNz5pOFC-cj-p5u6B82MBNZgNQ-k5MU&usqp=CAU'),

('Barcelona', 'Thomas', 'https://www.petsworld.in/blog/wp-content/uploads/2015/11/gsd-and-older-man.jpg', 'https://thumbor.bigedition.com/cute-dog-room-ideas/c3tNAv_dSbIiQX8mPCxizCKFtqI=/800x0/filters:quality(80)/granite-web-prod/b3/cd/b3cd0e4a21be4a9aac07d41566410628.jpeg');

-- -- INSERT PETS
INSERT INTO pets (name, species, fk_pets_needsId) VALUES ('Cooper', 'Dog', 1), 

('Bonito', 'Dog', 2),

('Arena', 'Cat', 3);

-- INSERT OWNERS
INSERT INTO owners (adress, name, image, fk_petsId) VALUES ('Barcelona', 'Jason', 'https://cff2.earth.com/uploads/2019/07/08191128/The-personalities-of-animal-owners-are-reflected-in-their-pets.jpg', 1), 

('Barcelona', 'Camile and Santiago', 'https://www.petspyjamas.com/uploads/2020/04/shutterstock_189642425-690x460.jpg', 2),

('Barcelona', 'Oscar', 'https://media.istockphoto.com/photos/kitten-bengal-cat-pet-and-man-cuddling-picture-id1192677733?k=20&m=1192677733&s=612x612&w=0&h=5D-Q7fie2a_8KlmgLZSoX0GUXafIGQEQ6r7TJ27vI0M=', 3);


-- INSERT HOSTS_NEEDS | ENVIROMENT, DIET, HEALTH, BEHAVIOR, COMPANIONSHIP
INSERT INTO hosts_needs (fk_hostsId, fk_needsId) VALUES (1, 1), (1, 2),

(2, 2),

(3, 3);


