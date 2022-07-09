// File to allow front end to talk to backend api
import axios from "axios";

export default axios.create({
	baseURL: "http://54.236.93.253:3000/api/",
	headers: {
		"Content-type": "application/json",
	},
});
