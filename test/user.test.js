'use strict';

//  We will be using Mocha as our testing framework, but also
//  Chai which is a library of assertion statements
const mongoose = require('mongoose');
const chai = require('chai');

// we need to require chai-http so that we can test the http layer of the app

const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken');
const faker = require('faker');

const expect = chai.expect;
chai.use(chaiHttp);  // This lets us make HTTP request in our tests.

//  we need to require our server.js file and its modules app, runServer and closeServer
const { HTTP_STATUS_CODES } = require('../app/config');
const { app, startServer, stopServer } = require('../app/server');
const { User } = require('../app/user/user.model');

//  we use `describe` to create the structure for our tests.  `it` is the actual test.
describe('Integration tests for: /api/user', function() {
    let testUser;

    // Mocha Hook: Runs before ALL the "it" test blocks.
    before(function() {
        // Be sure to always return a promise to Mocha when doing asynchronous work,
        // Otherwise Mocha will just asume your work is done even if it isn't.

        // Starts our Express Server, so we can test it.
        return startServer(true);
    });

    beforeEach(function() {
        testUser = createFakerUser();
        // create a reandomized test user.

        return User.create(testUser)
            .then(() => { })
            .catch(err => {
                    console.error(err);
            });
    });

    // Mocha Hook: Runs after EACH "it" test block.
    afterEach(function() {
        // Be sure to always return a promise to Mocha when doing asynchronous work,
        // Otherwise Mocha will just asume your work is done even if it isn't.
        return new Promise((resolve, reject) => {
            // deletes the entire database
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

    it ('Should return all users', function() {
        return chai.request(app)
            .get('/api/user')
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                expect(res.body[0]).to.include.keys('id','name','username', 'email');
                expect(res.body[0]).to.not.include.keys('password');
            });
    });

    it('Should return a specific user', function () {
        let foundUser;
        return chai.request(app)
            .get('/api/user')
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                foundUser = res.body[0];
                //console.log('foundUser is ', foundUser);
                return chai.request(app).get(`/api/user/${foundUser.id}`);
            })
            .then(res => {
                //console.log(res);
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body.id).to.equal(foundUser.id);
            });
    });

    it('Should create a new user', function() {
        let newUser = createFakerUser();
        return chai.request(app)
            .post('/api/user')
            .send(newUser)
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.CREATED);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('id', 'name', 'username', 'email');
                expect(res.body.name).to.equal(newUser.name);
                expect(res.body.email).to.equal(newUser.email);
                expect(res.body.username).to.equal(newUser.username);
            });
    });





    function createFakerUser() {

        return {
            name: `${faker.name.firstName()}.${faker.name.lastName()}`,
            username: `${faker.lorem.word()}${faker.random.number(100)}`,
            password: faker.internet.password(5),
            email: faker.internet.email()
        };
    }
});