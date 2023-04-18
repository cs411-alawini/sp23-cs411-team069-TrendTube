
/* 
	returns video_id of videos that user_Id="1" should watch 
*/
/* 
	In our CRUD backend, we will replace the user_Id="1" with 
    the user that is currently logged in to show the videos
    they should watch
*/
SELECT video_id, title
FROM trending_video
WHERE channelTitle IN (SELECT channelTitle
					   FROM watchedvideos w1 natural join trending_video t
					   WHERE user_Id = ? AND WatchedDate IS NULL) 
      AND video_id NOT IN (SELECT video_id from watchedvideos WHERE user_Id = ?)
ORDER BY likes DESC