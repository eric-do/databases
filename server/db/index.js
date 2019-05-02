var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

db = mysql.createConnection({
    user: 'student',
    password: 'student',
    database: 'chat'
  });
  db.connect();

// Establish database connection
module.exports = {
  addUser: (user, callback) => {
    //Input: user as string and then callback function
    //return nothing
    // Query DB
    //  If user exists: callback (null, data)
    //  Else: insert user into table
    //   on complete query table
    //   finally execute CB
    
    db.query(`SELECT * FROM users WHERE username = '${user}'`, (err, data) => {
      console.log('ALL USERS IN THE DB MATCHING USERNAME');
      if (err) { throw new Error ('error querying username'); }
      if (data.length === 0) {
        db.query(`INSERT INTO users (username) VALUES ('${user}')`, (err, data) => {
          if (err) { throw new Error ('error insert user'); }
          db.query( `SELECT * FROM users`, (err, data) => {
            if (err){ throw new Error (' error query table'); }
            console.log(JSON.stringify(data));
            callback(null, data);
          });
        });
      } else {
        console.log(`DUPLICATE USER. USERID: ${data[0].user_id}`);
        callback(null, data[0].user_id);
      }
    })
  },

  addMessage: (message, callback) => {
    // input is a message obj with attributes user msg and room
    // return nothing
    // Get user id, which needs a callback function
    // In our callback function, we will insert message to messages table
    //  Messages, room, and link the user id to the user_id FK
    console.log("MESSAGE TO BE ADDED");
    console.log(message);
    module.exports.getUserId(message.username, (err, user_id) => {
      var query = `INSERT INTO messages (text_msg, room, user_id) 
                   VALUES (${db.escape(message.message)}, '${message.roomname}', ${user_id})`;
      console.log(query);
      db.query(query, (err, data) =>{
        if (err) { throw new Error ('[mySQL error] error inserting message'); }
        console.log('MESSAGE HAS BEEN INSERTED');
        db.query(`SELECT * FROM messages`, (err, data) => {
          if (err) { throw new Error ('[mySQL error] error querying messages'); }
          console.log(data);
          callback(null, data);
        });    
      });
    });
  },

  getUserId: (username, callback) => {
    // Input: username, call back function
    // Return: nothing
    // Query the database for user matching username
    // Run callback function passing user_id
    db.query(`SELECT * from users WHERE username = '${username}'`, (err, data) => {
      if (err) { throw new Error ('[mysql error] error querying for user'); }
      console.log(data[0]);
      callback(null, data[0].user_id);
    });
  },

  getAllMessages: (callback) => {
    // Input: username, call back function
    // Return: nothing
    // Query the database from all users
    // Run callback function on data 
    db.query(`SELECT * from messages`, (err, data) => {
      if (err) { return callback(new Error('[mySQL error] error querying for all messages')); }
      callback(null, data);
    });
  }

}




/* Functions */
//dbConnection.query('SELECT * FROM users', done);