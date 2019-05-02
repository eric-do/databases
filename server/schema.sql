CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */
-- TODO: figure out if AUTO_INCREMENT is doable in scope of project
CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  PRIMARY KEY (user_id)
);

-- TODO: figure out if AUTO_INCREMENT is doable in scope of project
CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  text_msg VARCHAR(255) NOT NULL,
  room VARCHAR(20) NOT NULL,
  user_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);





/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

