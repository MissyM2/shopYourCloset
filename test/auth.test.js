'use strict';

//  We will be using Mocha as our testing framework, but also
//  Chai which is a library of assertion statements
const mongoose = require('mongoose');
const chai = require('chai');

// we need to require chai-http so that we can test the http layer of the app
const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken');
const faker = require('faker');

//  we need to require our server.js file and its modules app, runServer and closeServer
const { HTTP_STATUS_CODES, JWT_SECRET, JWT_EXPIRY}= require('../app/config');
const { app, startServer, stopServer } = require('../app/server');
const { User } = require('../app/user/user.model');

const expect = chai.expect; 
chai.use(chaiHttp);  // This lets us make HTTP request in our tests.

//  we use `describe` to create the structure for our tests.  `it` is the actual test.
describe('Integration tests for: /api/auth', function() {
    let testUser, jwtToken;

    before(function() {
        return startServer(true);
    });

    
    beforeEach(function() {
        testUser = createFakerUser();

        return User.hashPassword(testUser.password).then(hashedPassword => {
            // create a randomized test user.
            return User.create({
                name: testUser.name,
                email: testUser.email,
                username: testUser.username,
                password: hashedPassword
            })
                .then(createdUser => {
                    testUser.id = createdUser.id;

                    jwtToken = jsonwebtoken.sign(
                        {
                            user: {
                                id: testUser.id,
                                name: testUser.name,
                                email: testUser.email,
                                username: testUser.username
                            }
                        },
                        JWT_SECRET,
                        {
                            algorithm: 'HS256',
                            expiresIn: JWT_EXPIRY,
                            subject: testUser.username
                        }
                    );
                })
                .catch(err => {
                    console.error(err);
                });
            });
    });

    // Mocha Hook: Runs after EACH "it" test block.
    afterEach(function() {
        // Be sure to always return a promise to Mocha when doing asynchronous work,
        // Otherwise Mocha will just asume your work is done even if it isn't.
        return new Promise((resolve, reject) => {
            mongoose.connection.dropDatabase()
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
            });
    });

    // Mocha Hook: Runs after ALL the "it" test blocks.
    after(function() {
         // Be sure to always return a promise to Mocha when doing asynchronous work,
        // Otherwise Mocha will just asume your work is done even if it isn't.

        // Shuts down our Express Server, since we don't need it anymore.
        return stopServer();
    });

    it('Should login correctly and return a valid JSON Web Token', function() {
        return chai.request(app)
            .post('/api/auth/login')
            .send({
                username: testUser.username,
                password: testUser.password
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('jwtToken');

                const jwtPayload = jsonwebtoken.verify(res.body.jwtToken, JWT_SECRET, {
                    algorithm: ['HS256']
                });
                expect(jwtPayload.user).to.be.a('object');
                expect(jwtPayload.user).to.deep.include({
                    username: testUser.username,
                    email: testUser.email,
                    name: testUser.name
                });
            });
        });
            
        it('Should refresh the user JSON Web Token', function() {
            const firstJwtPayload = jsonwebtoken.verify(jwtToken, JWT_SECRET, {
                algorithm: ['HS256']
            });
            return chai.request(app)
                .post('/api/auth/refresh')
                .set('Authorization', `Bearer ${jwtToken}`)
                .then(res => {
                    expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys('jwtToken');

                    const newJwtPayload = jsonwebtoken.verify(res.body.jwtToken, JWT_SECRET, {
                        algorithm: ['HS256']
                    });
                    expect(newJwtPayload.user).to.be.a('object');
                    expect(newJwtPayload.user).to.deep.include({
                        username: testUser.username,
                        email: testUser.email,
                        name: testUser.name
                    });

                    expect(newJwtPayload.exp).to.be.at.least(firstJwtPayload.exp);
                });
            });

        function createFakerUser() {
            return {
                name: `${faker.name.firstName()}.${faker.name.lastName()}`,
                username: `${faker.lorem.word()}${faker.random.number(100)}`,
                password: faker.internet.password(),
                email: faker.internet.email()
            };
        }
    });



   