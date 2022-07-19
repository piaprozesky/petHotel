// this is the backend

var express = require("express");
var router = express.Router();
const db = require("../model/helper");

function toJson(results) {
  let row0 = results.data[0];
  let needs = [];
  if (row0.needsId) {
    needs = results.data.map((n) => ({
      id: n.needsId,
      name: n.name,
    }));
  }
  let hosts = {
    id: row0.hostsId,
    adress: row0.adress,
    name: row0.hostname,
    foto_hosts: row0.foto_hosts,
    foto_place: row0.foto_place,
    needs,
  };
  return hosts;
}

/* GET hosts_needs listing. */
router.get("/", function (req, res, next) {
  db("SELECT * FROM accommodation")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// INSERT a new host into the DB
router.post("/", async function (req, res, next) {
  let { medical, exercise, food, special } = req.body; // POST always request data on the body
  let sqlneeds = `INSERT INTO accomodateNeeds (medical, exercise, food, special) VALUES ('${medical}', '${exercise}', '${food}', '${special}'); SELECT LAST_INSERT_ID() `;

  let accomodateNeedsID = 0;

  try {
    let results = await db(sqlneeds); // insert

    accomodateNeedsID = results.data[0].insertId;
    console.log(results);
    console.log("accomodateNeedsID =", accomodateNeedsID);
  } catch (err) {
    res.status(500).send({ error: err.message });
    return;
  }

  let { address, photo_place, fk_user } = req.body; // POST always request data on the body
  let sql = `INSERT INTO accommodation (address, photo_place, fk_user, fk_accomodateNeeds) VALUES ('${address}', '${photo_place}', '${fk_user}', '${accomodateNeedsID}')`;

  try {
    await db(sql); // insert
    let results = await db("SELECT * FROM accommodation");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
