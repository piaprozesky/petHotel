// this is the backend

var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET pets listing. */
router.get("/", function (req, res, next) {
  db("SELECT * FROM pets;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/*POST new pet */
router.post("/register", async (req, res) => {
  let { medical, exercise, food, special } = req.body; // POST always request data on the body
  let sqlneeds = `INSERT INTO needs (medical, exercise, food, special) VALUES ('${medical}', '${exercise}', '${food}', '${special}'); SELECT LAST_INSERT_ID()`;

  let needsID = 0;

  try {
    let results = await db(sqlneeds); // insert

    needsID = results.data[0].insertId;
    console.log("needsID =", needsID);
  } catch (err) {
    res.status(500).send({ error: err.message });
    return;
  }

  let { name, species, breed, description, fk_user } = req.body;

  try {
    let sql = `
          INSERT INTO pets (name, species, breed, description, fk_needs, fk_user )
          VALUES ('${name}', '${species}', '${breed}', '${description}', ${needsID}, ${fk_user})
      `;
    await db(sql);
    res.send({ message: "Registration succeeded" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
