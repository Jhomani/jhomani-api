const { verify } = require('jsonwebtoken');
const secret = require('../secret');

function auth(req, res, next) {
  console.log('middlewere');
}

module.exports = auth;