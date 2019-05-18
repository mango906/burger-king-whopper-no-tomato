const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./database');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(bodyParser.json());

app.use('/', require('./api'));

server.listen(8080, () => {
    db();
    console.log('server runing');
});