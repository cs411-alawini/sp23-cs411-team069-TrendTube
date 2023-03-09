# GCP Connection
![image](https://user-images.githubusercontent.com/90290549/224167420-7d6e1ac6-9ed9-4622-bff7-ed4345fc02b7.png)

# DDL Commands
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

# Inserting Data

![image](https://user-images.githubusercontent.com/90290549/224173781-714b6b13-56ac-4b13-ad43-16a18087df58.png)







