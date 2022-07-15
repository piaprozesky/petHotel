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
  let { name, species, breed, description } = req.body;

  try {
    let sql = `
          INSERT INTO pets ( name, species, breed, description )
          VALUES ('${name}', '${species}', '${breed}', '${description}')
      `;
    await db(sql);
    res.send({ message: "Registration succeeded" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
