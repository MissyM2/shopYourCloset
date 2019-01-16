'use strict';

const express = require('express');
const config = require('../config');
const passport = require('passport');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jsonParser = bodyParser.json();

const router = express.Router();

const {Mycloset} = require('./models');

// declare JWT strategy middleware
const jwtAuth = passport.authenticate('jwt', {session: false});
router.use(bodyParser.json());

//  GET route handler for /mycloset 
//  * find all items from mycloset and sort by season and send JSON response object
router.get('/', jwtAuth, (req, res) => {
    Mycloset
        .find()
        .sort( { season: 1})
        .then( items => {
            res.json({ items: items.map(item => item.serialize())});
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'server error - my closet'});
        });
});

//  GET route handler for selected item in /mycloset/:id
//  * find selected item by id and send JSON response
router.get('/:id', jwtAuth,(req, res) => {
    console.log(req.user);
    Mycloset
        .findById(req.params.id)
        .then(item => {
            let finalResponse = {};
            finalResponse.item = item.serialize();
            finalResponse.user = req.user;
            
            res.json(item.serialize())

        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: "there is something wrong with the GET by ID for mycloset"});   
        });
});
console.log('should run on startup');


//  POST route handler for /mycloset
//  * validate request body
//  * check to see if item already exists
// *  create item in mycloset and send JSON response
router.post('/', jsonParser, jwtAuth, (req, res) => {
    console.log(req.body);

    //ensure `season`, `appareltype` and `shortdesc` are in the request body
    const requiredFields = ['season', 'appareltype', 'color',  'shortdesc'];
    console.log(requiredFields);
    requiredFields.forEach(field => {
        if(!(field in req.body)) {
            const message = `Missing \`${field}\` in the request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });
console.log('made it to before the create');
    Mycloset
        .create({
            season: req.body.season,
            appareltype: req.body.appareltype,
            color:  req.body.color,
            shortdesc:  req.body.shortdesc,
            size:  req.body.size, 
        })
        .then(item => {
            console.log(item);
            res.status(201).json(item.serialize());
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went wrong with posting to mycloset'});
        });
});


// PUT route handler for /mycloset/:id
// * validate request id and updateable fields
// * update strain and send JSON response
router.put('/:id', jsonParser, jwtAuth, (req, res) => {
    const requiredFields = ['id'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
          const message = `Missing \`${field}\` in request body`;
          console.error(message);
          return res.status(400).send(message);
        }
      }

    if (req.params.id !== req.body.id) {
        const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
        console.error(message);
        return res.status(400).send(message);
    }
    
    console.log(`Updating my closet item \`${req.params.id}\``);
    const toUpdate = {};
    const updateableFields = ['season', 'color', 'appareltype', 'shortdesc', 'size', 'adddate'];

    updateableFields.forEach(field => {
        if (field in req.body) {
         toUpdate[field] = req.body[field];
    }
  });

  Mycloset
  // all key/value pairs in toUpdate will be updated -- that's what `$set` does
  .findByIdAndUpdate(req.params.id, { $set: toUpdate })
  .then(item => {
    console.log(item);
    res.status(200).send(item);
})
  .catch(err => res.status(500).json({ message: "Internal server error" }));
});

//  DELETE router handler for /idealcloset item
// * delete strain and send response status
router.delete('/:id', jwtAuth, (req, res) => {
    Mycloset
    .findByIdAndRemove(req.params.id)
    //.then(item => res.status(204).end())
    .then(item => res.status(200).json({ message: "Item has been deleted"}))
    .catch(err => res.status(500).json({ message: "Server Error on Delete"}));
});



module.exports = {router};