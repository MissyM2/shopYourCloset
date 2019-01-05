const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// import modules
const {Mycloset} = require('../models/closetModels');

//  GET route handler for /mycloset
router.get('/mycloset', (req, res) => {
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

//  GET route handler for selected item in /mycloset
router.get('/mycloset/:id', (req, res) => {
    Mycloset
        .findById(req.params.id)
        .then(item => res.json(item.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: "there is something wrong with the GET by ID for mycloset"});   
        });
});

//  POST route handler for /mycloset
router.post('/mycloset', jsonParser, (req, res) => {

    //ensure `season`, `appareltype` and `shortdesc` are in the request body
    const requiredFields = ['season', 'appareltype', 'shortdesc'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing \`${field}\` in the request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = Mycloset.create(
        req.body.season,
        req.body.appareltype,
        req.body,shortdesc,
        req.body.longdesc,
        req.body.size,
        req.body.color
    );
    res.status(204).end();
});

//  PUT route handler for /mycloset
router.put('/mycloset/:id', jsonParser, (req, res) => {
    
})

module.exports = router;