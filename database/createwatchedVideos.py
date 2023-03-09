import pandas as pd
import random

df = pd.read_csv('watchedVideos_clean.csv')
watched_table = pd.DataFrame(columns=[])
df = df['video_id']
for x in range(1,1000):
    recommendedVideoId = x
    user_id = random.randint(1, 1000)
    video_id = df.sample().to_string()
    video_id = video_id.split(" ")[-1]
    print(video_id)

    temp = {'recommendedVideoId':str(x), 'user_id': user_id, 'video_id':video_id}
    watched_table = pd.concat([watched_table, pd.DataFrame(temp, index=[0])], ignore_index=True)

watched_table.to_csv('watchedVideos.csv')