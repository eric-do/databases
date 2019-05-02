var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.getAllMessages((err, data) => {
        if (err) { return callback (err); }
        callback(null, data);
      })
    },
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

