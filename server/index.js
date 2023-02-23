const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mysql = require('mysql');

// Every MySQL Database has a host, user, password, and database name
// mySQL port: 3306
// mySQL username: root
// mySQL password: password
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: '../database/db1.sql'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// GET Request: Fetch Data
// @req -> getting info from frontend
// @res -> sending info to frontend
app.get('/', (req,res) => {
    res.send('Hello World!?!')
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
    console.log('Port 4000 Running')
});