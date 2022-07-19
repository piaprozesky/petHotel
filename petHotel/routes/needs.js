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
router.get("/:userID", async function (req, res, next) {
  let { userID } = req.params;
  try {
    let results = await db(`SELECT * FROM needs WHERE needsID = ${userID}`);
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

// router.post("/register", async function (req, res, next) {
//   let { medical, exercise, food, special } = req.body; // POST always request data on the body
//   let sql = `INSERT INTO needs (medical, exercise, food, special) VALUES ('${medical}', '${exercise}', '${food}', '${special}')`;

//   try {
//     await db(sql); // insert
//     let results = await db("SELECT * FROM needs");
//     res.send(results.data);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

module.exports = router;
