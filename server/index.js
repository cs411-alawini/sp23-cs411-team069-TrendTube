const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({

});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// GET Request: Fetch Data
// @req -> getting info from frontend
// @res -> sending info to front end
app.get('/', (req,res) => {
    res.send('Hello World!?!')
});

// POST Request: Create Data
// @req -> getting info from frontend
// @res -> sending info to front end
app.post('/', (req,res) => {
    res.send('Hello World!?!')
});

// PUT Request: Update Data else Create Data
// @req -> getting info from frontend
// @res -> sending info to front end
app.put('/', (req,res) => {
    res.send('Hello World!?!')
});

// DELETE Request: Delete Data
// @req -> getting info from frontend
// @res -> sending info to front end
app.delete('/', (req,res) => {
    res.send('Hello World!?!')
});

app.listen(4000, () => {
    console.log('Port 4000 Running')
});