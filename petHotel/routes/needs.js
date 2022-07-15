// this is the backend

var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET needs listing. */
router.get("/", function (req, res, next) {
  db("SELECT * FROM needs;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/* GET one need */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM needs WHERE needsID = ${id}`);
    let needs = results.data;
    if (needs.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(needs[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
