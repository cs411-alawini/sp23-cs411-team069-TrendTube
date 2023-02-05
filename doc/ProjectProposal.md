# TrendTube

## Summary

Our project, TrendTube, is an application that aims to simplify the process of finding, filtering, and choosing trending YouTube videos to watch. It will store a database of trending videos from various different countries. Users can find these videos by using the search bar to filter by title and keywords, and they can order the results by a variety of filters, such as likes, dislikes, region, etc.
Furthermore, we plan to implement more complex features, such as the ability create playlists. Users can create multiple different playlists, and can update them by adding and removing specific videos. Also, we hope to add a recommendation system that looks at a user’s previously watched videos, and then randomly selects a new unwatched video with similar tags.


## Proposal

### Describe what data is stored in the database. (Where is the data from, and what attributes and information would be stored?)

The database stores the most popular videos on YouTube, complete with video title, channel title, publish time, tags, views, likes and dislikes, 
description, and comment count. Additionally, each video has been categorized and further divided into 11 regional trending lists, allowing for 
unique representation of the top videos in each area.

### What are the basic functions of your web application? (What can users of this website do? Which simple and complex features are there?)

Simple features: Our idea is to create a database of trending YouTube videos, and to allow users filter these videos by specified options (view count, region, likes, etc). Furthermore, we plan to add a search bar so users can search by title or keyword.

Complex features: We also plan to allow the user to create playlists of videos. The user can have multiple different playlists, and can update them by adding and removing videos. Furthermore, if time permits, we also want to implement a video suggestion system. To achieve this, we might have to develop a user login database to record and save each user’s video preferences.

### What would be a good creative component (function) that can improve the functionality of your application? (What is something cool that you want to include? How are you planning to achieve it?)

A “I’m feeling lucky” button, similar to Google’s. It could be implemented by randomly selecting a trending video and its corresponding tag. We could choose a video and loop through to randomly select a tag, and then display the tag as the endpoint. For example, a video with the tag “adventure” will be displayed as “I’m feeling adventure”.

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
in other countries as well.

## Realness

Our data includes a widespread collection of trending YouTube videos from a variety of 
different countries, and it includes information such as view count, trending date, 
likes, dislikes, and tags. 
We will get the data from the staff-selected list of data sets, which is from Kaggle.

## Functionality

Functionally, our application will allow users to create different playlists of trending videos. The users can update their playlists by adding and removing specified videos. Furthermore, they can search for videos by using the search bar, and they can order the results by using a drop-down with various different filters.
