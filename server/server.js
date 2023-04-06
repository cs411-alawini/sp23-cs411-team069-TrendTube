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
const initialDisplay = fs.readFileSync('../database/sql/initialDisplay.sql').toString();
const popularChannels = fs.readFileSync('../database/sql/logoutVideos.sql').toString();
const popularVids_2023 = fs.readFileSync('../database/sql/2023Popular.sql').toString();

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
    res.send(req.ID);
});

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

// PUT Request: Update Data else Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.put('/api/put', (req,res) => {
    console.log(req);
});

// DELETE Request: Delete Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.delete('/api/delete', (req,res) => {
    console.log(req);
});

//Our local host is running on port 4000
app.listen(4000, () => {
    console.log('Port 4000 Running'); 
});