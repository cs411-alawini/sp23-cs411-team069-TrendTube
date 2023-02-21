# UML Diagram

![PT1S2New drawio-2](https://user-images.githubusercontent.com/90290549/220476048-b6027a83-9cc0-4083-a54c-92c31f16c6db.png)

# Entity Descriptions

# Relationship Assumptions
(* = any number of)
- Each user can have 0 to * user playlists and each user playlist belongs to exactly 1 user
- Each user playlist contains at least 1 trending video and each trending video can belong to 0 to * user playlists
- Each region contains 1 to * trending videos and each trending video belongs to exactly 1 region
- Each user has 0 to * watched videos and each watched video is watched by exactly 1 user
- Each user has 0 to * recommended videos and each recommended video corresponds to exactly 1 user
- Each watched video corresponds to exactly 1 trending video and each trending video corresponds to at most 1 watched video
- Each recommended video corresponds to exactly 1 trending video and each trending video corresponds to at most 1 recommended video
- Each recommended video recommends from 1 to * watched videos and each watched video is looked at by 1 to * recommended videos
- Each user can select 1 to * regions and each region can be selected by 0 to * users 

# Relational Schema
Entities:
- User(userID INT [PK], userName VARCHAR(20), userPassword VARCHAR(20))
- TrendingVideo(videoID VARCHAR(11) [PK], videoTitle VARCHAR(50), videoCategory INT, viewCount INT, numLikes INT, numDislikes INT, trendingDate VARCHAR(20), thumbnailLink VARCHAR(50), tags VARCHAR(100), channelTitle VARCHAR(50))
- UserPlaylist(playlistID INT [PK], userID INT [FK to User.userID], playlistName VARCHAR(30))
- WatchedVideo(watchedVideoID INT [PK], trendingVideoID VARCHAR(11) [FK to TrendingVideo.videoID], userID INT [FK to User.userID], thumbnailLink VARCHAR(50) [FK to TrendingVideo.thumbnailLink], videoTitle VARCHAR(50) [FK to TrendingVideo.videoTitle], videoCategory INT [FK to TrendingVideo.videoCategory], watchedDate VARCHAR(20))
- RecommendedVideo(recommendedVideoID INT [PK], trendingVideoID VARCHAR(11) [FK to TrendingVideo.videoID], userID INT [FK to User.userID], thumbnailLink VARCHAR(50) [FK to TrendingVideo.thumbnailLink], videoTitle VARCHAR(50) [FK to TrendingVideo.videoTitle], videoCategory INT [FK to TrendingVideo.videoCategory])
- Region(RegionName VARCHAR(20) [PK])

Many-to-Many Relationships:
- Contains(trendingVideoID VARCHAR(11), playlistID INT)
- RecommendsFrom(watchedVideoID INT, recommendedVideoID INT)
- Selects(RegionName VARCHAR(20), userID INT)
