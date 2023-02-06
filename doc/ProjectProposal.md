# TrendTube

### Summary

Our project, TrendTube, is an application that aims to simplify the process of finding, filtering, and choosing trending YouTube videos to watch. It will store a database of trending videos from various different countries. Users can find these videos by using the search bar to filter by title and keywords, and they can order the results by a variety of filters, such as likes, dislikes, region, etc.
Furthermore, we plan to implement more complex features, such as the ability create playlists. Users can create multiple different playlists, and can update them by adding and removing specific videos. Also, we hope to add a recommendation system that looks at a user’s previously watched videos, and then randomly selects a new unwatched video with similar tags.


## Description

Given the sheer number of YouTube videos that are trending across the world, it can be difficult 
for users to decide what to watch. Through our application, we aim to provide users with an easy 
and convenient way to filter and sort these trending videos, either by name, region, likes, and a 
variety of other options. We also want to allow users to create playlists to save and group videos 
together. Furthermore, if time permits, we plan to develop a recommendation system, which would 
further ease the process of deciding what videos to watch.

## Usefulness

Our application is useful because it simplifies the process of searching for and selecting 
trending videos to watch. A similar application is YouTube itself. However, our application is 
unique because it only includes trending videos, and it will allow users to see trending videos
in other countries as well. The complicated features of the app will provide a innovative way to recommend videos to the users depending on the videos they have watched in the past. A database will be created that will create a profile for each user used to map a user to a certain genre of content. Users will be able to grow with the application which will cause more relevant content to be recommended. In the end, the application will be tool to provide relevant and entertaining content with ease.

## Realness

Our data includes a widespread collection of trending YouTube videos from a variety of 
different countries, and it includes information such as view count, trending date, 
likes, dislikes, and tags. 
We will get the data from the staff-selected list of data sets, which is from Kaggle. Link to data: https://www.kaggle.com/datasets/rsrishav/youtube-trending-video-dataset?select=US_youtube_trending_data.csv. 
In the end, data is applicable to the real world and users will find enterntainment from using our application.

## Target Data

The database stores the most popular videos on YouTube, complete with video title, channel title, publish time, tags, views, likes and dislikes, 
description, and comment count. Additionally, each video has been categorized and further divided into 11 regional trending lists, allowing for 
unique representation of the top videos in each area. 

## Functionality

Functionally, our application will allow users to create different playlists of trending videos. The users can update their playlists by adding and removing specified videos. Furthermore, they can search for videos by using the search bar, and they can order the results by using a drop-down with various different filters. Users will also added to a database when they create an account with our application, where they could read, update, or delete information they provided.

### Basic Functions

Simple features: Our idea is to create a database of trending YouTube videos, and to allow users filter these videos by specified options (view count, region, likes, etc). Furthermore, we plan to add a search bar so users can search by title or keyword.

Complex features: We also plan to allow the user to create playlists of videos. The user can have multiple different playlists, and can update them by adding and removing videos. Furthermore, if time permits, we also want to implement a video suggestion system. To achieve this, we might have to develop a user login database to record and save each user’s video preferences.

### Possible Creative Function

A “I’m feeling lucky” button, similar to Google’s. It could be implemented by randomly selecting a trending video and its corresponding tag. We could choose a video and loop through to randomly select a tag, and then display the tag as the endpoint. For example, a video with the tag “adventure” will be displayed as “I’m feeling adventure”.

## Work Distribution

We plan on dividing up the work for the project into sections of the application that need to be implemented, as seen below. Each person will be assigned to focus on one section of the application and  will be able to move from section to section as some sections will be easier to complete than others. Each member of the group will be able to assist each other in completion of all the sections. Along side taking a section to complete the application, each team member will need to spend adequate time working on the bulk of the application which will be the databases. 

### Front-End
The front-end of the application will be built on React, and will be able to provide an adequate UI to be able to complete the CRUD functionality. The front end will also need to display database data, which will range from video previews, and user information. If time allows, more effort will be given to the front-end.

Member Assignment:

Lorenzo Bujalil Silva - Will assist in writing code for the front end and provide insightful ideas to use to build the UI.

Kaushik Pulgari - Will assist in writing code for the front end and provide insightful ideas to use to build the UI.

Lohit Muralidharan - Will handle and lead the majority of the front-end development. 

Yifan Jiang - Will assist in writing code for the front end and provide insightful ideas to use to build the UI.

### Front-End to Back-End Connection
We will be using Express and Node to conduct our communication between the front and back ends of the application. This connection will handle routing and HTTP requests on the server side. 

Member Assignment:

Lorenzo Bujalil Silva - Will handle building routing requests on that will connect the UI to the database.

Kaushik Pulgari - Will assist in writing code for the front to back end connection when necessary. 

Lohit Muralidharan - Will assist in writing code for the front to back end connection when necessary. 

Yifan Jiang - Will assist in writing code for the front to back end connection when necessary.

### Back-End
The back-end of the application will be the most important aspect and will be built using Mongo DB. We will construct tables store user information, trending videos, and user playlists.
The back-end will also need to have the ability to handle requests to filter or order the data.

Member Assignment:

Lorenzo Bujalil Silva - Focus on building user and user playlists databases; will assist in building other databases functionality, and handling requests on data.

Kaushik Pulgari - Focus on building trending videos database; will assist in building other databases functionality, and handling requests on data.

Lohit Muralidharan - Focus on building trending videos and user playlists databases; will assist in building other databases functionality, and handling requests on data.

Yifan Jiang - Focus on building trending videos database; will assit in building other databases functionality, and handling requests on data.


### Deployment
The deployment of the project will be done using Google Cloud Platform. This is to ensure that users can access the site and test the functionality once connected to the internet.

Member Assignment: 

All Team Members will work on packaging the project, so that it is refined and capable to be deployed. 


## UI

![TrendTubeUI](https://user-images.githubusercontent.com/90290549/216851303-de2fbe2a-ddf4-48a7-bd71-a5ef99b30d9c.jpg)

