DROP TABLE `stores`;
DROP TABLE `sections`;
DROP TABLE `stores`;
DROP TABLE `listings`;
DELETE FROM `listings`



INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","jewelry","jewelry",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","home","home",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","vehicle","vehicle",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","collectible","collectible",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","baby","baby",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","book","book",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","magazine","magazine",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","comic","comic",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","toy","toy",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","puzzle","puzzle",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","hobby","hobby",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","health","health",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","beauty","beauty",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","film","film",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","television","television",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","pottery","pottery",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","glass","glass",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","stationary","stationary",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","elecronic","electronic",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","antique","antique",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","clothes","clothes",true);
INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("Test","sport","sport",true);


ALTER TABLE `stores`
ADD `indigenous` boolean DEFAULT false;

ALTER TABLE `stores`
DROP COLUMN `phone`

ALTER TABLE `stores`
ADD `phone` CHAR(10);

ALTER TABLE `stores`
ADD `email` text;

ALTER TABLE `listings`
ADD `indigenous` boolean DEFAULT false;

CREATE TABLE `stores` (
  `storeid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` TEXT,
  `category` TEXT,
  `creator` int,
  `title` TEXT,
  `description` TEXT,
  `image` TEXT,
  `url` TEXT,
  `billboard` TEXT,
  `followers` int,
  `icon` TEXT
  )

INSERT INTO `listings` (title,description,category,indigenous)
VALUES ("jewelry","jewelry","jewelry",true)

CREATE TABLE `listings` (
  `listingid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `storeid` int,
  `title`  text,
  `description` text,
  `category` text,
  `images` text,
  `price`text,
  `tags` text,
  `materials` text,
  `shopsectionid` int,
  `url` text,
  `views` int,
  `numfavourers` int,
  `whenmade` text,
  `weight` int,
  `length` text,
  `width` text,
  `height` text,
  `used` boolean
);

SELECT * FROM `users`
DROP TABLE `users`
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `email`  text,
  `bio`  text,
  `phone`  double,
  `cool`  boolean,
  `password` text,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `id_UNIQUE` (`userid`)
)

INSERT INTO users (name, email, bio, phone, cool)
VALUES ("stan","kjkjh@kjhkj.com","story",8987987987,true)
