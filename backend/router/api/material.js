const express = require("express");
const { material } = require("../../database/connection");
const db = require("../../database/connection");

const materialRouter = express.Router();

//---------------------------------------------------------------------------------------------------------------------//
// GET COMMANDS FOR MATERIALS  //

materialRouter.get("/allmaterials", async (req, res) => {
	try {
		const material = await db.material.findMany();
		res.json(material);
	} catch (e) {
		res.status(500).send(`error [/api/allmaterials] : ${e}`);
	}
});

// Report to view material supply orders
materialRouter.get("/materials", async (req, res) => {
	try {
		const materials = await db.$queryRaw`SELECT m.material_id, m.material_name, s.supplier_name, m.material_cost, soli.soli_count, so.so_total
  FROM material m
  join supplier_item si on m.material_id = si.material_id
  join supplier s on s.supplier_id = si.supplier_id
  join supply_order_line_item soli on soli.material_id = m.material_id
  join supply_order so on so.so_id = soli.so_id;`;
		res.json(materials);
	} catch (e) {
		res.status(500).send(`error [/api/materials] ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// POST COMMANDS FOR MATERIALS  //

materialRouter.post("/newMaterial", async (req, res) => {
	try {
		const post = await db.$executeRaw`
    CALL place_supply_order(${req.body.so_id}, ${req.body.material_name}, ${req.body.material_desc}, ${req.body.material_cost},${req.body.supplier_id}, ${req.body.qty})`;
		res.json(post);
	} catch (e) {
		res.status(500).send(`error [/api/newMaterial] ${e}`);
	}
});

/* materialRouter.post("/newMaterial", async (req, res) => {
	try {
		const { material_name, material_desc, material_cost } = req.body;

		const material = await db.material.create({
			data: {
				material_name,
				material_desc,
				material_cost,
			},
		});
		res.json(material);
	} catch (e) {
		res.status(500).send(`error [/api/newmaterial]: ${e}`);
	}
}); */

//---------------------------------------------------------------------------------------------------------------------//
// UPDATE COMMANDS FOR MATERIALS //

//** Update method for existing material */

materialRouter.put("/updateMaterial/:material_id", async (req, res) => {
	try {
		const { material_name, material_desc, material_cost } = req.body;
		const materialUp = Number(req.params.material_id);
		const material_update = await db.material.update({
			where: {
				material_id: materialUp,
			},
			data: { material_name, material_desc, material_cost },
		});
		res.json(material_update);
	} catch (e) {
		res.status(500).send(`error [/api/updateMaterial]: ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
/// DELETE COMMANDS FOR MATERIALS ///

// *** Error FK constraint failed material_id *** //
// *** Would first need to delete the cooresponding supply order line item *** //
// *** May be a constraint on supplier item as well *** //

//** Above issues were fixed by adding Cascade Action to Delete  */
materialRouter.delete("/deleteMaterial/:material_id", async (req, res) => {
	try {
		const materialID = Number(req.params.material_id);
		const deleteMaterial = await db.material.deleteMany({
			where: {
				material_id: materialID,
			},
		});
		res.json(deleteMaterial);
	} catch (e) {
		res.status(500).send(`error [/api/deleteMaterial] ${e}`);
	}
});

module.exports = materialRouter;
