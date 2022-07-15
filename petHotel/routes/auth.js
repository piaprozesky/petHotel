var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../model/helper");

// Register new user
router.post("/register", async (req, res) => {
  let { username, name, email, password, profilepicture, host } = req.body;
  let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

  const userFound = await db(
    `SELECT email FROM users WHERE email = '${email}'`
  );

  if (userFound.data.length > 0) {
    res.send("user already exists");
  } else {
    const usernameFound = await db(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    if (usernameFound.data.length > 0) {
      res.send("Username not available");
    } else {
      try {
        let sql = `
            INSERT INTO users ( username, name, email, hashPass, profilepicture, host )
            VALUES ('${username}', '${name}', '${email}', '${hashedPassword}', '${profilepicture}', ${host})
        `;
        await db(sql);
        res.send({ message: "Registration succeeded" });
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    }
  }
});

// Login user
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  console.log(username, password);
  try {
    let results = await db(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    if (results.data.length === 0) {
      res.status(401).send({ error: "Login failed" });
    } else {
      let user = results.data[0];
      let passwordsEqual = await bcrypt.compare(password, user.hashPass);
      if (passwordsEqual) {
        // Passwords match
        let payload = { userID: user.userID };
        console.log(user.userID);
        // Create token containing user ID
        let token = jwt.sign(payload, SECRET_KEY);
        // Also return user (without password)
        delete user.password;
        res.send({
          message: "Login succeeded",
          token: token,
          user: user,
        });
      } else {
        // Passwords don't match
        res.status(401).send({ error: "Login failed" });
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
