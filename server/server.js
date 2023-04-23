const express = require('express');
const cors = require('cors')
const app = express();
const mysql = require('mysql');
const fs = require('fs');
const { Console } = require('console');

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
const initialDisplay = fs.readFileSync('../database/sql/basicQueries/initialDisplay.sql').toString();
const popularChannels = fs.readFileSync('../database/sql/advancedQuery/logoutVideos.sql').toString();
const popularVids_2023 = fs.readFileSync('../database/sql/advancedQuery/2023Popular.sql').toString();
const checkUser = fs.readFileSync('../database/sql/userInfoQueries/checkUser.sql').toString();
const checkUsername = fs.readFileSync('../database/sql/userInfoQueries/checkUsername.sql').toString();
const checkEmail = fs.readFileSync('../database/sql/userInfoQueries/checkEmail.sql').toString();
const insertUser = fs.readFileSync('../database/sql/userInfoQueries/insertUser.sql').toString();
const search = fs.readFileSync('../database/sql/basicQueries/searchBar.sql').toString();
const deleteUser = fs.readFileSync('../database/sql/userInfoQueries/deleteUser.sql').toString();
const updateUsername = fs.readFileSync('../database/sql/userInfoQueries/updateUsername.sql').toString();
const updateEmail = fs.readFileSync('../database/sql/userInfoQueries/updateEmail.sql').toString();
const updatePassword = fs.readFileSync('../database/sql/userInfoQueries/updatePassword.sql').toString();
const createPlaylist = fs.readFileSync('../database/sql/playlistQueries/createPlaylist.sql').toString();
const deletePlaylist = fs.readFileSync('../database/sql/playlistQueries/deletePlaylist.sql').toString();
const getPlaylist = fs.readFileSync('../database/sql/playlistQueries/getPlaylists.sql').toString();
const updatePlaylist = fs.readFileSync('../database/sql/playlistQueries/updatePlaylist.sql').toString();
const getVideos = fs.readFileSync('../database/sql/playlistQueries/getVideo.sql').toString();
const addVideo = fs.readFileSync('../database/sql/playlistQueries/addVideo.sql').toString();
const removeVideo = fs.readFileSync('../database/sql/playlistQueries/removeVideo.sql').toString();
const recommend = fs.readFileSync('../database/sql/advancedQuery/recommendedVideosForUser.sql').toString();
const getWatchedVideos = fs.readFileSync('../database/sql/watched/getWatchedVideos.sql').toString();
const getAllWatchedVideos = fs.readFileSync('../database/sql/watched/getAllWatchedVideos.sql').toString();
const setWatchedVideos = fs.readFileSync('../database/sql/watched/setWatchedVideos.sql').toString();
const getAllUserWatchedVideo = fs.readFileSync('../database/sql/watched/getAllUserWatchedVideo.sql').toString();
const deleteSavedVideo = fs.readFileSync('../database/sql/watched/deleteSavedVideo.sql').toString();
const insertLiked = fs.readFileSync('../database/sql/watched/insertLikedVideo.sql').toString();
const getLiked = fs.readFileSync('../database/sql/watched/getLikedVideos.sql').toString();
const call = fs.readFileSync('../database/sql/stored_procedure/call.sql').toString(); 

// GET Request: Fetch Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.get('/api/get/initialValues', (req,res) => {
    db.query(initialDisplay, (err, result) => {
        if (err) {
            console.log(err)
        } else {
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

    db.query(checkEmail, [req.body.email], (err, result) => {
        if (err) {
            console.log(err)
        } else if (result.length >= 1) {
            res.send("Email Already Used")
        } else {
            db.query(checkUsername, [req.body.username], (err2, result2) => {
                if (err2) {
                    console.log(err2)
                } else if (result2.length >= 1) {
                    res.send("Username Already Exists")
                } else {
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
                                    res.send("Account Created");
                                }
                            });
                        }
                    })
                }
            });
        }
    });
});

// PUT Request: Update User Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.put('/api/put/updateUserEmail', (req,res) => {
    console.log(req.body.user.data[0].userId);
    db.query(updateEmail, [req.body.emailVal, req.body.user.data[0].userId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.send(req.body.user.data[0].userEmail)
        }
    });
});

