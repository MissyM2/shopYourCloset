'user strict'

// import dependencies
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// import modules
const {Idealcloset} = require('../models/closetModels');


//  GET route handler for /idealcloset
router.get('/idealcloset', (req, res) => {
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
router.get('/idealcloset/:id', (req, res) => {
    Idealcloset
        .findById(req.params.id)
        .then(item => res.json(item.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({message:  "there is something wrong with the GET by ID request"});
        });
});


// POST route handler for /idealcloset
router.post('/idealcloset', jsonParser, (req, res) => {

    // ensure `season`, `appareltype` and `shortdesc` are in the request body
    const requiredFields = ['season', 'appareltype', 'shortdesc'];
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
            shortdesc:  req.body.shortdesc
        })
        .then(item => {
            res.status(201).json(item.serialize());
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went wrong'});
        });
});
/*
// PUT route handler for /idealcloset
router.put('/idealcloset/:id', jsonParser, (req, res) => {
    if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = 
            `Request path id (${req.params.id}) and request body id ` + 
            `(${req.body.id}) must match`;
        console.error(message);
        return res.status(400).json({message: message});
    }

    const toUpdate = {};
    const updateableFields = ['season', 'appareltype', 'shortdesc', 'size', 'color', 'longdesc'];
    
    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    console.log('toUpdate = ', JSON.stringify(toUpdate));

    Mycloset
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .then(item => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error - updating mycloset item'}));
});

//  DELETE router handler for /idealcloset item
router.delete('/idealcloset/:id', (req, res) => {
    Idealcloset.delete(req.params.id);
    console.log(`Deleted idealcloset item \`${req.params.id}\``);
    res.status(204).end();
});
*/
module.exports = router;


