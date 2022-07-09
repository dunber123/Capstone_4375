const express = require("express");

const db = require("../../database/connection");

const orderRouter = express.Router();

orderRouter.post("/checkout", async (req, res) => {
	//const cost = Number(req.body.cost)
	//console.log(cost)
	//console.log(req.body)
	const post = await db.$executeRaw`
    call place_order(${req.body.customer_f_name},${req.body.customer_l_name},${req.body.customer_bill_address}, ${req.body.customer_bill_address_two}, 
        ${req.body.customer_bill_city},${req.body.customer_bill_state},${req.body.customer_bill_zip},${req.body.customer_email}, ${req.body.qty}, ${req.body.cost},
        ${req.body.product_id})`;
	res.json(post);
});

module.exports = orderRouter;
