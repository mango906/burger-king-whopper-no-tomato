const mongoose = require('mongoose');
const {
    dbUrl,
} = require('config/serverconfig.json');

module.exports = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
    });
    mongoose.connection.on('error', console.error.bind(console, 'mongoose connection error.'));
    mongoose.connection.on('open', () => {
        console.log('connected db');
    });
    mongoose.connection.on('disconnected', () => {
        console.log('disconnected db');
    });
};