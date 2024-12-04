const db = require('../config/db.connection.js');
//REGISTER API
const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      usertype,
      contactnumber,
      dob,
      IDno,
      gender,
      country,
      image,
    } = req.body;
    if (!username || !email || !password || !usertype) {
      return res.status(400).json({
        message: 'All field required',
      });
    }

    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidation.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingUserQuery = `SELECT * FROM user WHERE email =?`;
    db.query(existingUserQuery, [email], (err, result) => {
      if (result.length > 0) {
        return res.status(409).json({
          message: 'User already exists',
        });
      } else if (err) {
        return res.status(500).json({
          message: 'Database error',
        });
      } else {
        const newUserQuery = `INSERT INTO user(username, email, password, usertype,contactnumber,dob,IDno,gender,country,image) VALUES(?,?,?,?,?,?,?,?,?,?)`;
        db.query(
          newUserQuery,
          [
            username,
            email,
            password,
            usertype,
            contactnumber,
            dob,
            IDno,
            gender,
            country,
            image,
          ],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: 'Database error',
              });
            } else {
              return res.status(201).json({
                message: 'User registation successfully',
              });
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(`📌 ~ register ~ error:`, error);
  }
};

module.exports = { register };
