'use strict';

const express = require('express');
const Joi = require('joi');
const idealitemRouter = express.Router();
const { HTTP_STATUS_CODES} = require('../config');
const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const {Idealitem, IdealitemJoiSchema} = require('./idealitem.model');


//  create new idealitem in closet
// POST route handler for /idealcloset
// * validate request body
// * check if wardrobe item already exists
// * create item and send JSON response
idealitemRouter.post('/', jwtPassportMiddleware, (request, response) => {
    // Remember, We can access the request body payload thanks to the express.json() middleware we used in server.js
    const newIdealitem = {
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
    const validation = Joi.validate(newIdealitem, IdealitemJoiSchema);
    if(validation.error) {
        // Step 2A: If validation error is found, end the the request with a server error and error message.
        return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error:validation.error});
    }
    // Step 2B: Attempt to create a new idealitem using Mongoose.Model.create
    Idealcloset
        .create(newIdealitem)
        .then(createdItem => {
            // Step 3A: Return the correct HTTP status code, and the note correctly formatted via serialization.
            return response.status(HTTP_RESPONSE_CODES.CREATED).json(createdItem.serialize());
        })
        .catch(error => {
            // Step 3B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_RESPONSE_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//  retrieve all idealItems for logged-in user
idealitemRouter.get('/', jwtPassportMiddleware, (request, response) => {
    // Step 1: Attempt to retrieve all notes using Mongoose.Model.find()
    Idealitem
        .find()
        .populate('user')
        .then( items => {
            // Step 2A: Return the correct HTTP status code, and the notes correctly formatted via serialization.
            return response.status(HTTP_STATUS_CODES.OK).json(
                items.map(item => item.serialize())
            );
        })
        .catch(err => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

idealitemRouter.get('/', (request, response) => {
    // Step 1: Attempt to retrieve all notes using Mongoose.Model.find()
    Idealitem
        .find()
        .populate('user'
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
idealitemRouter.get('/:itemid', jwtPassportMiddleware, (request, response) => {
     // Step 1: Attempt to retrieve the note using Mongoose.Model.findById()
    Idealitem
        .findById(req.params.itemid)
        .population('user')
        .then(item => {
            // Step 2A: Return the correct HTTP status code, and the note correctly formatted via serialization.
            return response.status(HTTP_STATUS_CODES.OK).json(item.serialize());
        })
        .catch(error => {
           // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});


// update idealitem by id
idealitemRouter.put('/:id', jwtPassportMiddleware, (request, response) => {
    const idealitemUpdate = {
        season: request.body.season,
        color: request.body.color,
        appareltype: request.body.appareltype,
        shortdesc: request.body.shortdesc,
        size: request.body.size,
        longdesc: request.body.longdesc
    };

    // Step 1: Validate new user information is correct.
    const validation = Joi.validate(idealitemUpdate, IdealitemJoiSchema);
    if (validation.error) {
        // Step 2A: If validation error is found, end the the request with a server error and error message.
        return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error});
    }
    // Step 2B: Attempt to find the note, and update it using Mongoose.Model.findByIdAndUpdate()
    Idealitem.findByIdAndUpdate(req.params.itemid,idealitemUpdate)
        .then(() => {
           // Step 3A: Since the update was performed but no further data provided,
            return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error =>  {
            // Step 3B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//  remove idealitem by id
idealitemRouter.delete('/:itemid', jwtPassportMiddleware, (request, response) => {
     // Step 1: Attempt to find the note by ID and delete it using Mongoose.Model.findByIdAndDelete()
    Idealitem.findByIdAndRemove(req.params.itemid)
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

module.exports = {idealitemRouter};


