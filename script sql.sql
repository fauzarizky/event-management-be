
CREATE SCHEMA `db_mytix` ;

CREATE TABLE `db_mytix`.`list_event` (
  `event_id` INT NOT NULL AUTO_INCREMENT,
  `event_name` VARCHAR(45) NULL DEFAULT NULL,
  `event_type` VARCHAR(45) NULL DEFAULT NULL,
  `event_date` DATE NULL DEFAULT NULL,
  `event_time` VARCHAR(45) NULL DEFAULT NULL,
  `event_location` VARCHAR(45) NULL DEFAULT NULL,
  `event_description` VARCHAR(255) NULL DEFAULT NULL,
  `event_image` VARCHAR(255) NULL DEFAULT NULL,
  `gold_ticket_price` INT NULL DEFAULT NULL,
  `platinum_ticket_price` INT NULL DEFAULT NULL,
  `diamond_ticket_price` INT NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`));
  
use db_mytix;

INSERT INTO `db_mytix`.`list_event` (
`event_name`, 
`event_type`, 
`event_date`, 
`event_time`, 
`event_location`, `event_description`, 
`event_image`, 
`gold_ticket_price`, 
`platinum_ticket_price`, 
`diamond_ticket_price`) 
VALUES (
'2023 ASIA FAN MEETING IN JAKARTA: KIMBUM', 
'music', 
'2023-09-03', 
'19:00 - 22:00 WIB', 
'jakarta', 
'Viu Scream Dates 
is an annual Viu festival event in Indonesia, 
bringing the Viu experience to live to our millions of Viu’ers in Indonesia. 
The initial Viu Scream Dates was done in Bangkok, Thailand, 
in 2019 and was attended by thousands of Viu’ers. 
The Viu Scream Dates 2023 will be the first Viu Scream Dates in Indonesia,
 where we will create the excitement by bringing the most favorite Korean, 
 Thailand, Mandarin, & Indonesia celebrties to life through music concerts, meet & greets, 
 photo signings, talk-shows, screenings, and fun games.', 
 'https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230823110754.jpg', 
 '75000', 
 '0', 
 '0');
