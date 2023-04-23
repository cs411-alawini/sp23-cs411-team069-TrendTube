CREATE DEFINER=`root`@`localhost` TRIGGER `watchedvideos_AFTER_INSERT` AFTER INSERT ON `watchedvideos` FOR EACH ROW BEGIN
	DECLARE ID1 varchar(100);
    DECLARE ID2 varchar(100);
    SET ID1 = NEW.user_Id;
    SET ID2 = NEW.video_id;
    
	INSERT INTO recommendedvideos VALUES (@this, ID1, ID2);
	SELECT t2.video_id into @this
	FROM trending_video t2
	WHERE t2.channelTitle IN (SELECT channelTitle
							  FROM watchedvideos w1 natural join trending_video t
							  WHERE user_Id = NEW.user_Id AND WatchedDate IS NULL) 
	AND t2.video_id NOT IN (SELECT video_id from watchedvideos WHERE user_Id = NEW.user_Id)
	ORDER BY likes DESC;
END
