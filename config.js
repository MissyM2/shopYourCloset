'use strict'
// here are the environment variables

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://admin:Daisl9515@ds139632.mlab.com:39632/shopyourcloset-db1';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:Daisl9515@ds133252.mlab.com:33252/shopyourcloset-testdb';
exports.PORT = process.env.PORT || 8080;