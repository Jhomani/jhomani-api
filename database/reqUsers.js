const requests = require('./requets');

class UserResquest extends requests {
  constructor(collection, schema) {
    super(collection, schema);
  }

  verifyUser(user) {

  }
}

module.exports = UserResquest;