'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {User} = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();

//Post to register a new user
router.post('/', jsonParser, (req, res) => {
    console.log('made it to router.post');
    const requiredFields = ['username', 'password'];
    const missingField = requiredFields.find(field => !(field in req.body));

    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

    const stringFields = ['username', 'password', 'firstname', 'lastname'];
    console.log(stringFields);
    const nonStringField = stringFields.find(
        field => field in req.body && typeof req.body[field] != 'string'
    );
    console.log(typeof req.body.username);

    console.log('nonStringField is ' + nonStringField);

    if (nonStringField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Incorrect field type: expected string',
            location: nonStringField
        });
    }

    // trim the username and password nad make sure that the fields are the right size
    const explicitlyTrimmedFields = ['username', 'password'];
    const nonTrimmedField = explicitlyTrimmedFields.find(
        field => req.body[field].trim() !== req.body[field]
    );
    console.log('nonTrimmedField is ' + nonTrimmedField);

    if (nonTrimmedField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Cannot start or end with whitespace',
            location: nonTrimmedField
        });
    }

    const sizedFields = {
        username: {
            min: 1
        },
        password: {
            min: 5,
            max: 20
        }
    };
    const tooSmallField = Object.keys(sizedFields).find(
        field =>
        'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
    );
    console.log('tooSmallField is ' + tooSmallField);

    const tooLargeField = Object.keys(sizedFields).find(
        field =>
            'max' in sizedFields[field]  &&
                req.body[field].trim().length > sizedFields[field].max
    );

    console.log('tooLargeField is ' + tooLargeField);

    if (tooSmallField || tooLargeField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: tooSmallField
                ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
                : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
            location:  tooSmallField || toolargeField
        });
    }

    let {username, password, firstname='', lastname='' } = req.body;
    firstname = firstname.trim();
    lastname = lastname.trim();

    return User.find({username})
        .count()
        .then(count => {
            if (count > 0) {
                // this means there is an existing user with the same username
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Username already taken',
                    location: 'username'
                });
            }
            // if there is no existing user, has the password
            return User.hashPassword(password);
        })
        .then(hash => {
            return User.create({
                username,
                password: hash,
                firstname,
                lastname
            });
        })
        .then(user => {
            return res.status(201).json(user.serialize());
        })
        .catch(err => {
            if (err.reason === 'ValidationError') {
                return res.status(err.code).json(err);
            }
            res.status(500).json({code: 500, message: 'Internal server error on post users'});
        });
});

router.get('/', (req, res) => {
    return User.find()
        .then(users => res.json(users.map(user => user.serialize())))
        .catch(err => res.status(500).json({message: 'Internal server error on get users'}));
});

router.delete('/:username', (req, res) => {
    User
        .findOneAndRemove({username: req.params.username})
        //.then(item => res.status(204).end())
        .then(item => res.status(200).json({ message: "Item has been deleted"}))
        .catch(err => res.status(500).json({ message: "Server Error on Delete"}));
});

module.exports = {router};