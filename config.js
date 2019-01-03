'use strict'
// here are the environment variables

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/shopthecloset-db';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/shopthecloset-testdb';
exports.PORT = process.env.PORT || 8080;