// PUT Request: Update User Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.put('/api/put/updateUsername', (req,res) => {
    console.log(req.body.user.data[0].userId);
    db.query(updateUsername, [req.body.usernameVal, req.body.user.data[0].userId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.send(req.body.user.data[0].userName)
        }
    });
});

// PUT Request: Update User Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.put('/api/put/updateUserPassword', (req,res) => {
    console.log(req.body.user.data[0].userId);
    db.query(updatePassword, [req.body.passwordVal, req.body.user.data[0].userId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.send(req.body.user.data[0].userPassword)
        }
    });
});

// DELETE Request: Delete User
// @req -> getting info from frontend
// @res -> sending info to frontend
app.delete('/api/delete/deleteUser/:userData', (req,res) => {
    var userId = req.params.userData;
    db.query(deleteUser, [userId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Deleted User");
        }
    });
});

// <------------  PLAYLIST CRUD --------------> 

// POST Request: Create Playlist
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/createPlaylist', (req,res) => {
    // Table: UserPlaylist(playlistID INT [PK], userID INT [FK to User.userID], playlistName VARCHAR(30))
    var userId = req.body.user[0].userId; 
    var name = req.body.playlistName;
    console.log(name);
    console.log(userId);

    db.query(getPlaylist, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            var val = 0;
            if (result !== null) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].playlistId > val) {
                        val = result[i].playlistId;
                    }
                }
            }
            db.query(createPlaylist, [userId,val + 1,name], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send("Created Playlist");
                }
            });
        }
    });
});

// GET Request: Get All Playlists
// @req -> getting info from frontend
// @res -> sending info to frontend
app.get('/api/get/getPlaylists', (req,res) => {
    // Table: UserPlaylist(playlistID INT [PK], userID INT [FK to User.userID], playlistName VARCHAR(30))
    db.query(getPlaylist, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

// UPDATE Request: Delete Video from Playlist
// @req -> getting info from frontend
// @res -> sending info to frontend
app.put('/api/put/updatePlaylist', (req,res) => {
    // Table: Contains(trendingVideoID VARCHAR(11), playlistID INT)
    db.query(updatePlaylist, [req.body.playlistName, req.body.playlistId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Updated Playlist Name");
        }
    });
});

// DELETE Request: Delete Playlist
// @req -> getting info from frontend
// @res -> sending info to frontend
app.delete('/api/delete/deletePlaylist/:ID', (req,res) => {
    // Table: UserPlaylist(playlistID INT [PK], userID INT [FK to User.userID], playlistName VARCHAR(30))
    db.query(deletePlaylist, [req.params.ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Deleted Playlist");
        }
    });
});

// <------------ VIDEO-PLAYLIST CRUD --------------> 

// GET Request: Get All Videos from PlaylistID
// @req -> getting info from frontend
// @res -> sending info to frontend
app.get('/api/get/getVideosFromPlaylist/:ID', (req,res) => {
    // Table: UserPlaylist(playlistID INT [PK], userID INT [FK to User.userID], playlistName VARCHAR(30))
    console.log(req.params.ID)
    db.query(getVideos, [req.params.ID] ,(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

// POST Request: Add Video to Playlist
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/addVideosToPlaylist', (req,res) => {
    console.log(req.body);
    db.query(addVideo, [req.body.PlaylistID, req.body.VideoID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Added Video to " + req.body.PlaylistID + " Playlist");
        }
    });
});

// DELETE Request: Remove Video From Playlist
// @req -> getting info from frontend
// @res -> sending info to frontend
app.delete('/api/delete/removeVideoFromPlaylist/:ID', (req,res) => {
    // Table: UserPlaylist(playlistID INT [PK], userID INT [FK to User.userID], playlistName VARCHAR(30))
    
    var val = req.params.ID
    var val3 = JSON.parse(val)
    console.log(val3['VideoID'])
    
    db.query(removeVideo, [val3.VideoID, val3.PlaylistID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Deleted Video From Playlist");
        }
    });
    
});

// <------------  Saved INTERACTION --------------> 

// POST Request: Insert a Saved Video
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/save', (req,res) => {
    // Table: WatchedVideo(watchedVideoID INT [PK], trendingVideoID VARCHAR(11) [FK to TrendingVideo.videoID], userID INT [FK to User.userID], watchedDate DATE)
    console.log(req.body);
    var val = req.body.Date.split("T")
    console.log(val[0]);
    var date = val[0];
    var time = " 00:00:00"
    var datetime = date + time;
    console.log(datetime);  

    db.query(getWatchedVideos, [req.body.VideoID, req.body.UserID] , (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length === 0) {
                db.query(getAllWatchedVideos, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        
                        const list = []

                        for (var i = 0; i < result.length ; i++) {
                            list.push(parseInt(result[i].watchedVideoId))
                        }

                        console.log(list)

                        let val = Math.max.apply(Math, list) + 1

                        console.log(val);
            
                        
                        db.query(setWatchedVideos, [val, datetime, req.body.UserID, req.body.VideoID], (err, result) => {
                            if (err) {
                                console.log(err)
                            } else {
                                res.send(result);
                            }
                        });
                        
                    }
                });
            } else {
                console.log("not free")
            }
        }
    });
});

