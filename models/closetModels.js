'user strict'

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//  declare schemas

const idealclosetSchema = mongoose.Schema({
    season:{type: String, required: true},
    appareltype: {type: String, required: true},
    color: {type:String},
    shortdesc: {type: String, required: true},
    longdesc: { type: String},
    adddate: {type: Date}
},
{collection: 'idealcloset'});

const myclosetSchema = mongoose.Schema({
    season: {type: String, required: true},
    appareltype: {type: String, required: true},
    shortdesc: {type: String, required: true},
    size: {type: String},
    color: {type:String},
    longdesc: {type:String},
    adddate: {type: Date}
},
{collection: 'mycloset'});

// serialize methods to control data that is shown to the client
myclosetSchema.methods.serialize = function() {
    return {
        _id: this.id,
        season: this.season,
        appareltype: this.appareltype,
        color: this.color,
        shortdesc: this.shortdesc,
        size: this.size,
        longdesc: this.longdesc
    }
};

idealclosetSchema.methods.serialize = function() {
    return {
        _id: this.id,
        season: this.season,
        appareltype: this.appareltype,
        color: this.color,
        shortdesc: this.shortdesc,
        longdesc: this.longdesc,
        adddate: this.adddate
    }
};

//  create the models
const Idealcloset =  mongoose.model('Idealcloset', idealclosetSchema);
const Mycloset = mongoose.model('Mycloset', myclosetSchema);

module.exports = { Idealcloset, Mycloset};