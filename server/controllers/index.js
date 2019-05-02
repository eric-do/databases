var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('hi messages');
    } // a function which handles posting a message to the database
  },
  
  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      console.log('Hi usersssss');
      console.log(typeof req.body);
    }
  }
};

