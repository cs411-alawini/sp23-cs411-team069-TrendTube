`
SELECT *
FROM trending_video
WHERE video_id LIKE "%` + req.body.val + `%" 
    OR title LIKE "%` + req.body.val + `%" 
    OR publishedAt LIKE "%` + req.body.val + `%"
    OR channelId LIKE "%` + req.body.val + `%"
    OR channelTitle LIKE "%` + req.body.val + `%"
    OR categoryId LIKE "%` + req.body.val + `%"
    OR trending_date LIKE "%` + req.body.val + `%"
    OR tags LIKE "%` + req.body.val + `%"
    OR thumbnail_link LIKE "%` + req.body.val + `%"
    OR description LIKE "%` + req.body.val + `%"
`
