import pandas as pd

df = pd.read_csv('names.csv')
users_table = pd.DataFrame(columns=['userId, userName, userPassword, userEmail'])
for idx, row in df.iterrows():
    id = row['Id']
    name = row['Name']
    password = 'password' + str(id)
    email = name + '@email.com'

    user = {'userId':str(id), 'userName': name, 'userPassword':password, 'userEmail': email }
    users_table = pd.concat([users_table, pd.DataFrame(user, index=[0])], ignore_index=True)
    

users_table = users_table[['userId', 'userName', 'userPassword', 'userEmail']]
users_table.to_csv('users.csv')
