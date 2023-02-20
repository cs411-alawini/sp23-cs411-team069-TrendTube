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


// req -> getting info from frontend
// res -> sending info to front end
app.get('/', (req,res) => {
    res.send('Hello World!?!')
});

app.listen(3001, () => {
    console.log('Port 3001 Running')
});