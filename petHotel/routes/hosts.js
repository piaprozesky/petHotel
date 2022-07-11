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
  db("SELECT * FROM hosts;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/* GET one host */
router.get("/:id", async function (req, res, next) {
  // let hosts = res.locals.hosts; // "locals" is because Jim have guards
  let { id } = req.params; // as long as i'm not checking existing
  try {
    let sql = `
    SELECT h.*, n.*, h.id AS hostsId, n.id AS needsId, h.name AS hostname
            FROM hosts AS h
            LEFT JOIN hosts_needs AS hn ON h.id = hn.fk_hostsId
            LEFT JOIN needs AS n ON hn.fk_needsId = n.id
            WHERE h.id = ${id}
    `;

    let results = await db(sql);

    let host = toJson(results);

    res.send(host);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new host into the DB
router.post("/", async function (req, res, next) {
  // tried and works!!
  //your code here
  let { name, foto_hosts, foto_place, adress } = req.body; // POST always request data on the body
  let sql = `INSERT INTO hosts (name, foto_hosts, foto_place, adress) VALUES ('${name}', '${foto_hosts}', '${foto_place}', '${adress}')`;

  try {
    await db(sql); // insert
    let results = await db("SELECT * FROM hosts");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
