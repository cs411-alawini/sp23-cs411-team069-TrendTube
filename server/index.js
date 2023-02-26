const express = require('express');
const bodyParser = require('body-parser');
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
    database: 'youtube'
});



// I had a connection error and needed a password reset so I used this line in mySQL workbench:
// alter user 'root'@'localhost' identified with mysql_native_password by 'password';

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//All Queries in string formats
const q1 = fs.readFileSync('../database/db1.sql').toString();

// GET Request: Fetch Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.get('/', (req,res) => {
    db.query(q1, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.send(q1);
        }
    });
});

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.post('/', (req,res) => {
    res.send('Hello World!?!')
});

// PUT Request: Update Data else Create Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.put('/', (req,res) => {
    res.send('Hello World!?!')
});

// DELETE Request: Delete Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.delete('/', (req,res) => {
    res.send('Hello World!?!')
});

//Our local host is running on port 4000
app.listen(4000, () => {
    console.log('Port 4000 Running'); 
});