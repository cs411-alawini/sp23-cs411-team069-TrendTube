DROP TRIGGER IF EXISTS `trendtube`.`watchedvideos_AFTER_INSERT`;

DELIMITER $$
USE `trendtube`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `watchedvideos_AFTER_INSERT` AFTER INSERT ON `watchedvideos` FOR EACH ROW BEGIN
    /*SIGNAL SQLSTATE '02000' SET MESSAGE_TEXT=NEW.WatchedDate;*/
    IF  NEW.WatchedDate IS NULL THEN
		INSERT INTO recommendedvideos VALUES (NEW.video_id, NEW.user_Id, NEW.video_id);
    END IF;
END$$
DELIMITER ;
