'user strict'

// import dependencies
const express = require('express');

// import modules
const {Idealcloset} = require('../models/closetModels');

// create a router instance
const router = express.Router();

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

module.exports = router;


