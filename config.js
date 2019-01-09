'use strict'
// here are the environment variables

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/shopyourcloset-localdb';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/shopyourcloset-localtestdb';
exports.PORT = process.env.PORT || 8080;