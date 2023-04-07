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
    const val = 
    `
     SELECT *
     FROM trending_video
     WHERE video_id LIKE "%` + req.body.val + `%" 
           OR title LIKE "%` + req.body.val + `%" 
           OR publishedAt LIKE "%` + req.body.val + `%"
           OR channelId LIKE "%` + req.body.val + `%"
           OR channelTitle LIKE "%` + req.body.val + `%"
           OR categoryId LIKE "%` + req.body.val + `%"
           OR trending_date LIKE "%` + req.body.val + `%"
           OR tags LIKE "%` + req.body.val + `%"
           OR thumbnail_link LIKE "%` + req.body.val + `%"
           OR description LIKE "%` + req.body.val + `%"
    `
    console.log(req.body.val);
    db.query(val, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.send(result);
        }
    });
    console.log(val);
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
            console.log(result);
            res.send(result);
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
app.put('/api/put/updateUser', (req,res) => {
    res.send(req.body);
});

// DELETE Request: Delete User
// @req -> getting info from frontend
// @res -> sending info to frontend
app.delete('/api/delete/deleteUser', (req,res) => {
    res.send(req.body);
});

// <------------  USER-VIDEO INTERACTION --------------> 

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/save', (req,res) => {
    res.send(req.body.ID);
});

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/like', (req,res) => {
    console.log(req.body.ID);
    res.send(req.body.ID);
});

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/dislike', (req,res) => {
    res.send(req.body.ID);
});

//Our local host is running on port 4000
app.listen(4000, () => {
    console.log('Port 4000 Running'); 
});