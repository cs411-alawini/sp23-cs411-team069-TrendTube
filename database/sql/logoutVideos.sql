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