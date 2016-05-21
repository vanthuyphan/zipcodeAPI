
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
	PRIMARY KEY (`code`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


CREATE TABLE IF NOT EXISTS `Oauth` (
	`userCode` BIGINT NOT NULL,
	`profileId` VARCHAR(50),
	`provider` NVARCHAR(50),
	PRIMARY KEY (`userCode`, `provider`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;



INSERT INTO `User` VALUES (1, 'v4n', 'van@gmail.com', 'Van Phan', 0, '12345', '12345', 0);

CREATE TABLE IF NOT EXISTS `Category` (
	`code` BIGINT NOT NULL AUTO_INCREMENT,
	`name` NVARCHAR (100) UNIQUE,
	PRIMARY KEY (`code`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


INSERT INTO Category (name) VALUES ('Tiêu dùng');
INSERT INTO Category (name) VALUES ('Thời trang');
INSERT INTO Category (name) VALUES ('Dịch vụ');
INSERT INTO Category (name) VALUES ('Công nghiệp');
INSERT INTO Category (name) VALUES ('Thực phẩm');
INSERT INTO Category (name) VALUES ('Mỹ Phẩm');
INSERT INTO Category (name) VALUES ('Máy tính-CNTT');
INSERT INTO Category (name) VALUES ('Nông Lâm nghiệp');
INSERT INTO Category (name) VALUES ('Đồ Uống');
INSERT INTO Category (name) VALUES ('Đồ chơi-Quà tặng');
INSERT INTO Category (name) VALUES ('Viễn thông');
INSERT INTO Category (name) VALUES ('Xây dựng');
INSERT INTO Category (name) VALUES ('Mẹ và Bé');
INSERT INTO Category (name) VALUES ('Thủ công mỹ nghệ');
INSERT INTO Category (name) VALUES ('Điện máy');
INSERT INTO Category (name) VALUES ('Nội-Ngoại thất');
INSERT INTO Category (name) VALUES ('Văn phòng phẩm');
INSERT INTO Category (name) VALUES ('Dược Phẩm Y tế');
INSERT INTO Category (name) VALUES ('Ô tô-Xe máy');
INSERT INTO Category (name) VALUES ('Khác');
