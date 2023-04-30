# TrendTube

## Project Report

### Changes in Project Proposal

In terms of our project proposal, our team initially decided we wanted to create a mock youtube 2.0 with only trending videos. We stuck through this plan throughout the entire project and did not deviate from our original goal.

### Application Overview

Functionalities:

1] User Login/Register

![image](https://user-images.githubusercontent.com/110351173/235333938-79d88265-4d6a-4e2e-8d90-d9c734e604ba.png)

This is the start page. Essentially we can register our own account on this page by typing up a username, password, and an email account. We can then login to our account right after which will redirect us to the Main page.

2] Main Page

![image](https://user-images.githubusercontent.com/110351173/235333966-bce50c72-cc69-40c9-811f-2183913b1b48.png)
![image](https://user-images.githubusercontent.com/110351173/235333977-1ca72422-8103-4782-a38e-9c844c2fe30a.png)

In the main page, we have 3 slider rows. In the first slider row, we display randomly selected popular videos based off of an algorithm of our design. In the second slider row, we have the most recent videos added to the trending videos dataset. In the third slider, we have the videos that are within the same Category ID of the videos we liked. Category ID are numbers that map to specific genre's of videos. For example, Horror can have category ID *X*, and Tech can have category ID *Y* where *X* and *Y* are numbers. Under each video, we can either like, dislike, save, or add a video to a playlist after selecting a playlist respectively. Hitting any of these buttons will alter what can and what will be displayed in the other pages the user can access through the sidebar.

3] Saved Page

![image](https://user-images.githubusercontent.com/110351173/235334037-99e68d78-6ee9-4e9a-9881-255e1d275ab5.png)

In this page, videos we saved by hitting the saved bookmark button under videos will be displayed.

4] Recommended Page

![image](https://user-images.githubusercontent.com/110351173/235334033-1262e3c9-9609-4b12-b3a8-300c0b9f02a3.png)

In this page, videos that are related to the videos you liked by clicking the thumbs up button under videos will be displayed.

5] Playlist Page

![image](https://user-images.githubusercontent.com/110351173/235334082-6e38d62e-ceb4-43c7-a6d9-affaf164fd83.png)

In this page, we can create our own playlist, select a playlist to delete, select a playlist to update the playlist name, and display the videos in the playlist. To add videos to a playlist, we can go to the main page, select playlist under a video you want to add, and then click *add video to playlist*. These videos in the playlist will be displayed when you are on the playlist page and select a playlist to be displayed.

6] Profile Page

![image](https://user-images.githubusercontent.com/110351173/235334086-60d7cfa8-43c5-46d7-a595-ae158d86ddb9.png)

This page can be reached through the sidebar. In the profile page, we can edit our own account email, username, and password. We can also delete our own account which will redirect us to the login register page and permanently delete our account. 

7] Search 

![image](https://user-images.githubusercontent.com/110351173/235334120-9bbd78d1-37ae-4552-a9d9-e4a8749770d6.png)

The search bar is in the top of the website. Essentially, we can input anything, and it will search the trending video database of similar videos. The purple button inside the search bar is the search button. Once you click the search button, it will display the videos that are similar. 

8] Extras

![image](https://user-images.githubusercontent.com/110351173/235334132-55dabf67-805e-4e76-968a-9eb0f6ae8824.png)

We have 2 extra features in our website. The lightmode/darkmode button is on the left of the sidebar. We also have an purple arrow button on the bottom of the sidebar which minimizes and maximizes the sidebar.

### Changes in Schema/Sources of Data

In terms of Schema, our team did not make massive changes the overall design of our schema, but we did change a couple datatypes. For example, we changed parameters from text to int where int made more sense and would be easier to work with. We did however make changes to our csv data. We got our data from the Kaggle youtube trending video dataset. Our team used mySQL workbench due to the ease of testing queries and having control over a database. In mySQL workbench, we had the option to upload our kaggle dataset using *table import data wizard*. Our team ran into an issue where we our original dataset was not UTF-8 Encoded, so we ended up creating python scripts to edit our dataset so it can be UTF-8 Encoded.   

```
Youtube Trending Dataset: https://www.kaggle.com/datasets/rsrishav/youtube-trending-video-dataset/versions/930
```

### Changes in ER Diagram

Our team did not make any changes in terms of the ER/UML diagram. We did make minor changes however in terms of how we would use 1 of our tables. On a side note, it did not change the structure of our database in any way shape or form. The one alteration in terms of how we used our database is in our recommendedvideos table. We had a trigger based implementation where if someone liked a video, a sql trigger would activate and insert a row into the recommendedvideos table. One of the parameters in our table was recommendedVideoId. We decided to add the videoId of the video we liked into that parameter rather than the videoID of similar videos because we already had an SQL query that would do this for us. In other words, we displayed recommended videos based off of liked videos using a tag team of the trigger and the external sql query. Otherwise, we did not change the structure of our UML diagram. All of our weak entity sets are still weak entity sets, and all of the Many-to-Many entities and regular entities are still Many-to-Many entities and regular entities.

### Changes in Functionalities

We removed two functionalities in our final application: the language button & email recovery. The language button was a button that allowed to change the page into different language based off of what the user selected. Time was the biggest factor into removing this component, and our team had to focus on building a minimum viable product first. This language button would be additional functionality that we would add to our website in the future. The other functionality we removed would be account recovery. Account recovery requires us to use an external API like Mailjet which we did not have time to implement. 

```
Mailjet API: https://www.mailjet.com/products/email-api/
```

### Advanced Database Programs/Queries

Advanced Query 1:
```
  /* returns all of the most popular videos by the community */
	SELECT channelTitle
	FROM trending_video
	GROUP BY channelTitle
	HAVING SUM(likes)-SUM(dislikes) > 2000000


	UNION 

	/* returns 20 of the most recent channels which uploaded videos */
	SELECT channelTitle
	FROM trending_video
	GROUP BY channelTitle
	HAVING channelTitle IN (
		select channelTitle
		from (select* from trending_video order by publishedAt desc limit 20) val
	)


```

Advanced Query 2:
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
					   FROM recommendedvideos w1 natural join trending_video t
					   WHERE user_Id = ?) 
      AND video_id NOT IN (SELECT video_id from recommendedvideos WHERE user_Id = ?)
ORDER BY likes DESC
```

Stored Procedure:
```
call category(?, ?, ?)
```
```
CREATE DEFINER=`root`@`localhost` PROCEDURE `category`(IN categoryID INT, IN recommend BOOL, IN userID varchar(100))
BEGIN
	DECLARE catID INT;
    DECLARE exit_loop BOOLEAN DEFAULT FALSE;
	DECLARE categoryCursor CURSOR FOR (
				SELECT categoryId
				FROM recommendedvideos NATURAL JOIN trending_video
				WHERE user_Id = userID
				GROUP BY categoryId
				HAVING  count(*) = (SELECT MAX(maxVal.count)
									FROM (SELECT COUNT(video_id) as count
										FROM trending_video NATURAL JOIN recommendedvideos 
										WHERE user_Id = userID
										GROUP BY categoryId) maxVal));
	
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;
	DROP TABLE IF EXISTS NewTable;
    CREATE TABLE NewTable(
		video_id varchar(255) Primary Key,
        categoryId INT
    );
    
	IF recommend IS TRUE THEN
		OPEN categoryCursor;
			cloop: LOOP
				FETCH categoryCursor INTO catID;
				IF(exit_loop)THEN
					LEAVE cloop;
				END IF;
				INSERT INTO NewTable(video_id, categoryId) 
				SELECT t.video_id as video_id, t.categoryId as categoryId
				FROM trending_video t
				WHERE t.categoryId = catID; 
			END LOOP cloop;
		CLOSE categoryCursor;
        
        SELECT * FROM NewTable;
                
	ELSE
		SELECT *
		FROM trending_video
        WHERE categoryId = categoryID;
    END IF;
END
```

SQL Trigger:
```
DROP TRIGGER IF EXISTS `trendtube`.`watchedvideos_AFTER_INSERT`;

DELIMITER $$
USE `trendtube`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `watchedvideos_AFTER_INSERT` AFTER INSERT ON `watchedvideos` FOR EACH ROW BEGIN
    /*SIGNAL SQLSTATE '02000' SET MESSAGE_TEXT=NEW.WatchedDate;*/
    IF  NEW.WatchedDate IS NULL THEN
		  INSERT INTO recommendedvideos VALUES (NEW.video_id, NEW.user_Id, NEW.video_id);
    END IF;
END$$
DELIMITER ;
```

### Technical Challenges

Lohit Muralidharan: Our project used Axios to make API requests between the frontend and backend. Initially, our frontend and backend was not able to send information to each other. After looking through a lot of Stack Overflow posts, we found out that we needed to specify a header inside the request. For example, if we were passing in JSON data, we needed *{ headers: { 'Content-Type': 'application/json' } }* as a seperate header in our axios request. This took up a lot of our time because we did not read the entire Axios documentation. Below are two links our team looked at. The first link was the link we initially looked at to make our POST requests, but the second link has the header properties we should have added into our requests.

```
Axios Post Documentation: https://axios-http.com/docs/post_example
```
```
Axios Header Documentation: https://axios-http.com/docs/instance
```

Yifan Jiang: 

Lorenzo Bujalil Silva: 

Kaushik Pulgari: 

### Improvements

There are many improvements that could be made to our current application. For example, our videos take a lot of time to render videos. We have to look into solutions to render them more quickly. One thing our team looked at was Instersection Observer. Intersection Observer is an API that gives data on how much a component intersects with the visible portion of the website to the oberserver/user. There are probably solutions to render videos that only show up on the screen initially. If we scroll down to check out more videos, new videos will render. Another improvement to our website that we could make is to appeal to audience outside of english speaking countries. For example, we could add a page translation to our website where we would have a drop down to change the language of the page. Lastly, Our team got some feedback from friends, and one suggestion that stood out was that people wanted an autoplay feature. For example, if someone had a music playlist and were gaming, they would want to hear the music in the background and not have to click to select the next music to play.

### Division of Labor

Lohit Muralidharan: Frontend ReactJS / Backend NodeJS <br />
Yifan Jiang: Frontend ReactJS / Backend NodeJS <br />
Lorenzo Bujalil Silva: Database Application SQL Queries Design / Python CSV Parsing UTF-8 Encoding <br />
Kaushik Pulgari: Database Application SQL Queries Design / Database SQL Advanced Queries Design <br />
