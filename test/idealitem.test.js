'use strict';

const mongoose = require('mongoose');
const chai = require('chai');

const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken');
const faker = require('faker');

const { HTTP_STATUS_CODES, JWT_SECRET, JWT_EXPIRY } = require('../app/config');
const { startServer, stopServer, app} = require('../app/server.js');

const { User } = require('../app/user/user.model');
const { Idealitem } = require('../app/idealitem/idealitem.model');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Integration test for: /api/idealitem', function() {
    let testUser, jwtToken;

    before(function() {
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
                for(let i=1; i<=10; i++ ){
                    const newIdealitem = createFakerIdealitem();
                    newIdealitem.user = createdUser.id;
                    seedData.push(newIdealitem);
                }
                return Idealitem.insertMany(seedData)
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

    it('Should return user idealcloset items', function() {
        return chai.request(app)
            .get('/api/idealitem')
            .set('Authorization', `Bearer ${jwtToken}`)
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const idealitem = res.body[0];
                expect(idealitem).to.include.keys('user','season','color','appareltype','shortdesc','longdesc', 'size');
                expect(idealitem.user).to.deep.include({
                    id: testUser.id,
                    username: testUser.username,
                    email: testUser.email,
                    name: testUser.name
                });
            });
    });

    it('Should return a specific idealitem', function() {
        let foundIdealitem;

        return Idealitem.find()
            .then(idealitems => {
                expect(idealitems).to.be.a('array');
                expect(idealitems).to.have.lengthOf.at.least(1);
                foundIdealitem = idealitems[0];

                return chai.request(app)
                    .get(`/api/idealitem/${foundIdealitem.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('user','season','color','appareltype','shortdesc','longdesc', 'size');
                expect(res.body).to.deep.include({
                    season: foundIdealitem.season,
                    color: foundIdealitem.color,
                    appareltype: foundIdealitem.appareltype,
                    shortdesc: foundIdealitem.shortdesc,
                    longdesc: foundIdealitem.longdesc,
                    size: foundIdealitem.size
                });
            });
    });

    it('Should update a specific idealitem', function() {
        let idealitemToUpdate;

        const newIdealitemData = createFakerIdealitem();
        //console.log(newIdealitemData);
        return Idealitem.find()
            .then(idealitems => {
                expect(idealitems).to.be.a('array');
                expect(idealitems).to.have.lengthOf.at.least(1);
                idealitemToUpdate = idealitems[0];

                return chai.request(app)
                    .put(`/api/idealitem/${idealitemToUpdate.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .send(newIdealitemData);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.NO_CONTENT);

                return Idealitem.findById(idealitemToUpdate.id);
            })
            .then(idealitem => {
                //console.log('idealitem is ', idealitem);
                //console.log('idealitemToUpdate', idealitemToUpdate);
                expect(idealitem).to.be.a('object');
                expect(idealitem).to.deep.include({
                    season: newIdealitemData.season,
                    color: newIdealitemData.color,
                    appareltype: newIdealitemData.appareltype,
                    shortdesc: newIdealitemData.shortdesc,
                    longdesc: newIdealitemData.longdesc,
                    size: newIdealitemData.size
                });
            });
    });

    it('Should delete a specific idealitem', function() {
        let idealitemToDelete;
        return Idealitem.find()
            .then(idealitems => {
                expect(idealitems).to.be.a('array');
                expect(idealitems).to.have.lengthOf.at.least(1);
                idealitemToDelete = idealitems[0];

                return chai.request(app)
                    .delete(`/api/idealitem/${idealitemToDelete.id}`)
                    .set('Authorization',`Bearer ${jwtToken}`);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.NO_CONTENT);

                return Idealitem.findById(idealitemToDelete.id);
            })
            .then(idealitem => {
                expect(idealitem).not.to.exist;
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

    function createFakerIdealitem() {
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