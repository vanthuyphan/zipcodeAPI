
create database cafe2s_dev;
create user 'cafe2s'@'%' identified by '111111';
grant all on cafe2s_dev.* to 'cafe2s';



use cafe2s_dev;


-- DROP `_SessionSqlStore`;
CREATE TABLE IF NOT EXISTS `_SessionSqlStore` (
	`id` VARCHAR(300) NOT NULL PRIMARY KEY,
	`data` TEXT,
	`dtime` BIGINT
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;



-- DROP TABLE `User`;
CREATE TABLE IF NOT EXISTS `User` (
	`code` BIGINT NOT NULL AUTO_INCREMENT,
	`id` NVARCHAR(100) UNIQUE,
	`email` NVARCHAR(100),
	`name` NVARCHAR(100),
	`gender` INT(2),
	`phone` NVARCHAR(20),
	PRIMARY KEY (`code`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;