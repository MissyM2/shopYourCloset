'user strict'

const mongoose = require('mongoose');
const Joi = require('joi');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const myitemSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    season: {type: String, required: true},
    color: {type:String},
    appareltype: {type: String, required: true},
    shortdesc: {type: String, required: true},
    longdesc: {type:String},
    size: {type: String},
    adddate: {type: Date},
    updateDate: {type: Date, default: Date.now }
});

// Here we define a Mongoose instance method.  The Serialize method controls the data that is shown to the client
myitemSchema.methods.serialize = function() {
    let user;
    // We serialize the user if it's populated to avoid returning any sensitive information, like the password hash.
    if (typeof this.user.serialize === 'function') {
        user = this.user.serialize();
    } else {
        user = this.user;
    }

    return {
        id: this._id,
        user: user,
        season: this.season,
        color: this.color,
        appareltype: this.appareltype,
        shortdesc: this.shortdesc,
        longdesc: this.longdesc,
        size: this.size,
        adddate: this.adddate,
        updateDate: this.updateDate
    };
};

// To validate that data used to create a new mycloset item is valid, we will use "Joi"
const MyitemJoiSchema = Joi.object().keys({
    user: Joi.string().optional(),
    season: Joi.string().min(1).required(),
    color: Joi.string().optional(),
    appareltype: Joi.string().min(1).required(),
    shortdesc: Joi.string().min(1).required(),
    longdesc: Joi.string().optional(),
    size: Joi.string().optional(),
    adddate: Joi.date().timestamp()
});

//  create the models
const Myitem = mongoose.model('myitem', myitemSchema);

module.exports = {Myitem, MyitemJoiSchema};