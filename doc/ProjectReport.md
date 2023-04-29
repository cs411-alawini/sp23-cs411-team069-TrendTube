# TrendTube

## Project Report



### Changes in Project Proposal



### Application Overview



### Changes in Schema/Sources of Data



### Changes in ER Diagram



### Changes in Functionalities

We removed one functionality in our final application: the language button. The language button was a button that allowed to change the page into different language based off of what the user selected. Time was the biggest factor into removing this component, and our team had to focus on building a minimum viable product first. This language button would be additional functionality that we would add to our website in the future. Another functionality we removed would be account recovery. Account recovery requires us to use an external API like Mailjet which we did not have time to implement. 

```
Mailjet API: https://www.mailjet.com/products/email-api/
```

### Advanced Database Programs/Queries

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
