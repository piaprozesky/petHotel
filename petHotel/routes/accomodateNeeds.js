// this is the backend

var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET accomodateNeeds listing. */
router.get("/", function (req, res, next) {
  db("SELECT * FROM accomodateNeeds;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/* GET one accomodateNeeds */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(
      `SELECT * FROM accomodateNeeds WHERE accomodateNeedsID = ${id}`
    );
    let accomodateNeeds = results.data;
    if (accomodateNeeds.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(accomodateNeeds[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new accomodateNeeds into the DB
router.post("/", async function (req, res, next) {
  let { medical, exercise, food, special } = req.body; // POST always request data on the body
  let sql = `INSERT INTO accomodateNeeds (medical, exercise, food, special) VALUES ('${medical}', '${exercise}', '${food}', '${special}')`;

  try {
    await db(sql); // insert
    let results = await db("SELECT * FROM accomodateNeeds");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;
