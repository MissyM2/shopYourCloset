'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

// add consts for routers
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');
const {router: usersRouter } = require('./users');
const {router: idealclosetRouter} = require('./idealcloset');
const {router: myclosetRouter} = require('./mycloset');

// why don't i need this? mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL } = require('./config');

const app = express();

// location of css, images, html static files
app.use(express.static('public'));

// logging
app.use(morgan('common'));

//app.use(express.json());

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

const jwtAuth = passport.authenticate('jwt', {session: false});

// in order to use the local auth strategy, I am registering it here in server.js
app.use(passport.initialize());

// in order to use local auth strategy in a route, initalize Passport
// and register the strategy in server.js
passport.use(localStrategy);
// to register our JWT strategy with Passport, use the passport.use method
passport.use(jwtStrategy);

// enable use of routers
app.use('/users/', usersRouter);
app.use('/auth/', authRouter);
app.use('/idealcloset/', idealclosetRouter);
app.use('/mycloset/', myclosetRouter);

// use this to protect the /api/auth/login endpoint defined
// in /auth/router.js

// use this JWT strategy to protect endpoints:
// TEST ROUTE
app.get(
    '/protected',
    // use passport.authenticate middleware to protect the endpoint,
    // passing JWT as the argument instead of the basic AUTH strategy:

    passport.authenticate('jwt', {session: false}), (req, res) => {
        return res.json({
            data: 'time to manage your closet'
        });
    }
);


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