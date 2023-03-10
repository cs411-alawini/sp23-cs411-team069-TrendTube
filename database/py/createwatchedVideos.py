import pandas as pd
import random
import datetime

df = pd.read_csv('watchedVideos_clean.csv')
watched_table = pd.DataFrame(columns=[])
now = datetime.datetime(2022, 5, 5)
now.strftime('%Y-%m-%d %H:%M:%S')
df = df['video_id']
for x in range(1,1500):
    watchedVideoId = x
    user_id = random.randint(1, 1000)
    WatchedDate = now
    video_id = df.sample().to_string()
    video_id = video_id.split(" ")[-1]
    print(video_id)

    temp = {'watchedVideoId':str(x), 'WatchedDate':WatchedDate, 'user_id': user_id, 'video_id':video_id}
    watched_table = pd.concat([watched_table, pd.DataFrame(temp, index=[0])], ignore_index=True)

watched_table.to_csv('watchedVideos.csv')