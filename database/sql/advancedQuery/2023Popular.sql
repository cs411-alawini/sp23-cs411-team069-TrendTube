SELECT *
FROM trending_video t
WHERE t.trending_date LIKE "2023%" AND t.view_count > 500000 