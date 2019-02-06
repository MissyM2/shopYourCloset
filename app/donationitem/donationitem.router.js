'use strict';

const express = require('express');
const Joi = require('joi');

const { HTTP_STATUS_CODES} = require('../config');
const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const {Donationitem, DonationitemJoiSchema} = require('./donationitem.model');

const donationitemRouter = express.Router();

//  POST route handler for /donationitem
//  * validate request body
//  * check to see if item already exists
// *  create item in mycloset and send JSON response

donationitemRouter.post('/', jwtPassportMiddleware, (request, response) => {
    // Remember, We can access the request body payload thanks to the express.json() middleware we used in server.js
    const newDonationitem = {
        user: request.user.id,
        season: request.body.season,
        color: request.body.color,
        appareltype: request.body.appareltype,
        shortdesc: request.body.shortdesc,
        size: request.body.size,
        longdesc: request.body.longdesc,
        adddate: Date.now()
    };

    // Step 1: Validate new user information is correct.
    // Here, we use the Joi NPM library for easy validation
    const validation = Joi.validate(newDonationitem, DonationitemJoiSchema);
    if(validation.error) {
        // Step 2A: If validation error is found, end the the request with a server error and error message.
        return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error:validation.error});
    }
    // Step 2B: Attempt to create a new donationitem using Mongoose.Model.create
    Donationitem
        .create(newDonationitem)
        .then(createdItem => {
            // Step 3A: Return the correct HTTP status code, and the note correctly formatted via serialization.
            return response.status(HTTP_STATUS_CODES.CREATED).json(createdItem.serialize());
        })
        .catch(error => {
            // Step 3B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//  retrieve all donationItems for logged-in user
donationitemRouter.get('/', jwtPassportMiddleware, (request, response) => {
    // Step 1: Attempt to retrieve all notes using Mongoose.Model.find()
    Donationitem
        .find()
        .sort({ adddate: -1} )
        .populate('user')
        .then( items => {
            // Step 2A: Return the correct HTTP status code, and the notes correctly formatted via serialization.
            return response.status(HTTP_STATUS_CODES.OK).json(
                items.map(item => item.serialize())
            );
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

donationitemRouter.get('/', (request, response) => {
    // Step 1: Attempt to retrieve all notes using Mongoose.Model.find()
    Donationitem
        .find()
        .populate('user')
        .then(items => {
            // Step 2A: Return the correct HTTP status code, and the notes correctly formatted via serialization.
            return response.status(HTTP_STATUS_CODES.OK).json(
                items.map(item => item.serialize())
            );
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

// retrieve one note by id
donationitemRouter.get('/:itemid', jwtPassportMiddleware, (request, response) => {
     // Step 1: Attempt to retrieve the note using Mongoose.Model.findById()
    Donationitem
        .findById(request.params.itemid)
        .populate('user')
        .then(item => {
            // Step 2A: Return the correct HTTP status code, and the note correctly formatted via serialization.
            return response.status(HTTP_STATUS_CODES.OK).json(item.serialize());
        })
        .catch(error => {
           // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});


// update donationitem by id
donationitemRouter.put('/:itemid', jwtPassportMiddleware, (request, response) => {
    const donationitemUpdate = {
        season: request.body.season,
        color: request.body.color,
        appareltype: request.body.appareltype,
        shortdesc: request.body.shortdesc,
        size: request.body.size,
        longdesc: request.body.longdesc
    };

    // Step 1: Validate new user information is correct.
    const validation = Joi.validate(donationitemUpdate, DonationitemJoiSchema);
    if (validation.error) {
        // Step 2A: If validation error is found, end the the request with a server error and error message.
        return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error});
    }
    // Step 2B: Attempt to find the note, and update it using Mongoose.Model.findByIdAndUpdate()
    Donationitem.findByIdAndUpdate(request.params.itemid,donationitemUpdate)
        .then(() => {
           // Step 3A: Since the update was performed but no further data provided,
            return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error =>  {
            // Step 3B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//  remove donationitem by id
donationitemRouter.delete('/:itemid', jwtPassportMiddleware, (request, response) => {
     // Step 1: Attempt to find the note by ID and delete it using Mongoose.Model.findByIdAndDelete()
    Donationitem.findByIdAndRemove(request.params.itemid)
        .then(() => {
            // Step 2A: Since the deletion was performed but no further data provided,
            // we just end the request with NO_CONTENT status code.=
            return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

module.exports = {donationitemRouter};


