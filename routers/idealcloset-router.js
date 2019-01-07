'user strict'

// import dependencies
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// import modules
const {Idealcloset} = require('../models/closetModels');


//  GET route handler for /idealcloset
router.get('/', (req, res) => {
    Idealcloset
        .find()
        .sort( { season: 1})
        .then( items => {
            res.json({ items: items.map(item => item.serialize())});
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'server error - ideal closet'});
        });
});

// GET route handler for an individual item in /idealcloset
router.get('/:id', (req, res) => {
    Idealcloset
        .findById(req.params.id)
        .then(item => res.json(item.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({message:  "there is something wrong with the GET by ID request"});
        });
});


// POST route handler for /idealcloset
router.post('/', jsonParser, (req, res) => {

    // ensure `season`, `color`, appareltype`, `shortdesc`, `longdesc` and `adddate` are in the request body
    const requiredFields = ['season', 'color', 'appareltype', 'shortdesc', 'longdesc'];
    requiredFields.forEach(field => {
        if(!(field in req.body)) {
            const message = `Missing \`${field}\` in the request body`;
            console.error(message);
            return res.status(400).send(message); 
        }
    });

    Idealcloset
        .create({
            season: req.body.season,
            appareltype:  req.body.appareltype,
            color: req.body.color,
            shortdesc:  req.body.shortdesc,
            longdesc: req.body.longdesc
        })
        .then(item => {
            res.status(201).json(item.serialize());
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went wrong'});
        });
});

// PUT route handler for /idealcloset
router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['season', 'color', 'appareltype', 'shortdesc', 'longdesc', 'adddate'];
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
    
    console.log(`Updating ideal closet item \`${req.params.id}\``);
    const toUpdate = {};
    const updateableFields = ['season', 'color', 'appareltype', 'shortdesc', 'longdesc', 'adddate'];

    updateableFields.forEach(field => {
        if (field in req.body) {
         toUpdate[field] = req.body[field];
    }
  });
 
  Idealcloset
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(item => {
        console.log (`item has been updated`);
        res.status(204).json(item.serialize())
    })
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});

//  DELETE router handler for /idealcloset item
router.delete('/:id', (req, res) => {
    Idealcloset
    .findByIdAndRemove(req.params.id)
    .then(item => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Server Error on Delete"}));
});

module.exports = router;


