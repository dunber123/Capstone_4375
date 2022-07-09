const express = require("express");
const db = require("../../database/connection");

const supplyRouter = express.Router();

//---------------------------------------------------------------------------------------------------------------------//
// GET COMMANDS FOR SUPPLIERS - SUPPLY_ORDER  //

//* host.com/api/suppliers - Retrieves all active suppliers
// * Report 5 * //
supplyRouter.get("/suppliers", async (req, res) => {
	try {
		const suppliers = await db.supplier.findMany();
		res.json(suppliers);
	} catch (e) {
		res.status(500).send(`error [/api/suppliers] : ${e}`);
	}
});

supplyRouter.get("/suppliers/:supplier_id", async (req, res) => {
	try {
		const sup_id = Number(req.params.supplier_id);
		const sup_one = await db.supplier.findUnique({
			where: {
				supplier_id: sup_id,
			},
		});
		res.json(sup_one);
	} catch (e) {
		res.status(500).send(`error [/api/suppliers] : ${e}`);
	}
});

//* host.com/api/suppliersandorders
//* Report 6 - Report of suppliers with at least 1 purchase order */
supplyRouter.get("/suppliersAndOrders", async (req, res) => {
	try {
		const suppliersAndOrders = await db.$queryRaw`select capstone.supply_order.supplier_id, supplier_name,COUNT(capstone.supply_order.so_id) AS count,
    SUM(so_total) AS total
    from capstone.supply_order
    join capstone.supplier
    on capstone.supply_order.supplier_id = capstone.supplier.supplier_id
    Group by capstone.supply_order.supplier_id`;
		res.json(suppliersAndOrders);
	} catch (e) {
		res.status(500).send(`error [/api/SuppliersAndOrders] : ${e}`);
	}
});

//* host.com/api/supplyorder
//* Report 1 - get order number, order date, payment method, material, supplier name - grouped by order number
supplyRouter.get("/supplyOrder", async (req, res) => {
	try {
		const supplyOrder = await db.$queryRaw`select ol.so_id, so_date, so_payment_methods, material_name, supplier_name, soli_count as quantity
		from capstone.supply_order_line_item ol
		join material m
		on m.material_id = ol.material_id
		join capstone.supply_order so
		on so.so_id = ol.so_id
		join capstone.supplier s
		on s.supplier_id = so.supplier_id`;
		res.json(supplyOrder);
	} catch (e) {
		res.status(500).send(`error [ ] : ${e}`);
	}
});

supplyRouter.get("/allSupplyOrders", async (req, res) => {
	try {
		const allsupply = await db.supply_order.findMany();
		res.json(allsupply);
	} catch (e) {
		res.status(500).send(`error [/api/allSupplyOrders] : ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// POST COMMANDS FOR SUPPLIERS - SUPPLY_ORDER  //

//* Post command for a new supplier
//* host.com/api/newsupplier
supplyRouter.post("/newSupplier", async (req, res) => {
	try {
		const {
			supplier_name,
			supplier_address,
			supplier_address_two,
			supplier_city,
			supplier_state,
			supplier_zip,
			supplier_contact_f_name,
			supplier_contact_l_name,
			supplier_contact_email,
			supplier_notes,
		} = req.body;
		const supplier = await db.supplier.create({
			data: {
				supplier_name,
				supplier_address,
				supplier_address_two,
				supplier_city,
				supplier_state,
				supplier_zip,
				supplier_contact_f_name,
				supplier_contact_l_name,
				supplier_contact_email,
				supplier_notes,
			},
		});
		res.json(supplier);
	} catch (e) {
		res.status(500).send(`error [/api/newSupplier]: ${e}`);
	}
});

//* Post command for a new supplier item (FK Constraint - Supplier must be present first)
//* host.com/api/newsupplieritem
supplyRouter.post("/newSupplierItem", async (req, res) => {
	try {
		const supplierItem = await db.supplier_item.create({
			data: ({ supplier_id, material_id, si_name } = req.body),
		});
		res.json({
			success: true,
			payload: supplierItem,
		});
	} catch (e) {
		res.status(500).send(`error [/api/newSupplierItem]: ${e}`);
	}
});

//* Post command for a new supply order
//* host.com/api/newsupplyorder
/* supplyRouter.post("/newSupplyOrder", async (req, res) => {
	try {
		const { so_date, supplier_id, so_payment_methods, so_subtotal, so_shipping, so_tax, so_total } = req.body;

		const supplyOrder = await db.supply_order.create({
			data: {
				so_date: new Date(so_date),
				supplier_id,
				so_payment_methods,
				so_subtotal,
				so_shipping,
				so_tax,
				so_total,
			},
		});
		res.json(supplyOrder);
	} catch (e) {
		res.status(500).send(`error [/api/newSupplyOrder] : ${e}`);
	}
}); */

supplyRouter.post("/newSupplyOrder", async (req, res) => {
	try {
		const post = await db.$executeRaw`
  CALL insert_supply_order(${req.body.so_date},${req.body.supplier_id},${req.body.so_payment_methods},${req.body.so_subtotal},${req.body.so_shipping})`;
		res.json(post);
	} catch (e) {
		res.status(500).send(`error [/api/newSupplyOrder] : ${e}`);
	}
});

//* Post command for new supply order line item
//* host.com/api/newsoli
supplyRouter.post("/newsoli", async (req, res) => {
	try {
		const { so_id, material_id, soli_count, soli_discount } = req.body;
		const supplyOrderLineItem = await db.supply_order_line_item.create({
			data: { so_id, material_id, soli_count, soli_discount },
		});
		res.json(supplyOrderLineItem);
	} catch (e) {
		res.status(500).send(`errror [/api/newsoli] : ${e}`);
	}
});

///               UPDATE ROUTES FOR SUPPLIER / SUPPLY ORDER         ///

supplyRouter.put("/updateSupplier/:supplier_id", async (req, res) => {
	try {
		const {
			supplier_name,
			supplier_address,
			supplier_address_two,
			supplier_city,
			supplier_state,
			supplier_zip,
			supplier_contact_f_name,
			supplier_contact_l_name,
			supplier_contact_email,
			supplier_notes,
		} = req.body;

		const supplierUp = Number(req.params.supplier_id);
		const supplier_update = await db.supplier.update({
			where: {
				supplier_id: supplierUp,
			},
			data: {
				supplier_name,
				supplier_address,
				supplier_address_two,
				supplier_city,
				supplier_state,
				supplier_zip,
				supplier_contact_f_name,
				supplier_contact_l_name,
				supplier_contact_email,
				supplier_notes,
			},
		});
		res.json(supplier_update);
	} catch (e) {
		res.status(500).send(`error [/api/updateSupplier]: ${e}`);
	}
});

///               DELETE ROUTES FOR SUPPLIER / SUPPLY ORDER         ///

supplyRouter.delete("/deleteSupplier/:supplier_id", async (req, res) => {
	try {
		const supplierID = Number(req.params.supplier_id);
		const deleteSupplier = await db.supplier.delete({
			where: {
				supplier_id: supplierID,
			},
		});
		res.json(deleteSupplier);
	} catch (e) {
		res.status(500).send(`error [/api/deleteSupplier] ${e}`);
	}
});

supplyRouter.delete("/deleteSupplyOrder/:so_id", async (req, res) => {
	try {
		const soID = Number(req.params.so_id);
		const deleteSupplyOrder = await db.supply_order.delete({
			where: {
				so_id: soID,
			},
		});
		res.json(deleteSupplyOrder);
	} catch (e) {
		res.status(500).send(`error [/api/deleteSupplier] ${e}`);
	}
});
module.exports = supplyRouter;
