DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Sellers;



CREATE TABLE `Users` (
	`userid` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(10) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`userid`)
);

INSERT INTO `Users` VALUES 
    (1,'user1','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W','user1@example.com'),
    (2,'user2','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6','user2@example.com'),
    (3,'user3','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy','user3@example.com');

CREATE TABLE `Sellers` (
	`sellerid` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(10) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`sellerid`)
);

INSERT INTO `Sellers` VALUES 
    (1,'seller1','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W','seller1@example.com'),
    (2,'seller2','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6','seller2@example.com'),
    (3,'seller3','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy','seller3@example.com');

CREATE TABLE `Cart` (
	`userid` INT NOT NULL,
	`productid` INT NOT NULL,
	PRIMARY KEY (`userid`)
);

CREATE TABLE `Products` (
	`productid` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`description` varchar(500) NOT NULL,
    `imgurl` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`price` INT NOT NULL,
	`listedby` INT NOT NULL,
	PRIMARY KEY (`productid`)
);

INSERT INTO `Products` VALUES 
    (1,'Wooden vase','Handcrafted wall décor/propagation stations made with Australian reclaimed timber and glass test tubes! An original piece to complete your home décor displaying any plant from fresh to dry , you can display one as a statement piece or add different models and finish for a wall feature.','https://i.etsystatic.com/12397853/r/il/505fa0/2426681051/il_1588xN.2426681051_mocv.jpg', 'Homewares', 20, 1),
    (2,'Paper plants','This is a set of four mini handmade paper plants. They are designed to brighten any spot in your home. Each leaf is printed, cut out by hand, and positioned in a 1.5" terracotta pot. The soil is not loose, so do not worry about your new plants making a mess. Although each leaf is treated with a clear coating, please do not get the plant wet (we know it might be hard). Wipe with a dry cloth to dust them if needed.','https://i.etsystatic.com/29669210/r/il/48a8a1/3619807266/il_1588xN.3619807266_4hg4.jpg', 'Homewares', 10, 2),
    (3,'Minimalist emerald necklace','This is a gorgeous necklace with a fancy Swarovski pendant. This necklace is made for you by hand in house with 925 sterling silver, plated with 14k gold. We also have an option of the 925 sterling silver chain. We believe in quality, so only the highest quality materials are used to make your personalized necklace. Completely hypoallergenic & filled with love.','https://i.etsystatic.com/20105212/r/il/99e7ee/3700655518/il_1588xN.3700655518_tpti.jpg', 'Jewellry', 40, 3);

ALTER TABLE `Cart` ADD CONSTRAINT `Cart_fk0` FOREIGN KEY (`userid`) REFERENCES `Users`(`userid`);

ALTER TABLE `Cart` ADD CONSTRAINT `Cart_fk1` FOREIGN KEY (`productid`) REFERENCES `Products`(`productid`);

ALTER TABLE `Products` ADD CONSTRAINT `Products_fk0` FOREIGN KEY (`listedby`) REFERENCES `Sellers`(`sellerid`);
