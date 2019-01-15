'use strict'

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

// add consts for routers
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');
const {router: userRouter } = require('./users');
const {router: idealclosetRouter} = require('./idealcloset');
const {router: myclosetRouter} = require('./mycloset');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL } = require('./config');

const app = express();

// location of css, images, html static files
app.use(express.static('public'));

// logging
app.use(morgan('common'));

// CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods'), 'GET, POST, PUT, PATCH, DELETE';
    if (req.method === 'OPTIONS') {
        return res.send(204);
    }
    next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/users/', userRouter);
app.use('/auth/', authRouter);
app.use('/idealcloset/', idealclosetRouter);
app.use('/mycloset/', myclosetRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});



// use this JWT strategy to protect endpoints:
// TEST ROUTE
app.get('/api/protected', jwtAuth, (req,res) => {
        return res.json({
            data: 'rosebud'
        });
});


app.use('*', (req, res) => {
    return res.status(404).json({ message: 'URL not found.'});
});

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve,reject) => {
        mongoose.connect(databaseUrl, err => {
            if(err) {
                return reject(err);
            }
            server = app
                .listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
            });
        });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if(err) {
                    return reject(err);
                }
                resolve();
            })
        })
    })
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};