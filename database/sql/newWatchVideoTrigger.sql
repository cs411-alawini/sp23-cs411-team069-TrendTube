use youtube;
CREATE TRIGGER new_watch
AFTER
  INSERT ON WatchedVideos FOR EACH ROW BEGIN
DELETE FROM
  RecommendedVideos
WHERE
  recommendedVideoId = NEW.watchedVideoId
  AND user_Id = NEW.user_Id
  AND video_id = NEW.video_id;END;
