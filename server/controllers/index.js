var models = require('../models');
var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, data) => {
        if (err) { console.log(err); }
        res.writeHead(200);
        res.write(JSON.stringify(data));
        res.end();
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req, (err, data) => {
        res.end();
      });
    } // a function which handles posting a message to the database
  },
  
  users: {
    // Ditto as above
    get: function (req, res, callback) {
      models.users.get((err, data) => {
        if (err) { console.log(err); }
        res.writeHead(200);
        res.write(JSON.stringify(data));
        res.end();
      });
    },
    post: function (req, res) {
      models.users.post(req, (err, data) => {
        if (err) { console.log(err); }
        res.end();
      });
    }
  }
};


