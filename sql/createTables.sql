
CREATE TABLE IF NOT EXISTS `_SessionSqlStore` (
	`id` VARCHAR(300) NOT NULL PRIMARY KEY,
	`data` TEXT,
	`dtime` BIGINT
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;



CREATE TABLE IF NOT EXISTS `User` (
	`code` BIGINT NOT NULL AUTO_INCREMENT,
	`id` NVARCHAR(100) UNIQUE,
	`email` NVARCHAR(100) UNIQUE,
	`name` NVARCHAR(100),
	`gender` INT(2),
	`phone` NVARCHAR(20),
	`password` NVARCHAR(100),
	`verified` BOOLEAN,
	`stype` INT(2) DEFAULT 0,
	PRIMARY KEY (`code`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


CREATE TABLE IF NOT EXISTS `Oauth` (
	`userCode` BIGINT NOT NULL,
	`profileId` VARCHAR(50),
	`provider` NVARCHAR(50),
	PRIMARY KEY (`userCode`, `provider`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;



INSERT INTO `User` VALUES (1, 'v4n', 'van@gmail.com', 'Van Phan', 0, '12345', '12345', 0);


 CREATE TABLE IF NOT EXISTS `Zipcode` (
        `code` BIGINT NOT NULL,
        `state` VARCHAR(100),
        `city` VARCHAR(100),
        `limit1` INT,
        `limit2` INT,
        `limit3` INT,
        `limit4` INT,
        `FHALimit1` INT,
        `FHALimit2` INT,
        `FHALimit3` INT,
        `FHALimit4` INT,
        PRIMARY KEY (`code`)
    ) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


