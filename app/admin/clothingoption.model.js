'user strict'

const mongoose = require('mongoose');
const Joi = require('joi');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const clothingoptionSchema = new mongoose.Schema({
    color: {type: String},
    shortdesc: {type: String, required: true},
    longdesc: {type: String, required: true}
});

// Here we define a Mongoose instance method.  The Serialize method controls the data that is shown to the client
clothingoptionSchema.methods.serialize = function () {
    return {
        id: this._id,
        color:this.color,
        shortdesc: this.shortdesc,
        longdesc: this.longdesc
    };
};

// To validate that data used to create a new clothing item is valid, we will use "Joi"
const clothingoptionJoiSchema = Joi.object().keys({
    color: Joi.string().optional(),
    shortdesc: Joi.string().required(),
    longdesc: Joi.string().required()
});

// create the models
const Clothingoption = mongoose.model('clothingoption', clothingoptionSchema);
module.exports = { Clothingoption, clothingoptionJoiSchema };

