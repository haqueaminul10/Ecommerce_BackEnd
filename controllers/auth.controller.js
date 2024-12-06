const db = require('../config/db.connection.js');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

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
    return res.status(502).json({
      message: 'Interner server error',
    });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'All field required',
      });
    }

    const userEmailQuery = `SELECT * FROM user WHERE email=?`;
    db.query(userEmailQuery, [email], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Database error',
        });
      } else if (result.length == 0) {
        return res.status(404).json({
          message: 'User not found',
        });
      } else {
        const user = result[0];
        if (user.password !== password) {
          return res.status(401).json({
            message: 'User not found',
          });
        }
        const payload = {
          id: user.id,
          username: user.username,
          image: user.image,
          email: user.email,
          usertype: user.usertype,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({
          message: 'Login successfully',
          token,
          payload,
        });
      }
    });
  } catch (error) {
    return res.status(502).json({
      message: 'Interner server error',
    });
  }
};

module.exports = { register, logIn };
