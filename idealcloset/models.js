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
var idealclosetCollectionName = 'idealcloset';
const Idealcloset =  mongoose.model('Idealcloset', idealclosetSchema, idealclosetCollectionName);

module.exports = {Idealcloset};