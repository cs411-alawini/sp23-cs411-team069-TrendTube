# sp23-cs411-team069-TrendTube

https://user-images.githubusercontent.com/110351173/235379370-b811e360-86eb-4ab1-8e9a-299f84247983.mp4

# Instructions
## Step 1:
Download Github Repo

## Step 2:
1] Download MySQL Workbench, 
2] Locally host your database on port 3306
3] create a database called trendtube and run query:
```
use trendtube;
CREATE TABLE Trending_Video (
    video_id varchar(255),
    title text,
    publishedAt text,
    channelId text,
    channelTitle text, 
    categoryId text, 
    trending_date text, 
    tags text, 
    view_count int,
    likes int, 
    dislikes int, 
    comment_count int, 
    thumbnail_link text, 
    comments_disabled text, 
    ratings_disabled text,
    description text,
    PRIMARY KEY(video_id)
);
CREATE TABLE User (
	userId VARCHAR(100),
    userName VARCHAR(30),
    userPassword VARCHAR(30),
    userEmail VARCHAR(30),
    PRIMARY KEY (userId, userName, userEmail)
);
CREATE TABLE UserPlaylist (
    user_Id VARCHAR(100),
    playlistId VARCHAR(50),
    playlistName VARCHAR(50),
    PRIMARY KEY (playlistId, user_Id),
    FOREIGN KEY(user_id) REFERENCES User(userId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
CREATE TABLE Region (
    RegionName VARCHAR(50),
    videoId VARCHAR(100),
    PRIMARY KEY (RegionName),
    FOREIGN KEY(videoId) REFERENCES Trending_Video(video_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
CREATE TABLE Selects (
    user_Id VARCHAR(100),
    region_name VARCHAR(50),
    FOREIGN KEY(user_id) REFERENCES User(userId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(region_name) REFERENCES Region(RegionName)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
CREATE TABLE RecommendedVideos (
    recommendedVideoId VARCHAR(100),
    user_Id VARCHAR(100),
    video_id VARCHAR(100),
    PRIMARY KEY (recommendedVideoId, user_Id, video_id),
    FOREIGN KEY(user_Id) REFERENCES User(userId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(video_id) REFERENCES Trending_Video(video_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
CREATE TABLE WatchedVideos (
    watchedVideoId VARCHAR(100),
    WatchedDate DATETIME,
    user_Id VARCHAR(100),
    video_id VARCHAR(100),
    PRIMARY KEY (watchedVideoId, user_Id, video_id),
    FOREIGN KEY(user_Id) REFERENCES User(userId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(video_id) REFERENCES Trending_Video(video_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
CREATE TABLE Contains (
    playlist_id VARCHAR(50),
    video_id VARCHAR(100),
    FOREIGN KEY(playlist_id) REFERENCES UserPlaylist(playlistId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(video_id) REFERENCES Trending_Video(video_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
CREATE TABLE RecommendsFrom (
    watchedVideoId VARCHAR(100),
    recommendedVideoId VARCHAR(100),
    FOREIGN KEY(watchedVideoId) REFERENCES WatchedVideos(watchedVideoId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(recommendedVideoId) REFERENCES RecommendedVideos(recommendedVideoId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```
## Step 3: 
Import kaggle csv dataset (make sure to convert UTF-8) into table data import wizard
kaggle dataset: 
```
https://www.kaggle.com/datasets/rsrishav/youtube-trending-video-dataset/versions/930
```

## Step 4:
Create stored procedure by importing 
```
CREATE DEFINER=`root`@`localhost` PROCEDURE `category`(IN categoryID INT, IN recommend BOOL, IN userID varchar(100))
BEGIN
	DECLARE catID INT;
    DECLARE exit_loop BOOLEAN DEFAULT FALSE;
	DECLARE categoryCursor CURSOR FOR (
				SELECT categoryId
				FROM recommendedvideos NATURAL JOIN trending_video
				WHERE user_Id = userID
				GROUP BY categoryId
				HAVING  count(*) = (SELECT MAX(maxVal.count)
									FROM (SELECT COUNT(video_id) as count
										FROM trending_video NATURAL JOIN recommendedvideos 
										WHERE user_Id = userID
										GROUP BY categoryId) maxVal));
	
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;
	DROP TABLE IF EXISTS NewTable;
    CREATE TABLE NewTable(
		video_id varchar(255) Primary Key,
        categoryId INT
    );
    
	IF recommend IS TRUE THEN
		OPEN categoryCursor;
			cloop: LOOP
				FETCH categoryCursor INTO catID;
				IF(exit_loop)THEN
					LEAVE cloop;
				END IF;
				INSERT INTO NewTable(video_id, categoryId) 
				SELECT t.video_id as video_id, t.categoryId as categoryId
				FROM trending_video t
				WHERE t.categoryId = catID; 
			END LOOP cloop;
		CLOSE categoryCursor;
        
        SELECT * FROM NewTable;
                
	ELSE
		SELECT *
		FROM trending_video
        WHERE categoryId = categoryID;
    END IF;
END
```
# Step 5:
Create a trigger in watchedvideos table
```
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
```
## Step 6:
Open Server Folder in command terminal and run:
```
Node server.js
```
## Step 7:
Open client Folder in command terminal and run:
```
npm start
```
## Step 8:
If either client side or server side throws any package error, delete the package-lock json and run in the terminal throwing the error:
```
npm install
```



  
