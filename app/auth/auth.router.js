'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');  // https://jwt.io/introduction/

const { JWT_SECRET, JWT_EXPIRY} = require('../config');
const {localPassportMiddleware, jwtPassportMiddleware } = require('../auth/auth.strategy');

const authRouter = express.Router();

function createJwtToken(user) {
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

// The user provides a username and password to login
authRouter.post('/login', localPassportMiddleware, (request, response) => {
  const user = request.user.serialize();
  const jwtToken = createJwtToken(user);
  console.log(user);
  response.json({jwtToken, user});
});

// The user exchanges a valid JWT for a new one with a later expiration
authRouter.post('/refresh', jwtPassportMiddleware, (request, response) => {
  const user = request.user;
  const jwtToken = createJwtToken(user);
  response.json({jwtToken,user});
});

module.exports = {authRouter};