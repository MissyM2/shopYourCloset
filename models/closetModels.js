'user strict'

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//  declare schemas

const seasonSchema = mongoose.Schema({
    season: { type: String, required:true}
});

const appareltypeSchema = mongoose.Schema({
    appareltype: { type: String, required:true}
});

const sizeSchema = mongoose.Schema({
    size: {type:String}
});

const shortdescSchema = mongoose.Schema({
    shortdesc: {type: String, required:true}
});

const idealclosetSchema = mongoose.Schema({
    season:[seasonSchema],
    appareltype: [appareltypeSchema],
    shortdesc: [shortdescSchema],
    longdesc: { type: String},
    adddate: {type: Date}
});

const myclosetSchema = mongoose.Schema({
    season: [seasonSchema],
    appareltype: [appareltypeSchema],
    size: [sizeSchema],
    color: {type:String},
    shortdesc: [shortdescSchema],
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
        shortdesc: this.shortdesc
    }
};

//  create the models
const Idealcloset =  mongoose.model('Idealcloset', idealclosetSchema);
const Mycloset = mongoose.model('Mycloset', myclosetSchema);

module.exports = { Idealcloset, Mycloset};