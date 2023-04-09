SELECT *
FROM trending_video
WHERE video_id LIKE ?  
    OR title LIKE ?
    OR publishedAt LIKE ?
    OR channelId LIKE ?
    OR channelTitle LIKE ?  
    OR categoryId LIKE ? 
    OR trending_date LIKE ?   
    OR tags LIKE ?
    OR thumbnail_link LIKE ? 
    OR description LIKE ?