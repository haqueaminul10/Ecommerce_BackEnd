// REQUIRE EXPRESS
const express = require('express');
const app = express();
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

//DOTENV
const dotenv = require('dotenv');
dotenv.config();

//REQUIRE DATABASE
const db = require('./config/db.connection.js');

//DATABASE MODEL
const user = require('./models/user.model.js');

//ROUTES
const authRouter = require('./routes/auth.route.js');
app.use('/api/auth', authRouter);

// PORT
const PORT = process.env.PORT;

//SERVER LISTEN
app.listen(PORT, (error) => {
  if (error) {
    console.log(`📌 ~ app.listen ~ error:`, error);
  } else {
    console.log(`server is running ${PORT}`);
  }
});
