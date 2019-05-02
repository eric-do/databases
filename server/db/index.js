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

    db.query(`INSERT INTO users (username) VALUES ('${user}')`, (err, data) => {
      if (err) { throw new Error ('error insert user'); }

      db.query( `SELECT * FROM users`, (err, data) => {
        if (err){ throw new Error (' error query table'); }
        console.log(JSON.stringify(data));
        callback(null, data);
      });
    });
  },

  addMessage: (message, callback) => {
    // input is a message obj with attributes user msg and room
    // return nothing
    // Get user id, which needs a callback function
    // In our callback function, we will insert message to messages table
    //  Messages, room, and link the user id to the user_id FK
    
    module.exports.getUserId(message.username, (err, user_id) => {
      db.query(`INSERT INTO messages (text_msg, room, user_id) 
                VALUES ('${message.message}', '${message.roomname}', '${user_id}')`, (err, data) =>{
                callback(null, data);
      })
    });
  


  },
  
  getUserId: (username, callback) => {
    db.query(`SELECT * from users WHERE username = '${username}'`, (err, data) => {
      if (err) { throw new Error ('[mysql error] error querying for user'); }
      console.log(data.username, data.user_id);
      callback(null, data.user_id);
    })
  }

}




/* Functions */
//dbConnection.query('SELECT * FROM users', done);