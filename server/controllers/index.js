var models = require('../models');
var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, data) => {
        res.writeHead(200);
        res.write(JSON.stringify(data));
        res.end();
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      db.addMessage(req.body, (err, data) => {
        res.end();
      });
    } // a function which handles posting a message to the database
  },
  
  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      db.addUser(req.body.username, (err, data) => {
        res.end();
      });

    }
  }
};


