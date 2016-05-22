
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

CREATE TABLE IF NOT EXISTS `Area` (
	`code` BIGINT NOT NULL AUTO_INCREMENT,
	`name` NVARCHAR (100) UNIQUE,
	PRIMARY KEY (`code`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO Area (name) VALUES ('Hà Nội');
INSERT INTO Area (name) VALUES ('Hồ Chí Minh');
INSERT INTO Area (name) VALUES ('Đà Nẵng');
INSERT INTO Area (name) VALUES ('Bắc Giang');
INSERT INTO Area (name) VALUES ('Bắc Kạn');
INSERT INTO Area (name) VALUES ('Bắc Ninh');
INSERT INTO Area (name) VALUES ('Cao Bằng');
INSERT INTO Area (name) VALUES ('Điện Biên');
INSERT INTO Area (name) VALUES ('Hà Giang');
INSERT INTO Area (name) VALUES ('Hà Nam');
INSERT INTO Area (name) VALUES ('Hải Dương');
INSERT INTO Area (name) VALUES ('Hải Phòng');
INSERT INTO Area (name) VALUES ('Hòa Bình');
INSERT INTO Area (name) VALUES ('Hưng Yên');
INSERT INTO Area (name) VALUES ('Lai Châu');
INSERT INTO Area (name) VALUES ('Lào Cai');
INSERT INTO Area (name) VALUES ('Lạng Sơn');
INSERT INTO Area (name) VALUES ('Nam Định');
INSERT INTO Area (name) VALUES ('Ninh Bình');
INSERT INTO Area (name) VALUES ('Phú Thọ');
INSERT INTO Area (name) VALUES ('Quảng Ninh');
INSERT INTO Area (name) VALUES ('Sơn La');
INSERT INTO Area (name) VALUES ('Thái Nguyên');
INSERT INTO Area (name) VALUES ('Thái Bình');
INSERT INTO Area (name) VALUES ('Tuyên Quang');
INSERT INTO Area (name) VALUES ('Vĩnh Phúc');
INSERT INTO Area (name) VALUES ('Yên Bái');
INSERT INTO Area (name) VALUES ('Bình Định');
INSERT INTO Area (name) VALUES ('Đăk Lăk');
INSERT INTO Area (name) VALUES ('Đắc Nông');
INSERT INTO Area (name) VALUES ('Gia Lai');
INSERT INTO Area (name) VALUES ('Hà Tĩnh');
INSERT INTO Area (name) VALUES ('Khánh Hòa');
INSERT INTO Area (name) VALUES ('Kon Tum');
INSERT INTO Area (name) VALUES ('Nghệ An');
INSERT INTO Area (name) VALUES ('Phú Yên');
INSERT INTO Area (name) VALUES ('Quảng Bình');
INSERT INTO Area (name) VALUES ('Quảng Nam');
INSERT INTO Area (name) VALUES ('Quảng Ngãi');
INSERT INTO Area (name) VALUES ('Quảng Trị');
INSERT INTO Area (name) VALUES ('Thanh Hóa');
INSERT INTO Area (name) VALUES ('Thừa Thiên Huế');
INSERT INTO Area (name) VALUES ('An Giang');
INSERT INTO Area (name) VALUES ('Bà Rịa-Vũng Tàu');
INSERT INTO Area (name) VALUES ('Bạc Liêu');
INSERT INTO Area (name) VALUES ('Bến Tre');
INSERT INTO Area (name) VALUES ('Bình Dương');
INSERT INTO Area (name) VALUES ('Bình Phước');
INSERT INTO Area (name) VALUES ('Bình Thuận');
INSERT INTO Area (name) VALUES ('Cà Mau');
INSERT INTO Area (name) VALUES ('Cần Thơ');
INSERT INTO Area (name) VALUES ('Công nghiệp');
INSERT INTO Area (name) VALUES ('Đồng Nai');
INSERT INTO Area (name) VALUES ('Đồng Tháp');
INSERT INTO Area (name) VALUES ('Hậu Giang');
INSERT INTO Area (name) VALUES ('Kiên Giang');
INSERT INTO Area (name) VALUES ('Lâm Đồng');
INSERT INTO Area (name) VALUES ('Long An');
INSERT INTO Area (name) VALUES ('Ninh Thuận');
INSERT INTO Area (name) VALUES ('Sóc Trăng');
INSERT INTO Area (name) VALUES ('Tây Ninh');
INSERT INTO Area (name) VALUES ('Tiền Giang');
INSERT INTO Area (name) VALUES ('Trà Vinh');
INSERT INTO Area (name) VALUES ('Vĩnh Long');
INSERT INTO Area (name) VALUES ('Nước ngoài');
INSERT INTO Area (name) VALUES ('Toàn Quốc');
INSERT INTO Area (name) VALUES ('Shop Online');

CREATE TABLE IF NOT EXISTS `UserArea` (
	`code` BIGINT NOT NULL AUTO_INCREMENT,
	`userCode` BIGINT,
	`areaCode` BIGINT,
	PRIMARY KEY (`code`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Product` (
	`code` BIGINT NOT NULL AUTO_INCREMENT,
	`createdDate` DATE,
	`expiredDate` DATE,
	`creator` BIGINT,
	`price` BIGINT,
	`name` NVARCHAR(500),
	`content` NVARCHAR(5000),
	`brand` NVARCHAR(200),
	PRIMARY KEY (`code`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
insert into Product (creator, name, price, content, brand) values (1, 'Van', 2000000, 'A big quantity of jumbo','Versage');
insert into Product (creator, name, price, content, brand) values (2, 'Van', 2000000, 'A house in new york', 'Versage');
insert into Product (creator, name, price, content, brand) values (2, 'Van', 2000000, 'Tea bags for free', 'Versage');

CREATE TABLE IF NOT EXISTS `ProductCategory` (
	`code` BIGINT NOT NULL AUTO_INCREMENT,
	`productCode` BIGINT,
	`categoryCode` BIGINT,
	 PRIMARY KEY (`code`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Media` (
	`code` BIGINT NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(50),
	`url` VARCHAR(100),
	`mimeType` VARCHAR(50),
	 PRIMARY KEY (`code`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `ProductMedia` (
	`code` BIGINT NOT NULL AUTO_INCREMENT,
	`productCode` BIGINT,
	`mediaCode` BIGINT,
	 PRIMARY KEY (`code`)
) ENGINE MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;



