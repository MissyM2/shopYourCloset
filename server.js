'use strict'

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

const idealclosetRouter = require('./routers/idealcloset-router');

app.use(express.static('public'));
app.use(morgan('common'));
app.use(express.json());

// enable use of routers
app.use('/idealcloset', idealclosetRouter);

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
            server = app.listen(port, () => {
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


//app.listen(process.env.PORT || 8080);