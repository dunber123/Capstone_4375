const express = require("express");
const { customer } = require("../../database/connection");

const db = require("../../database/connection");

const customerRouter = express.Router();

//---------------------------------------------------------------------------------------------------------------------//
// GET COMMANDS FOR SUPPLIERS - SUPPLY_ORDER  //

// List of all customers
// host.com/api/customer
customerRouter.get("/customer", async (req, res) => {
	try {
		const customers = await db.customer.findMany();
		res.json(customers);
	} catch (e) {
		res.status(500).send(`error [/api/customer] : ${e}`);
	}
});

// Specific customer by customer ID
// host.com/api/customer/:customer_id
customerRouter.get("/customer/:customer_id", async (req, res) => {
	try {
		const customerId = Number(req.params.customer_id);
		const customers = await db.customer.findUnique({
			where: { customer_id: customerId },
		});
		res.json(customers);
	} catch (e) {
		res.status(500).send(`error [/api/customer/id] : ${e}`);
	}
});

// *  Report 4 - Customer's who have purchased 1 order * //
// * host.com/api/customerPurchases * //

customerRouter.get("/customerPurchases", async (req, res) => {
	const customerPurchases = await db.$queryRaw`select distinct customer_f_name, customer_l_name, customer_email,  capstone.c_order.customer_id, product_name
    from capstone.customer
    join capstone.c_order
    on capstone.c_order.customer_id = capstone.customer.customer_id
    join capstone.c_order_line_item
    on capstone.c_order.c_order_id = capstone.c_order_line_item.c_order_id
    join capstone.product
    on capstone.product.product_id = capstone.c_order_line_item.product_id`;
	res.json(customerPurchases);
});

/* customerRouter.get("/customerPurchases", async (req, res) => {
	try {
		const c_purch = await db.customer.findMany({
			where: { c_order: { some: {} } },
			distinct: ["customer_f_name", "customer_l_name", "customer_email", "customer_id"],
			select: {
				customer_f_name: true,
				customer_l_name: true,
				customer_email: true,
				customer_id: true,
			},
		});
		res.json(c_purch);
	} catch (e) {
		res.status(500).send(`error [/api/customer/purch] : ${e}`);
	}
}); */

/* Report 3 - All customers with visit history */
// * host.com/api/customerVisits
customerRouter.get("/customerVisits", async (req, res) => {
	try {
		const customerVisits = await db.$queryRaw`select c.customer_id, customer_f_name, customer_l_name, event_name, location_name
		from capstone.customer c
		join capstone.visit_history v
		on c.customer_id = v.customer_id
		join capstone.event e
		on v.event_id = e.event_id
		join capstone.location l
		on l.location_id = e.location_id`;
		res.json(customerVisits);
	} catch (e) {
		res.status(500).send(`error [/api/customerVisits] : ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// POST COMMANDS FOR SUPPLIERS - SUPPLY_ORDER  //

customerRouter.post("/addCustomer", async (req, res) => {
	try {
		const {
			customer_f_name,
			customer_l_name,
			customer_ship_address,
			customer_ship_address_two,
			customer_ship_city,
			customer_ship_state,
			customer_ship_zip,
			customer_bill_address,
			customer_bill_address_two,
			customer_bill_city,
			customer_bill_state,
			customer_bill_zip,
			customer_email,
			customer_point_total,
		} = req.body;

		const newCustomer = await db.customer.create({
			data: {
				customer_f_name,
				customer_l_name,
				customer_ship_address,
				customer_ship_address_two,
				customer_ship_city,
				customer_ship_state,
				customer_ship_zip,
				customer_bill_address,
				customer_bill_address_two,
				customer_bill_city,
				customer_bill_state,
				customer_bill_zip,
				customer_email,
				customer_point_total,
			},
		});
		res.json(newCustomer);
	} catch (e) {
		res.status(500).send(`error [/api/addCustomer]: ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// UPDATE COMMANDS FOR SUPPLIERS - SUPPLY_ORDER  //

customerRouter.put("/updateCustomer/:customer_id", async (req, res) => {
	try {
		const {
			customer_f_name,
			customer_l_name,
			customer_ship_address,
			customer_ship_address_two,
			customer_ship_city,
			customer_ship_state,
			customer_ship_zip,
			customer_bill_address,
			customer_bill_address_two,
			customer_bill_city,
			customer_bill_state,
			customer_bill_zip,
			customer_email,
		} = req.body;
		const customerUp = Number(req.params.customer_id);
		const customer_update = await db.customer.update({
			where: {
				customer_id: customerUp,
			},
			data: {
				customer_f_name,
				customer_l_name,
				customer_ship_address,
				customer_ship_address_two,
				customer_ship_city,
				customer_ship_state,
				customer_ship_zip,
				customer_bill_address,
				customer_bill_address_two,
				customer_bill_city,
				customer_bill_state,
				customer_bill_zip,
				customer_email,
			},
		});
		res.json(customer_update);
	} catch (e) {
		res.status(500).send(`error [/api/updateCustomer]: ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// DELETE COMMANDS FOR CUSTOMERS //

customerRouter.delete("/deleteCustomer/:customer_id", async (req, res) => {
	try {
		const customerID = Number(req.params.customer_id);

		const deleteCustomer = await db.customer.delete({
			where: {
				customer_id: customerID,
			},
		});

		res.json(deleteCustomer);
	} catch (e) {
		res.status(500).send(`error [/api/deleteCustomer] ${e}`);
	}
});


customerRouter.delete("/deleteCustVisit/:customer_id-:event_id", async (req, res) => {
	/*try {
		const customerID = Number(req.params.customer_id);
		const eventID = Number(req.params.event_id);

		const deleteCustVisit = await db.visit_history.delete({
			where: {
				customer_id: customerID,
				event_id: eventID
			},
		});
	} catch (e) {
		res.status(500).send(`error [/api/deleteCustVisit] ${e}`);
	}*/
	const deleteCustVisit = await db.$executeRaw`
	DELETE FROM visit_history
	WHERE customer_id = ${req.params.customer_id} AND event_id = ${req.params.event_id}`;
	res.json(deleteCustVisit);
});

/* eventRouter.delete("/eventDelete/:event_id", async (req, res) => {
	try {
		const eventID = Number(req.params.event_id);
		const deleteVisit = await db.visit_history.deleteMany({
			where: {
				event_id: eventID,
			},
		})
		const deleteEvent = await db.event.deleteMany({
			where: {
				event_id: eventID,
			},
		})

		const deleteAction = await db.$transaction([deleteEvent, deleteVisit]);

		res.json(deleteAction);
	} catch (e) {
		res.status(500).send(`error [/api/deleteEvent] ${e}`);
	}
}); */

module.exports = customerRouter;
