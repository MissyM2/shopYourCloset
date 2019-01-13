'use strict';

// use bcryptjs library to encrypt user passwords
const bcrypt = require('bcryptjs');

// use mongoose web server
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// declare schemas
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''}
});

// serialize methods to control data that is shown to the client
UserSchema.methods.serialize = function() {
    return {
        username: this.username || '',
        firstName: this.firstName || '',
        lastName: this.lastName || ''
    };
};

// declare function to encrypt user password
UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

// declare function to hash the password
UserSchema.statistics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

// create models
const User = mongoose.model('User', UserSchema);

module.exports = {User};