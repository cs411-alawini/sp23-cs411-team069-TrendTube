SELECT video_id
FROM Trending_Video tr
WHERE  tr.categoryId = (SELECT wv.categoryId
                        FROM WatchedVideos wv
                        GROUP BY wv.categoryId
                        HAVING COUNT(wv.categoryI))