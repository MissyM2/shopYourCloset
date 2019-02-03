'use strict';

const express = require('express');
const Joi = require('joi');
const myitemRouter = express.Router();


const {HTTP_STATUS_CODES} = require('../config');
const {jwtPassportMiddleware } = require('../auth/auth.strategy');
const {Myitem, MyitemJoiSchema} = require('./myitem.model');


//  POST route handler for /idealitem
//  * validate request body
//  * check to see if item already exists
// *  create item in mycloset and send JSON response
myitemRouter.post('/', jwtPassportMiddleware, (request, response) => {
    // Remember, We can access the request body payload thanks to the express.json() middleware we used in server.js
    const newMyitem = {
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
    const validation = Joi.validate(newMyitem, MyitemJoiSchema);
    if (validation.error) {
        // Step 2A: If validation error is found, end the the request with a server error and error message.
        return response.status(HTTP_STATUS.CODES.BAD_REQUEST).json({error: validation.error});
    }
    // Step 2B: Attempt to create a new item in my closet using Mongoose.Model.create
    Myitem
        .create(newMyitem)
        .then(createdItem => {
            // Step 3A: Return the correct HTTP status code, and the note correctly formatted via serialization.
            console.log('created item is ' + createdItem);
            console.log('newMyitem is ' + newMyitem);
            return response.status(HTTP_STATUS_CODES.CREATED).json(createdItem.serialize());
        })
        .catch(error => {
            // Step 3B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//  retrive user's closet items
myitemRouter.get('/', jwtPassportMiddleware, (request, response) => {
    // Step 1: Attempt to retrieve all notes using Mongoose.Model.find()
    Myitem
        .find({ user: request.user.id})
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

// retrieve all closet items
myitemRouter.get('/all', (request, response) => {
    // Step 1: Attempt to retrieve all notes using Mongoose.Model.find()

    Myitem
        .find()
        .populate('user')
        .then(items => {
            // Step 2A: Return the correct HTTP status code, and the notes correctly formatted via serialization.
            return response.status(HTTP_STATUS_CODES.OK).json(
                items.map(item => Node.serialize())
            );
        })
        .catch(error => {
             // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
             return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//  retrieve one closet item by id
//  * find selected item by id and send JSON response
myitemRouter.get('/:itemid', jwtPassportMiddleware,(request, response) => {
    // Step 1: Attempt to retrieve the note using Mongoose.Model.findById()
    Myitem
        .findById(request.params.itemid)
        .populate('user')
        .then(item => {
             // Step 2A: Return the correct HTTP status code, and the note correctly formatted via serialization.
            return response.json(item.serialize());
        })
        .catch(error => {
             // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);   
        });
});

// update mycloset item by id
myitemRouter.put('/:id', jwtPassportMiddleware, (request, response) => {
   const itemUpdate = {
        season: request.body.season,
        color: request.body.color,
        appareltype: request.body.appareltype,
        shortdesc: request.body.shortdesc,
        longdesc: request.body.longdesc,
        size: request.body.size,
        adddate: request.body.adddate
   };
    // Step 1: Validate new user information is correct.
    // Here, we use the Joi NPM library for easy validation
    const validation = Joi.validate(itemUpdate, MyitemJoiSchema);
    if (validation.error) {
        // Step 2A: If validation error is found, end the the request with a server error and error message.
        return response.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: validation.error });
    }

    // Step 2B: Attempt to find the note, and update it using Mongoose.Model.findByIdAndUpdate()
    Myitem
        // all key/value pairs in itemUpdate will be updated -- that's what `$set` does
        .findByIdAndUpdate(request.params.id, itemUpdate)
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
myitemRouter.delete('/:itemid', jwtPassportMiddleware, (request, response) => {
     // Step 1: Attempt to find the note by ID and delete it using Mongoose.Model.findByIdAndDelete()
    Myitem
        .findByIdAndRemove(request.params.itemid)
        .then(item => {
             // Step 2A: Since the deletion was performed but no further data provided
             return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});



module.exports = { myitemRouter };