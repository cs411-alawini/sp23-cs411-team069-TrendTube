# GCP Connection
In order to connect to GCP and show our database and tables, we ran the following commands in our gcloud console:
```
gcloud sql connect youtube-data-instance --user=root
```
```
show databases;
```
```
use trendtube;
```
```
show tables;
```


![image](https://user-images.githubusercontent.com/110351173/224215625-79d6ae7c-e9f9-4c64-9718-577e70f5c43a.png)

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

Query Explanation: When a user goes onto the trendtube webpage, he will immediately see a lot of videos that are
either popular or most recently added videos which is shown by Query 1. Once the user logs in, he will also get
videos that are recommended to him which have the same channels that the user has been watching from which is 
shown by Query 2. Note for Query 2, there should be no videos that are both in recommended and watched because
if a user has watched it, the video should not be recommended. Also note that for query 2, we did a mockup where
we are only looking at the user whose user_Id="1". We will change this to match our backend. When our user
hits the log in button, it will send an axios request from the frontend to the nodeJS backend, and nodeJS will
call the database to send the new set of videos to the front end based on the userId.

Query 1 filepath: 
```
../database/logoutVideos.sql
```
Query 2 filepath: 
```
../database/recommendedVideosForUser.sql
```

**Query 1:**
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
Output:

![image](https://user-images.githubusercontent.com/110351173/224187059-89c0dc06-7622-4435-8df1-94d574003af9.png)

**Query 2:**
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
Output:

![image](https://user-images.githubusercontent.com/110351173/224187103-576ba24c-edcc-4484-bfcd-45aeaf962b36.png)

# Indexing Analysis
**Query 1 Pre Index Analysis:**
![image](https://user-images.githubusercontent.com/90290549/224193866-7840703f-1e8a-444e-a1f8-b36aeaf85671.png)

**Query 1 Index:**
![image](https://user-images.githubusercontent.com/90290549/224193971-e5323657-2327-4fa1-8d07-566e9087a50f.png)
![image](https://user-images.githubusercontent.com/90290549/224193982-bcde52ae-7cb1-4942-91f9-288e1a0fed18.png)

**Query 1 Post Index Analysis:**
![image](https://user-images.githubusercontent.com/90290549/224193924-46ea8745-12fd-4814-9cf1-6d5464059e14.png)

**Query 1 Explanation:**

For our first query, we could not index on the channel titles since there could be multiple trending videos from the same channel, which would cause a duplicate key error. So, the only other attribute we could index on was likes and dislikes, and we assumed no two videos had the same amount of likes or dislikes. Our index was successfully created, but as shown by the results above, there was no significant difference in the costs. We believe that our indexing didn't improve performance because we needed to calculate the differences in likes/dislikes for each row, so having an index won't really make a difference. Thus, we decided to use our original query as it was already optimal.

**Query 2 Analysis:**
![image](https://user-images.githubusercontent.com/90290549/224188268-4050c84c-2ef3-4bff-b277-a67f74819c8d.png)

**Query 2 Explanation:**

For our second query, we could not create any indexes since the query only referenced primary keys (which already have indexes). We still ran the "EXPLAIN ANALYZE" command, and the output is depicted above.  










