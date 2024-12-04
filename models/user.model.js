const db = require('../config/db.connection.js');

const userTable = `
    CREATE TABLE IF NOT EXISTS user(
    
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL ,
    email VARCHAR(50) UNIQUE NOT NULL,
    contactnumber VARCHAR(20) ,
    dob VARCHAR(40),
    IDno VARCHAR(15),
    gender VARCHAR(10),
    country VARCHAR(20),
    image VARCHAR(255),
    password VARCHAR(100) NOT NULL,
    usertype ENUM('admin','vendor','user') NOT NULL
    )
`;

db.query(userTable, (err, result) => {
  if (err) {
    console.log(`📌 ~ db.query ~ err:`, err);
  }
  // else {
  //   console.log('📌 ~ User table created successfully');
  // }
});
