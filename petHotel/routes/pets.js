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

// /* GET one pet */
// router.get("/:id", async function (req, res, next) {
//   let { id } = req.params;
//   try {
//     let sql = `
//       SELECT p.*, n.*, p.id AS petsId, n.id AS needsId
//               FROM pets AS p
//               LEFT JOIN pets_needs AS pn ON p.id = pn.fk_needsId
//               LEFT JOIN needs AS n ON pn.fk_needsId = n.id
//               WHERE p.id = ${id}
//       `;

//     let results = await db(sql);
//     res.send(results.data);

//     function toJson(results) {
//       let row0 = results.data[0];
//       let needs = [];
//       if (row0.needsId) {
//         needs = results.data.map((b) => ({
//           id: n.needsId,
//           name: n.needs,
//         }));
//       }
//       let pets = {
//         id: row0.petsId,
//         name: row0.name,
//         species: row0.species,
//         needs,
//       };
//       return pets;
//     }
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

module.exports = router;
