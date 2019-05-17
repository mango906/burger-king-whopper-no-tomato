const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./database');

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));

app.use(bodyParser.json());


server.listen(8080, () => {
    db();
    console.log('server runing');
});