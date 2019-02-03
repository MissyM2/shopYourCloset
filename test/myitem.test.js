'use strict';

const mongoose = require('mongoose');
const chai = require('chai');

const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken'); // to create a fake web token
const faker = require('faker'); // to create a fake user

const { HTTP_STATUS_CODES, JWT_SECRET, JWT_EXPIRY } = require('../app/config');
const { startServer, stopServer, app } = require('../app/server.js');
// we need both User and Myitem model to test Myitem because it is protected and requires a password to access the endpoint
const { User } = require ('../app/user/user.model');
const { Myitem } = require('../app/myitem/myitem.model');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Integration tests for: /api/myitem', function() {
    let testUser, jwtToken;

    before(function () {
        return startServer(true);
    });

    beforeEach(function() {
        testUser = createFakerUser();

        return User.hashPassword(testUser.password)
            .then(hashedPassword => {
                // create a randomized test user
                return User.create({
                    name: testUser.name,
                    email: testUser.email,
                    username: testUser.username,
                    password: hashedPassword
                }).catch(err => {
                    console.error(err);
                    throw new Error(err);
                });
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

                const seedData = [];
                for (let i=1; i <= 10; i++) {
                    const newMyitem = createFakerMyitem();
                    newMyitem.user = createdUser.id;
                    seedData.push(newMyitem);
                }
                return Myitem.insertMany(seedData)
                    .catch(err => {
                        console.error(err);
                        throw new Error(err);
                    });
            });
    });

    afterEach(function() {

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

    after(function() {
        return stopServer();
    });

    it('Should return user mycloset items', function() {
        return chai.request(app)
            .get('/api/myitem')
            .set('Authorization', `Bearer ${jwtToken}`)
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const myitem = res.body[0];
                expect(myitem).to.include.keys('user','season','color','appareltype','shortdesc','longdesc', 'size');
                expect(myitem.user).to.deep.include({
                    id: testUser.id,
                    username: testUser.username,
                    email: testUser.email,
                    name: testUser.name
                });  
            });
    });

    it ('Should return a specific myitem', function() {
        let foundMyitem;
        return Myitem.find()
            .then(myitems => {
                expect(myitems).to.be.a('array');
                expect(myitems).to.have.lengthOf.at.least(1);
                foundMyitem = myitems[0];

                return chai.request(app)
                    .get(`/api/myitem/${foundMyitem.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('user','season','color','appareltype','shortdesc','longdesc', 'size');
                expect(res.body).to.deep.include({
                    season: foundMyitem.season,
                    color: foundMyitem.color,
                    appareltype: foundMyitem.appareltype,
                    shortdesc: foundMyitem.shortdesc,
                    longdesc: foundMyitem.longdesc,
                    size: foundMyitem.size
                });
            });
    });

    it('Should update a specific myitem', function() {
        let myitemToUpdate;
        const newMyitemData = createFakerMyitem();
        return Myitem.find()
            .then(myitems => {
                expect(myitems).to.be.a('array');
                expect(myitems).to.have.lengthOf.at.least(1);
                myitemToUpdate = myitems[0];

                return chai.request(app)
                    .put(`/api/myitem/${myitemToUpdate.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .send(newMyitemData);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.NO_CONTENT);
                return Myitem.findById(myitemToUpdate.id);
            })
            .then(myitem => {
                expect(myitem).to.be.a('object');
                expect(myitem).to.deep.include({
                    season: newMyitemData.season,
                    color: newMyitemData.color,
                    appareltype: newMyitemData.appareltype,
                    shortdesc: newMyitemData.shortdesc,
                    longdesc: newMyitemData.longdesc,
                    size: newMyitemData.size
                });
            });
    });


    it ('Should delete a specific myitem', function() {
        let myitemToDelete;
        return Myitem.find()
            .then(myitems => {
                expect(myitems).to.be.a('array');
                expect(myitems).to.have.lengthOf.at.least(1);
                myitemToDelete = myitems[0];

                return chai.request(app)
                    .delete(`/api/myitem/${myitemToDelete.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.NO_CONTENT);

                return Myitem.findById(myitemToDelete.id);
            })
            .then(myitem => {
                expect(myitem).to.not.exist;
            });
    });

    function createFakerUser() {
        return {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            username: `${faker.lorem.word()}${faker.random.number(100)}`,
            password: faker.internet.password(),
            email: faker.internet.email()
        };
    }

    function createFakerMyitem() {
        return {
            season: faker.lorem.word(),
            color: faker.commerce.color(),
            appareltype: faker.commerce.productName(),
            shortdesc: faker.commerce.productAdjective(),
            longdesc: faker.lorem.sentence(),
            size: faker.lorem.text(1)
        }
    }
});
