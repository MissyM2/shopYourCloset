'use strict';
//global.DATABASE_URL = 'mongodb: //localhost/jwt-auth-demo-test';

//  We will be using Mocha as our testing framework, but also
//  Chai which is a library of assertion statements
const mongoose = require('mongoose');
const chai = require('chai');

// we need to require chai-http so that we can test the http layer of the app
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const jwt = require('jsonwebtoken');

//  we need to require our server.js file and its modules app, runServer and closeServer
const { app, runServer, closeServer } = require('../server');
const { User } = require('../users');
const { JWT_SECRET }= require('../config');

// This lets us make HTTP request in our tests.

//  we use `describe` to create the structure for our tests.  `it` is the actual test.
describe('Auth endpoints', function() {
    const username = 'exampleUser';
    const password = 'examplePass';
    const firstName = 'Example';
    const lastName = 'User';

    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    beforeEach(function() {
        return User.hashPassword(password).then(password =>
            User.create({
                username,
                password,
                firstName,
                lastName
            })
        );
    });

    afterEach(function() {
        return User.remove({});
    });

    describe('/api/auth/login', function() {
        it('Should reject requests with no credentials', function() {
            return chai
                .request(app)
                .post('/api/auth/login')
                .then(() =>
                    expect.fail(null, null, 'Request should not succeed')
                )
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(400);
                });
        });
        it('Should reject requests with incorrect usernames', function() {
            return chai
                .request(app)
                .post('/api/auth/login')
                .send({username: 'wrongUsername', password })
                .then(() => 
                    expect.fail(null, null, 'Request should not succeed')
                )
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(401);
                });
        });
        it('should reject request with incorrect passwords', function() {
            return chai
                .request(app)
                .post('/api/auth/login')
                .send({username, password: 'wrongPassword'})
                .then(() =>
                    expect.fail(null, null, 'Request should not succeed')
                    )
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(401);
                });
        });
        it('Should return a valid auth token', function() {
            return chai
                .request(app)
                .post('/api/auth/login')
                .send({username, password})
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    const token = res.body.authToken;
                    expect(token).to.be.a('string');
                    const payload = jwt.verify(token, JWT_SECRET, {
                        algorithm: ['HS256']
                    });
                    expect(payload.user).to.deep.equal({
                        username,
                        firstName,
                        lastName
                    });
                });
        });

    });


    describe('/api/auth/refresh', function() {
        it('Should reject request with no credentials', function () {
            return chai
                .request(app)
                .post('/api/auth/refresh')
                .then(() =>
                    expect.fail(null, null, 'Request should not succeed')
                )
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    
                    const res = err.response;
                    expect(res).to.have.status(401);
                });
        });
        it ('Should reject request with an invalid token', function() {
            const token = jwt.sign(
                {
                    username,
                    firstName,
                    lastName
                },
                'wrongSecret',
                {
                    algorithm: 'HS256',
                    expiresIn: '7d'
                }
            );

            return chai
                .request(app)
                .post('/api/auth/refresh')
                .set('Authorization', `Bearer ${token}`)
                .then(() =>
                    expect.fail(null, null, 'Request should not succeed')
                )
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(401);
                });
        });
        it('Should reject requests with an expired token', function() {
            const token = jwt.sign(
                {
                    user: {
                        username,
                        firstName,
                        lastName
                    },
                    exp: Math.floor(Date.now() / 1000) - 10 //expired ten sections ago
                },
                JWT_SECRET,
                {
                    algorithm: 'HS256',
                    subject: username
                }
            );

            return chai 
                .request(app)
                .post('/api/auth/refresh')
                .set('authorization', `Bearer ${token}`)
                .then(() =>
                    expect.fail(null, null, 'Request should not succeed')
                )
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }

                    const res = err.response;
                    expect(res).to.have.status(401);
                });

        });
        it('Should return a valid auth token with a newer expiry date', function() {
            const token = jwt.sign(
                {
                    user: {
                        username,
                        firstName,
                        lastName
                    }
                },
                JWT_SECRET,
                {
                    algorithm: 'HS256',
                    subject: username,
                    expiresIn: '7d'
                }
            );
            const decoded = jwt.decode(token);

            return chai
                .request(app)
                .post('/api/auth/refresh')
                .set('authorization', `Bearer ${token}`)
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    const token = res.body.authToken;
                    expect(token).to.be.a('string');
                    const payload = jwt.verify(token, JWT_SECRET, {
                        algorithm: ['HS256']
                    });
                    expect(payload.user).to.deep.equal({
                        username,
                        firstName,
                        lastName
                    });
                    expect(payload.exp).to.be.at.least(decoded.exp);
                });
            });
        });
});

   