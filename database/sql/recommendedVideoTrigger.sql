CREATE DEFINER=`root`@`%` TRIGGER `watchedvideos_AFTER_INSERT` AFTER INSERT ON `watchedvideos` FOR EACH ROW BEGIN
	/* returns every video id*/
	INSERT INTO recommendedvideos 
    SELECT video_id, NEW.user_Id, video_id
	FROM trending_video
	WHERE channelTitle = ANY(
		/* The first query generates the most successful channels */
		SELECT channelTitle
		FROM trending_video
		GROUP BY channelTitle
		HAVING SUM(likes)-SUM(dislikes) > 500000

		UNION

		/* The second query recieves the channel of which the user watched */
		SELECT channelTitle
		FROM watchedvideos
		WHERE channelTitle = (SELECT channelTitle
							  FROM trending_video
							  WHERE NEW.video_id = video_id));
END