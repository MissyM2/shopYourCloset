'use strict'
// here are the environment variables

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://admin:Daisl9515@ds139632.mlab.com:39632/shopyourcloset-db1';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:Daisl9515@ds045021.mlab.com:45021/shopyourcloset-testdb1';
exports.PORT = process.env.PORT || 8080;