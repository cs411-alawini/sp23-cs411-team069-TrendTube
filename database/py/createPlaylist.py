import pandas as pd

df = pd.read_csv('names.csv')
playlist_table = pd.DataFrame(columns=[])
for idx, row in df.iterrows():
    id = row['Id']
    name = row['Name']
    playlistName = name + '\'splaylist'

    user = {'userId':str(id), 'playlistId': str(id), 'playlistName':playlistName }
    playlist_table = pd.concat([playlist_table, pd.DataFrame(user, index=[0])], ignore_index=True)

playlist_table.to_csv('playlist.csv')
