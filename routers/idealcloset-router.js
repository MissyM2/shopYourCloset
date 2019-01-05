'user strict'

// import dependencies
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// import modules
const {Idealcloset} = require('../models/closetModels');

// create a router instance


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

// POST route handler for /idealcloset
router.post('/idealcloset', jsonParser, (req, res) => {

    // ensure `season`, `appareltype` and `shortdesc` are in the request body
    const requiredFields = ['season', 'appareltype', 'shortdesc'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing \`${field}\` in the request body`;
            console.error(message);
            return res.status(400).send(message); 
        }
    }
    const item = Idealcloset.create(
        req.body.season,
        req.body.appareltype,
        req.body.shortdesc
    );
    res.status(204).end();
});

module.exports = router;


