'use strict'
/*
 * For configuration, we will rely on process.env, a NodeJS global. To learn more:
 * https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7 
*/

module.exports = {
     // We use the OR ("||") operator to check if the PORT environment variable exists. If not, we default to 8080
     PORT:process.env.PORT || 8080,
     HTTP_STATUS_CODES: {
         OK: 200,
         CREATED: 201,
         NO_CONTENT: 204,
         BAD_REQUEST: 400,
         UNAUTHORIZED: 401,
         NOT_FOUND: 404,
         INTERNAL_SERVER_ERROR: 500
     },
     MONGO_DATABASE_URL:  process.env.DATABASE_URL || 'mongodb://localhost/shopyourcloset-db',
     //MONGO_DATABASE_URL: 'mongodb://localhost/shopyourcloset-db',
     TEST_MONGO_DATABASE_URL:  process.env.TEST_DATABASE_URL || 'mongodb://localhost/shopyourcloset-testdb',
     JWT_SECRET: process.env.JWT_SECRET || 'default',
     JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};
