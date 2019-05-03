var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.getAllMessages((err, data) => {
        if (err) { return callback (err); }
        callback(null, data);
      });
    },
    post: function (req, callback) {
      db.addMessage(req.body, (err, data) => {
        if (err) { return callback (err); }
        callback(null);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      db.getAllUsers((err, data) => {
        if (err) { return callback(err); }
        callback(null, data);
      });
    },
    post: function (req, callback) {
      db.addUser(req.body.username, (err, data) => {
        if (err) { return callback(err); }
        callback(null, data);
      });
    }
  }
};

