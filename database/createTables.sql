use youtube;
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
)