// GET Request: Get Saved Video
// @req -> getting info from frontend
// @res -> sending info to frontend
app.get('/api/get/getSave/:ID', (req,res) => {
    // Table: WatchedVideo(watchedVideoID INT [PK], trendingVideoID VARCHAR(11) [FK to TrendingVideo.videoID], userID INT [FK to User.userID], watchedDate DATE)
    // Note: For saved Videos, Date != 00-00-00
    console.log(req.params.ID)
    db.query(getAllUserWatchedVideo, [req.params.ID] ,(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

// DELETE Request: Delete Saved Video
// @req -> getting info from frontend
// @res -> sending info to frontend
app.delete('/api/delete/save/:ID', (req,res) => {
    // Table: WatchedVideo(watchedVideoID INT [PK], trendingVideoID VARCHAR(11) [FK to TrendingVideo.videoID], userID INT [FK to User.userID], watchedDate DATE)
    var list = req.params.ID.split(",")

    db.query(deleteSavedVideo, [list[0], list[1]], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

// <------------ Recommend INTERACTION --------------> 

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/api/post/like', (req,res) => {
    // Table: RecommendsFrom(watchedVideoID INT, recommendedVideoID INT)
    // Table: RecommendedVideo(recommendedVideoID INT [PK], trendingVideoID VARCHAR(11) [FK to TrendingVideo.videoID], userID INT [FK to User.userID])
    console.log(req.body)
    db.query(getLiked, [req.body.VideoID, req.body.UserID] , (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length === 0) {
                db.query(getAllWatchedVideos, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        
                        const list = []

                        for (var i = 0; i < result.length ; i++) {
                            list.push(parseInt(result[i].watchedVideoId))
                        }

                        console.log(list)

                        let val = Math.max.apply(Math, list) + 1

                        console.log(val);
                        console.log(req.body)
                        
                        db.query(insertLiked, [val, null, req.body.UserID, req.body.VideoID] , (err, result) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(result)
                            }
                        });
                        
                    }
                });
            } else {
                console.log("not free")
            }
        }
    });
});

// GET Request: Get Recommended Video
// @req -> getting info from frontend
// @res -> sending info to frontend
app.get('/api/get/getRecommended/:ID', (req,res) => {
    // Table: WatchedVideo(watchedVideoID INT [PK], trendingVideoID VARCHAR(11) [FK to TrendingVideo.videoID], userID INT [FK to User.userID], watchedDate DATE)
    console.log(req.params.ID)
    console.log("HEY")
    db.query(recommend, [req.params.ID, req.params.ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

app.get('/api/get/call/:ID', (req, res) => {
    console.log(req.params.ID)
    db.query(call, [22, true,req.params.ID.toString()], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
})

//Our local host is running on port 4000
app.listen(4000, () => {
    console.log('Port 4000 Running'); 
});