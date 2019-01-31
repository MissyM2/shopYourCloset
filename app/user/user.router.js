'use strict';
const express = require('express');
const Joi = require('joi');

const {HTTP_STATUS_CODES } = require('../config.js');
const {User, UserJoiSchema} = require('./user.model');

const userRouter = express.Router();

//Post to register a new user
userRouter.post('/', (request, response) => {

    // Remember, We can access the request body payload thanks to the express.json() middleware we used in server.js
    const newUser = {
        name: request.body.name,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    }
    console.log('new user is ' + newUser);

    // Step 1: Validate new user information is correct.
    // Here, we use the Joi NPM library for easy validation
    // https://www.npmjs.com/package/joi

    const validation = Joi.validate(newUser, UserJoiSchema);
    if(validation.error) {
        console.log('is there a validation error');
        // Step 2A: If validation error is found, end the request with a server error and error message.
        return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error});
    }

    // Step 2B: Verify if the new user's email or username doesn't already exist in the database using Mongoose.Model.findOne() 
    return User.findOne({
        // Mongoose $or operator: https://docs.mongodb.com/manual/reference/operator/query/or/ 
        $or: [
            { email: newUser.email },
            { username: newUser.username}
        ]
    }).then(user => {
        if (user) {
            // Step 3A: If user already exists, abruptly end the request with an error.
            return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: 'Database Error: A user with that username and/or email already exists.'});
        }
        // Step 3B:  We should NEVER store raw passwords, so instead we wait while we encrypt it into a hash.
        return User.hashPassword(newUser.password);
        }).then(passwordHash => {
                newUser.password = passwordHash;
                console.log(newUser);
                // Step 4: Once password hash has replaced the raw password, we attempt to create the new user using Mongoose.Model.create()
                User.create(newUser)
                    .then(newUser => {
                        // Step 5A: if created successfully, return the newly created user information
                        return response.status(HTTP_STATUS_CODES.CREATED).json(newUser.serialize());
                    })
                    .catch(error => {
                        // Step 5B: if an error ocurred, respond with an error
                        console.log(error);
                        return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
                            error: error.message
                        });
                    });
                });
});

// retrieve all users with GET
userRouter.get('/', (request, response) => {
    // Step 1: Attempt to retrieve all users from the database using Mongoose.Model.find()
    return User.find()
        // Step 2A: Return the correct HTTP status code, and the users correctly formatted via serialization.
        .then(users => {
            return response.status(HTTP_STATUS_CODES.OK).json(
                users.map(user => user.serialize())
            );
        })       
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({error});
        });
    });

// retrieve one user with GET
userRouter.get('/:userid', (request, response) => {
  // Step 1: Attempt to retrieve a specific user using Mongoose.Model.findById()
  User.findById(request.params.userid)
    .then(user => {
        // Step 2A: Return the correct HTTP status code, and the user correctly formatted via serialization.
        console.log('from userRouter.get ' + json(user.serialize()));
        return response.status(HTTP_STATUS_CODES.OK).json(user.serialize());
    })
    .catch(error => {
        // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
        return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
});

// delete a user based on username with DELETE
userRouter.delete('/:username', (request, response) => {
    //  Step 1:  Attempt to retrieve and delete a specific user using Mongoose.Model.findOneAndRemove
    User
        .findOneAndRemove(request.params.username)
         // Step 2A: Return the correct HTTP status code, with message.
        .then(user => {
            response.status(HTTP_STATUS_CODES.NO_CONTENT).json({ message: "Item has been deleted"});
        })
        .catch(error => {
            response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

module.exports = {userRouter};