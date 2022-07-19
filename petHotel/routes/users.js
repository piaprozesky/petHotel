var express = require("express");
var router = express.Router();
const { ensureSameUser, ensureUserLoggedIn } = require("../middleware/guards");
const db = require("../model/helper");

function joinToJson(results) {
  // Create array of applicants objs
  let pets = results.data.map((row) => ({
    petID: row.petID,
    name: row.petName,
    species: row.species,
    breed: row.breed,
    description: row.description,
  }));
  // Create posts obj from first row
  let row0 = results.data[0];
  console.log(results.data);
  let posts = {
    userID: row0.userID,
    username: row0.username,
    name: row0.name,
    email: row0.email,
    hashPass: row0.hashPass,
    profilePicture: row0.profilePicture,
    host: row0.host,
    pets,
  };
  return posts;
}

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

router.get("/:userID", ensureSameUser, async function (req, res, next) {
  let { userID } = req.params;
  // let sql = `SELECT * FROM users WHERE userID = ${id}`;

  let sql = `SELECT pets.name AS petName, pets.*, users.*
  FROM users LEFT JOIN pets ON pets.fk_user = users.userID WHERE users.userID = ${userID} 
  `;

  try {
    let results = await db(sql);
    let user = joinToJson(results);
    // res.send(results.data);

    // let user = results.data[0];
    delete user.password;
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
