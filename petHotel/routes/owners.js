// this is the backend

var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET owners listing. */
router.get("/", function (req, res, next) {
  db("SELECT * FROM owners;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/* GET one owner */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM owners WHERE id = ${id}`);
    let owners = results.data;
    if (owners.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(owners[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new owners into the DB
router.post("/", async function (req, res, next) {
  // tried and works!!
  //your code here
  let { name, image, adress } = req.body; // POST always request data on the body
  let sql = `INSERT INTO owners (name, image, adress) VALUES ('${name}', '${image}', '${adress}')`;

  try {
    await db(sql); // insert
    let results = await db("SELECT * FROM owners");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;
