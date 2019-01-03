'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = require('chai').expect;

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

describe('MyCloset API resource', function() {

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    describe('Index Page', function() {
        it('should return the index page for the root url', function() {
            return chai.request(app)
            .get('/')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
            })
        })
    });
})