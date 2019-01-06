'user strict'

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//  declare schemas

const idealclosetSchema = mongoose.Schema({
    season:{type: String, required: true},
    appareltype: {type: String, required: true},
    shortdesc: {type: String, required: true},
    longdesc: { type: String},
    adddate: {type: Date}
});

const myclosetSchema = mongoose.Schema({
    season: {type: String, required: true},
    appareltype: {type: String, required: true},
    shortdesc: {type: String, required: true},
    size: {type: String},
    color: {type:String},
    longdesc: {type:String},
    adddate: {type: Date}
});

// serialize methods to control data that is shown to the client
myclosetSchema.methods.serialize = function() {
    return {
        _id: this.id,
        season: this.season,
        appareltype: this.appareltype,
        size: this.size,
        color: this.color,
        shortdesc: this.shortdesc,
        longdesc: this.longdesc
    }
};

idealclosetSchema.methods.serialize = function() {
    return {
        _id: this.id,
        season: this.season,
        appareltype: this.appareltype,
        shortdesc: this.shortdesc,
        longdesc: this.longdesc
    }
};

//  create the models
const Idealcloset =  mongoose.model('Idealcloset', idealclosetSchema);
const Mycloset = mongoose.model('Mycloset', myclosetSchema);

module.exports = { Idealcloset, Mycloset};