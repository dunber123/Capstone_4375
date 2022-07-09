<template>
	<div class="row justify-content-center">
		<div class="col-md-6">
			<h1>Create Event Form</h1>
			<form @submit.prevent="handleUpdate">
				<div class="form-group">
					<label>Event Name</label>
					<input type="text" class="form-control" v-model="event.event_name" required />
				</div>
				<br />

				<div class="form-group">
					<label>Event Description</label>
					<input type="text" class="form-control" v-model="event.event_desc" required />
				</div>
				<br />

				<div class="form-group">
					<label>Event Date</label>
					<input type="datetime" class="form-control" v-model="event.event_date" required />
				</div>
				<br />

				<!--<div class="form-group">
					<label>Event Location</label>
					<input type="Number" step="1" class="form-control" v-model="event.location_id" required />
				</div>-->
				<br />
				<div class="form-group">
					<label>Event Location</label>
					<select class="form-select" aria-label="Default select example" v-model="event.location_id" required>
						<option v-for="i in rows" :key="i.location_id" :value="i.location_id">{{ i.location_name }}</option>
					</select>
				</div>
				<br />
				<div class="d-grid gap-4 d-md-flex justify-content-md-end">
					<button class="btn btn-danger mt-3">Update Event</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "#CreateEvent",
	data() {
		return {
			errors: [],
			rows: [],
			event: {
				location_id: "",
				event_name: "",
				event_desc: "",
				event_date: "",
				location_name: "",
			},
		};
	},
	created: function () {
		this.getOne();
		let apiURL = `http://localhost:3000/api/locations`;
		axios
		.get(apiURL)
		.then((res) => {
		this.rows = res.data;
		})
		.catch((error) => {
		console.log(error);
		});
	},
	methods: {
		async getOne() {
			try {
				const res = await axios.get(`http://54.236.93.253:3000/api/events/${this.$route.params.id}`);
				this.event = res.data;
			} catch (err) {
				console.log(err);
			}
		},
		handleUpdate() {
			let apiURL = `http://54.236.93.253:3000/api/updateEvent/${this.$route.params.id}`;
			this.errors = [];
			axios
				.put(apiURL, this.event)
				.then(() => {
					this.$router.push("/reports/events");
				})
				.catch((errors) => {
					this.errors.push("There's an error submitting form." + errors.response.data);
				});
		},
	},
};
</script>

<style scoped>
.form-group {
	column-span: 100%;
}
</style>
