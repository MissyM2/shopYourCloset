'use strict'

// import dependencies
require('dotenv').config();
const express = require('express'); // npm module that allows you to code:  https://expressjs.com/
const mongoose = require('mongoose'); // npm module that handles connecting to the Mongo database:  https://mongoosejs.com/docs/guide.html
const morgan = require('morgan');  // npm module that handles logging:  https://www.npmjs.com/package/morgan 
const passport = require('passport'); //npm module that handles authentication:  http://www.passportjs.org/docs/

// configure mongoose to use ES6 promises
mongoose.Promise = global.Promise;

//const bodyParser = require('body-parser');

const {PORT, HTTP_STATUS_CODES, MONGO_DATABASE_URL, TEST_MONGO_DATABASE_URL} = require('./config');

// import modules
const {authRouter} = require('./auth/auth.router');
const {localStrategy, jwtStrategy} = require('.auth/suth.strategy');
const {usersRouter } = require('./user/user.router');
const {idealclosetRouter} = require('./idealcloset/idealcloset.router');
const {myclosetRouter} = require('./mycloset/mycloset.router');

let server;


const app = express();  // initialize Express server
passport.use(localStrategy);  // configure Passport to use our localStrategy when receiving Username + Password combinations
passport.use(jwtStrategy); // configure Passport to use our jwtStrategy when receiving JSON Web Tokens


// MIDDLEWARE
app.use(morgan('common'));  // allowe Morgan to intercept and log all HTTP requests to the console
app.use(express.json());  //required so fetch request JSON data payload can be parsed and saved into request.body
app.use(express.static('./public')); // intercepts all HTTP request that match files inside /public

// public routers
app.use('/api/user', userRouter);  // redirects all calls to /api/user to userRouter
app.use('/api/auth', authRouter);  // redirects all calls to /api/user to userRouter

// protected routers
app.use('/api/idealcloset', idealclosetRouter);  // redirects all calls to /api/idealcloset to idealclosetRouter
app.use('/api/mycloset', myclosetRouter);  //redirects all calls to /api/mycloset to myclosetRouter

// in case we make an HTTP request that is unhandles by our Express server, we return a 404 status code and the message "Not Found."
app.use('*', (req, res) => {
    return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'URL not found.'});
});

function startServer(databaseUrl, port = PORT) {
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

function stopServer() {
    // Remember, because the process of starting/stopping a server takes time, it's preferrable to make
    // this asynchronous, and return a promise that'll reject/resolve depending if the process is succesful.

    // Step 1: Disconnect from the MongoDB database using Mongoose
    return mongoose
        .disconnect()
        .then(() =>  new Promise((resolve, reject) => {
            // Step 2:  Shut down the ExpressJS server
            server.close(err => {
                if(err) {
                    // Step 3A: If an error ocurred while shutting down, print out the error to the console and resolve promise;
                    console.error(err);
                    return reject(err);
                } else {
                    // Step 3B: If the server shutdown correctly, log a success message.
                    console.log('Express server stopped.');
                    resolve();
                }
            });
        }));
}
/*
if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}
*/

module.exports = {app, startServer, stopServer};