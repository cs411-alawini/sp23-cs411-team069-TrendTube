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