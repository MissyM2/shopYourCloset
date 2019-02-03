'use strict';

const express = require('express');
const Joi = require('joi');
const clothingoptionRouter = express.Router();

const { HTTP_STATUS_CODES} = require('../config');
const { Clothingoption, clothingoptionJoiSchema } = require('./clothingoption.model');

//  POST route handler for /clothingitem
//  * validate request body
//  * check to see if item already exists
// *  create item in clothingoption and send JSON response

clothingoptionRouter.post('/', (request, response) => {
    // We can access the request body payload thanks to the express.json() middleware 
    //we used in server.js
    const newClothingoption = {
        color: request.body.color,
        shortdesc: request.body.shortdesc,
        longdesc: request.body.longdesc
    };

    // Step 1: Validate new user information is correct.
    // Here, we use the Joi NPM library for easy validation
    const validation = Joi.validate(newClothingoption, clothingoptionJoiSchema);
    if (validation.error) {
    // Step 2A: If validation error is found, end the the request with a server error and error message.
        return response.status(HTTP_STATUS.CODES.BAD_REQUEST).json({error: validation.error});
    }
     // Step 2B: Attempt to create a new clothing option using Mongoose.Model.create
     Clothingoption
        .create(newClothingoption)
        .then(createdOption => {
            // Step 3A: Return the correct HTTP status code, and the note correctly formatted via serialization.
            console.log('created option is ' + createdOption);
            console.log('newClothingoption is ' + newClothingoption);
            return response.status(HTTP_STATUS_CODES.CREATED).json(createdOption.serialize());
        })
        .catch(error => {
            // Step 3B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

// retrieve clothing options
clothingoptionRouter.get('/all', (request, response) => {
    // Step 1: Attempt to retrieve all notes using Mongoose.Model.find()
    Clothingoption
        .find()
        .then(options => {
            // Step 2A: Return the correct HTTP status code, and the notes correctly 
            //formatted via serialization.
            return response.status(HTTP_STATUS_CODES.OK).json(
                options.map(option => option.serialize())
            );
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code 
            // and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//  retrieve one clothing option by id
//  * find selected item by id and send JSON response
clothingoptionRouter.get('/:optionid', (request, response) => {
    // Step 1: Attempt to retrieve the note using Mongoose.Model.findById()
    Clothingoption
        .findById(request.params.optionid)
        .then(option => {
            // Step 2A: Return the correct HTTP status code, and the note 
            //correctly formatted via serialization.
            return response.json(option.serialize());
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code 
            // and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//  update clothingoption by id
clothingoptionRouter.put('/:optionid', (request, response) => {
    const clothingoptionUpdate = {
        color: request.body.color,
        shortdesc: request.body.shortdesc,
        longdesc: request.body.longdesc
    };
    // Step 1: Validate new user information is correct.
    // Here, we use the Joi NPM library for easy validation
    const validation = Joi.validate(clothingoptionUpdate, clothingoptionJoiSchema);
    if(validation.error) {
        // Step 2A: If validation error is found, end the the request with a server error and error message.
        return response.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: validation.error });
    }

    // Step 2B: Attempt to find the note, and update it using Mongoose.Model.findByIdAndUpdate()
    Clothingoption
        // all key/value pairs in clothingoptionUpdate will be updated 
        .findByIdAndUpdate(request.params.optionid, clothingoptionUpdate)
        .then(() => {
            // Step 3A: Since the update was performed but no further data provided,
            // we just end the request with NO_CONTENT status code.
            return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            // Step 3B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//  remove item by id
clothingoptionRouter.delete('/:optionid', (request, response)  => {
    // Step 1: Attempt to find the note by ID and delete it using Mongoose.Model.findByIdAndDelete()
    Clothingoption
        .findByIdAndRemove(request.params.optionid)
        .then(option => {
            // Step 2A: Since the deletion was performed but no further data provided
            return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

module.exports = { clothingoptionRouter };