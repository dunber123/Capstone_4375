const express = require("express");
const { send } = require("process");
const db = require("../../database/connection");

const eventRouter = express.Router();

//---------------------------------------------------------------------------------------------------------------------//
// GET COMMANDS FOR EVENTS  //

// Call for Calender Object
eventRouter.get("/event/calendar", async (req, res) => {
	const event = await db.$queryRaw`SELECT event.event_date as start, event.event_name as title, 'true' as allDay
    FROM capstone.event`;
	res.json(event);
});

// host.com/api/events - Report 2
//* Returns all events with location
/*eventRouter.get("/events", async (req, res) => {
	const events = await db.$queryRaw`select event_name, event_date, location_name, location_address, location_address_two location_city, location_state, location_zip
    from capstone.event
    inner join capstone.location 
    ON capstone.event.location_id = capstone.location.location_id`;
	res.json(events);
}); */

// Get all visits
eventRouter.get("/visithistory", async (req, res) => {
	try {
		const visithistory = await db.visit_history.findMany();
		res.json(visithistory);
	} catch (e) {
		res.status(500).send(`error [/api/visithistory] : ${e}`);
	}
});

// Get all visits
eventRouter.post("/addVisit", async (req, res) => {
	try {
		const { customer_id, event_id } = req.body;
		const new_visit = await db.visit_history.create({
			data: {
				customer_id,
				event_id,
			},
		});
		res.json(new_visit);
	} catch (e) {
		res.status(500).send(`error [/api/addVisit] : ${e}`);
	}
});

eventRouter.get("/events", async (req, res) => {
	try {
		const events = await db.event.findMany({
			include: {
				location: {},
			},
			// eslint-disable-next-line no-dupe-keys
		});
		res.json(events);
	} catch (e) {
		res.status(500).send(`error [/api/events]: ${e}`);
	}
});

// Viewing Events by date
eventRouter.get("/event", async (req, res) => {
	let event_date = req.query.event_date;
	console.log(event_date);
	const event = await db.$queryRaw`SELECT *
    FROM capstone.event e
    JOIN capstone.location l
    ON e.location_id = l.location_id
    WHERE DATE(event_date) = ${event_date}`;
	res.json(event);
});

eventRouter.get("/events/:event_id", async (req, res) => {
	try {
		const event_id = Number(req.params.event_id);
		const event_up = await db.event.findUnique({
			where: { event_id: event_id },
		});
		res.json(event_up);
	} catch (e) {
		res.status(500).send(`error [/api/events/:event_id] : ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// POST COMMANDS FOR EVENTS //

//* Add new events
//host.com/addevents

eventRouter.post("/eventadd", async (req, res) => {
	try {
		const { location_id, event_name, event_desc, event_date } = req.body;

		const newEvent = await db.event.create({
			data: {
				location_id,
				event_name,
				event_desc,
				event_date: new Date(event_date),
			},
		});
		res.json(newEvent);
	} catch (e) {
		res.status(500).send(`error [/api/eventadd]: ${e}`);
	}
});

eventRouter.put("/updateEvent/:event_id", async (req, res) => {
	try {
		const { location_id, event_name, event_desc, event_date } = req.body;
		const event_id = number(req.params.event_id);
		const newEvent = await db.event.update({
			where: {
				event_id: event_id,
			},
			data: {
				location_id,
				event_name,
				event_desc,
				event_date: new Date(event_date),
			},
		});
		res.json(newEvent);
	} catch (e) {
		res.status(500).send(`error [/api/updateEvent]: ${e}`);
	}
});

//---------------------------------------------------------------------------------------------------------------------//
// DELETE COMMANDS FOR EVENTS //

//** Delete an Event */

eventRouter.delete("/eventDelete/:event_id", async (req, res) => {
	try {
		const eventID = Number(req.params.event_id);
		const deleteEvent = await db.event.deleteMany({
			where: {
				event_id: eventID,
			},
		});
		res.json(deleteEvent);
	} catch (e) {
		res.status(500).send(`error [/api/deleteEvent] ${e}`);
	}
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

module.exports = eventRouter;
