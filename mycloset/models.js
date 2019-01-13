'user strict'

const mongoose = require('mongoose');

//  declare schemas
const myclosetSchema = mongoose.Schema({
    season: {type: String, required: true},
    color: {type:String},
    appareltype: {type: String, required: true},
    shortdesc: {type: String, required: true},
    size: {type: String},
    longdesc: {type:String},
    adddate: {type: Date}
});

// serialize methods to control data that is shown to the client
myclosetSchema.methods.serialize = function() {
    return {
        _id: this.id,
        season: this.season,
        appareltype: this.appareltype,
        color: this.color,
        shortdesc: this.shortdesc,
        size: this.size,
        longdesc: this.longdesc,
        adddate: this.adddate
    }
};

//  create the models
var myclosetCollectionName = 'mycloset';
const Mycloset = mongoose.model('Mycloset', myclosetSchema, myclosetCollectionName);

module.exports = {Mycloset};