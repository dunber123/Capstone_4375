<template>
	<div class="row justify-content-center">
		<div class="col-md-6">
			<h1>Update Location</h1>
			<form @submit.prevent="handleUpdate">
				<div class="form-group">
					<label>Location Name</label>
					<input type="text" class="form-control" v-model="location.location_name" required />
				</div>
				<br />

				<div class="form-group">
					<label>Address</label>
					<input type="text" class="form-control" v-model="location.location_address" required />
				</div>
				<br />

				<div class="form-group">
					<label>Address Two</label>
					<input type="text" class="form-control" v-model="location.location_address_two" />
				</div>
				<br />

				<div class="form-group">
					<label>City</label>
					<input type="text" class="form-control" v-model="location.location_city" required />
				</div>
				<br />

				<div class="form-group">
					<label>State</label>
					<input type="text" class="form-control" v-model="location.location_state" required />
				</div>
				<br />

				<div class="form-group">
					<label>Zip Code</label>
					<input type="number" class="form-control" v-model="location.location_zip" required />
				</div>
				<br />
				<div class="d-grid gap-4 d-md-flex justify-content-md-end">
					<button class="btn btn-danger mt-3">Update location</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "#updateLocation",
	data() {
		return {
			errors: [],
			rows: [],
			location: {
				location_name: "",
				location_address: "",
				location_address_two: "",
				location_city: "",
				location_state: "",
				location_zip: "",
			},
		};
	},
	created: function () {
		this.getOne();
	},
	methods: {
		async getOne() {
			try {
				const res = await axios.get(`http://54.236.93.253:3000/api/locations/${this.$route.params.id}`);
				this.location = res.data;
			} catch (err) {
				console.log(err);
			}
		},
		handleUpdate() {
			let apiURL = `http://54.236.93.253:3000/api/updateLocation/${this.$route.params.id}`;
			this.errors = [];
			axios
				.put(apiURL, this.location)
				.then(() => {
					this.$router.push("/reports/locations");
				})
				.catch((errors) => {
					this.errors.push("There's an error submitting form." + errors.response.data);
				});
		},
	},
};
</script>
