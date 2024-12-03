const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  database: process.env.DATABASE,
  //   password: process.env.DB_PASSWORD,
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.log(`📌 ~ db.getConnection ~ err:`, err);
    return;
  }
  console.log('DB connection success');
  connection.release();
});

module.exports = db;
