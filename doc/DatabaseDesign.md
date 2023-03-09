# GCP Connection
![image](https://user-images.githubusercontent.com/90290549/224167420-7d6e1ac6-9ed9-4622-bff7-ed4345fc02b7.png)

# DDL Commands
```
**Trending Video:**

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

**User:**

CREATE TABLE User (
	userId VARCHAR(100),
    userName VARCHAR(30),
    userPassword VARCHAR(30),
    userEmail VARCHAR(30),
    PRIMARY KEY (userId, userName, userEmail)
);

**UserPlaylist:**

CREATE TABLE UserPlaylist (
    user_Id VARCHAR(100),
    playlistId VARCHAR(50),
    playlistName VARCHAR(50),
    PRIMARY KEY (playlistId, user_Id),
    FOREIGN KEY(user_id) REFERENCES User(userId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

**Region:**

CREATE TABLE Region (
    RegionName VARCHAR(50),
    videoId VARCHAR(100),
    PRIMARY KEY (RegionName),
    FOREIGN KEY(videoId) REFERENCES Trending_Video(video_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

**Selects:**

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

**RecommendedVideos:**

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

**WatchedVideos:**

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

**Contains:**

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

**RecommendsFrom:**

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

# Inserting Data

![image](https://user-images.githubusercontent.com/90290549/224178530-46b17323-e3cc-426d-bfdf-08d099b58669.png)

# Advanced Queries
```
use trendtube;
/* returns all of the most popular videos by the community */
SELECT channelTitle, SUM(likes)-SUM(dislikes) as popularity
FROM trending_video
GROUP BY channelTitle
HAVING SUM(likes)-SUM(dislikes) > 500000

UNION 

/* returns 20 of the most recent channels which uploaded videos */
SELECT channelTitle, SUM(likes)-SUM(dislikes) as popularity
FROM trending_video
GROUP BY channelTitle
HAVING channelTitle IN (
	select channelTitle
	from (select* from trending_video order by publishedAt desc limit 20) val
);
```
![image](https://user-images.githubusercontent.com/110351173/224187059-89c0dc06-7622-4435-8df1-94d574003af9.png)
```
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
					   WHERE user_Id = "1") 
      AND video_id NOT IN (SELECT video_id from watchedvideos WHERE user_Id = "1")
ORDER BY likes DESC
LIMIT 15
```
![image](https://user-images.githubusercontent.com/110351173/224187103-576ba24c-edcc-4484-bfcd-45aeaf962b36.png)








