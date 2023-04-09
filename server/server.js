const express = require('express');
const cors = require('cors')
const app = express();
const mysql = require('mysql');
const fs = require('fs');

// Every MySQL Database has a host, user, password, and database name
// mySQL port: 3306
// mySQL username: root
// mySQL password: password
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'trendtube'
});

// I had a connection error and needed a password reset so I used this line in mySQL workbench:
// alter user 'root'@'localhost' identified with mysql_native_password by 'password';

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//All Queries in string formats
//const allValues = fs.readFileSync('../database/sql/allValues.sql').toString();
const initialDisplay = fs.readFileSync('../database/sql/basicQueries/initialDisplay.sql').toString();
const popularChannels = fs.readFileSync('../database/sql/advancedQuery/logoutVideos.sql').toString();
const popularVids_2023 = fs.readFileSync('../database/sql/advancedQuery/2023Popular.sql').toString();
const checkUser = fs.readFileSync('../database/sql/userInfoQueries/checkUser.sql').toString();
const insertUser = fs.readFileSync('../database/sql/userInfoQueries/insertUser.sql').toString();
const search = fs.readFileSync('../database/sql/basicQueries/searchBar.sql').toString();

// GET Request: Fetch Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.get('/api/get/initialValues', (req,res) => {
    db.query(initialDisplay, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

// GET Request: Fetch Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.get('/api/get/popularValues', (req,res) => {
    db.query(popularChannels, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            var list = [];
            //traverse result
            result.map((val) => {
                list.push(val.channelTitle)
            });
            db.query(popularVids_2023, (err, result2) => {
                var list2 = []
                if (err) {
                    console.log(err)
                } else {
                    result2.map((vid) => {
                        for (var i = 0; i < list.length; i++) {
                            if (list[i] == vid.channelTitle) {
                                list2.push(vid.video_id);
                                continue;
                            }
                        }
                    })
                }
                res.send(list2);
            })
        }
    });
});

// GET Request: Fetch Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.get('/api/get/allValues', (req,res) => {
    db.query(allValues, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/search', (req,res) => {
    const data = req.body.val

    db.query(search, ["%" + data + "%", "%" + data + "%", "%" + data + "%", "%" + data + "%", "%" + data + "%", "%" + data + "%", "%" + data + "%", "%" + data + "%", "%" + data + "%", "%" + data + "%"], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

// <------------  USER CREATION --------------> 

// POST Request: Check User
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/checkUser', (req,res) => {
    db.query(checkUser, [req.body.username, req.body.password], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length == 0) {
                res.send("null");
            } else {
                res.send(result);
            }
        }
    });
});


// POST Request: Create User
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/createUser', (req,res) => {
    var getValues = 'SELECT * FROM user'
    db.query(getValues, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            var max = 0;
            for (var i = 0; i < result.length; i++) {
                if (result[i].userId > max) {
                    max = result[i].userId;
                }
            }
            db.query(insertUser, [max + 1, req.body.username, req.body.password, req.body.email], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                    res.send("User: " + req.body.username + " Password: " + req.body.password);
                }
            });
        }
    })
});

// PUT Request: Update User Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.put('/api/put/updateUserEmail', (req,res) => {
    res.send(req.body);
});

// PUT Request: Update User Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.put('/api/put/updateUsername', (req,res) => {
    res.send(req.body);
});

// PUT Request: Update User Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.put('/api/put/updateUserPassword', (req,res) => {
    res.send(req.body);
});

// DELETE Request: Delete User
// @req -> getting info from frontend
// @res -> sending info to frontend
app.delete('/api/delete/deleteUser/:userData', (req,res) => {
    var userId = req.params.userData;
    res.send(userId);
});

// <------------  USER-VIDEO INTERACTION --------------> 

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/save', (req,res) => {
    // Table: WatchedVideo(watchedVideoID INT [PK], trendingVideoID VARCHAR(11) [FK to TrendingVideo.videoID], userID INT [FK to User.userID], watchedDate DATE)
    res.send(req.body.ID);
});

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/like', (req,res) => {
    // Table: RecommendsFrom(watchedVideoID INT, recommendedVideoID INT)
    // Table: RecommendedVideo(recommendedVideoID INT [PK], trendingVideoID VARCHAR(11) [FK to TrendingVideo.videoID], userID INT [FK to User.userID])
    console.log(req.body.ID);
    res.send(req.body.ID);
});

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/dislike', (req,res) => {
    res.send(req.body.ID);
});

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/addToPlaylist', (req,res) => {
    // Table: Contains(trendingVideoID VARCHAR(11), playlistID INT)
    res.send(req.body.ID);
});

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.delete('/api/post/deleteFromPlaylist', (req,res) => {
    // Table: Contains(trendingVideoID VARCHAR(11), playlistID INT)
    res.send(req.body.ID);
});

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/createPlaylist', (req,res) => {
    // Table: UserPlaylist(playlistID INT [PK], userID INT [FK to User.userID], playlistName VARCHAR(30))
    res.send(req.body.ID);
});

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.delete('/api/post/deletePlaylist', (req,res) => {
    // Table: UserPlaylist(playlistID INT [PK], userID INT [FK to User.userID], playlistName VARCHAR(30))
    res.send(req.body.ID);
});

//Our local host is running on port 4000
app.listen(4000, () => {
    console.log('Port 4000 Running'); 
});