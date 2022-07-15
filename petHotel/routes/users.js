var express = require("express");
var router = express.Router();
const { ensureSameUser, ensureUserLoggedIn } = require("../middleware/guards");
const db = require("../model/helper");

router.get("/", ensureUserLoggedIn, async function (req, res, next) {
  let sql = "SELECT * FROM users ORDER BY username";

  try {
    let results = await db(sql);
    let users = results.data;
    users.forEach((u) => delete u.hashPass);
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/:id", ensureSameUser, async function (req, res, next) {
  let { id } = req.params;
  let sql = `SELECT * FROM users WHERE userID = ${id}`;

  try {
    let results = await db(sql);
    // We know user exists because they is logged in!
    let user = results.data[0];
    delete user.hashPass; // don't return the password
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
