'use strict';

//  We will be using Mocha as our testing framework, but also
//  Chai which is a library of assertion statements
const mongoose = require('mongoose');
const chai = require('chai');

// we need to require chai-http so that we can test the http layer of the app
const chaiHttp = require('chai-http');
const faker = require('faker');

//  we need to require our server.js file and its modules app, runServer and closeServer
const { HTTP_STATUS_CODES }= require('../app/config');
const { app, startServer, stopServer } = require('../app/server');
const { Clothingoption } = require('../app/admin/clothingoption.model');

const expect = chai.expect; 
chai.use(chaiHttp);  // This lets us make HTTP request in our tests.

//  we use `describe` to create the structure for our tests.  `it` is the actual test.
describe('Integration tests for: /api/clothingoption', function() {
    let testUser, jwtToken;

    before(function() {
        return startServer(true);
    });

    
    beforeEach(function() {
        console.info('seeding clothing option data');
        const seedData = [];
        for (let i=1; i <= 10; i++) {
            const newClothingoption = createFakerClothingoption();
            seedData.push(newClothingoption);
        }
        return Clothingitem.insertMany(seedData);
    });

    // Mocha Hook: Runs after EACH "it" test block.
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

    it('Should return clothingoption items', function() {
        return chai.request(app)
            .get('/api/clothingoption')
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const myclothingoption = res.body[0];
                expect(myclothingoption).to.include.keys('color','shortdesc','longdesc');
            });
    });

    it ('Should return a specific clothing option', function() {
        let foundClothingoption;
        return Clothingoption.find()
            .then(clothingOptions => {
                expect(clothingOptions).to.be.a('array');
                expect(clothingOptions).to.have.lengthOf.at.least(1);
                foundClothingoption = clothingOptions[0];

                return chai.request(app)
                    .get(`/api/myitem/${foundMyitem.id}`);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('color','shortdesc','longdesc');
                expect(res.body).to.deep.include({
                    color: foundClothingoption.color,
                    shortdesc: foundClothingoption.shortdesc,
                    longdesc: foundClothingoption.longdesc,
                });
            });
    });

    it('Should update a specific clothing option', function() {
        let clothingoptionToUpdate;
        const newClothingoptionData = createFakerMyitem();
        return Clothingoption.find()
            .then(clothingoptions => {
                expect(clothingoptions).to.be.a('array');
                expect(clothingoptions).to.have.lengthOf.at.least(1);
                clothingoptionToUpdate = clothingoptions[0];

                return chai.request(app)
                    .put(`/api/myitem/${myitemToUpdate.id}`)
                    .send(newClothingoptionData);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.NO_CONTENT);
                return Clothingoption.findById(clothingoptionToUpdate.id);
            })
            .then(clothingoption => {
                expect(clothingoption).to.be.a('object');
                expect(clothingoption).to.deep.include({
                    color: newClothingoptionData.color,
                    shortdesc: newClothingoptionData.shortdesc,
                    longdesc: newClothingoptionData.longdesc,
                });
            });
    });


    it ('Should delete a specific myitem', function() {
        let clothingoptionToDelete;
        return Clothingoption.find()
            .then(clothingoptions => {
                expect(clothingoptions).to.be.a('array');
                expect(clothingoptions).to.have.lengthOf.at.least(1);
                clothingoptionToDelete = clothingoptions[0];

                return chai.request(app)
                    .delete(`/api/myitem/${myitemToDelete.id}`);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.NO_CONTENT);

                return Clothingoption.findById(clothingoptionToDelete.id);
            })
            .then(clothingoption => {
                expect(clothingoption).to.not.exist;
            });
    });

    function createFakerClothingoption() {
        return {
            color: faker.commerce.color(),
            shortdesc: faker.commerce.productAdjective(),
            longdesc: faker.lorem.sentence(),
        };
    };
});