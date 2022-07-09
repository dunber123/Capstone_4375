<template>
	<div class="row justify-content-center">
		<div class="col-md-6">
			<h2>Add customer event visit</h2>
			<form @submit.prevent="handleSubmitForm">
				<div class="form-group">
					<label>Customer ID</label>
					<input type="number" class="form-control" v-model="visit_history.customer_id" required />
				</div>
				<br />

				<div class="form-group">
					<label>Event ID</label>
					<input type="number" class="form-control" v-model="visit_history.event_id" required />
				</div>
				<br />
				<div class="d-grid gap-4 d-md-flex justify-content-md-end">
					<button class="btn btn-danger mt-3">Add attendance</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "#visit_history",
	data() {
		return {
			errors: [],
			rows: [],
			visit_history: {
				event_id: "",
				customer_id: "",
			},
		};
	},
	created() {},
	methods: {
		handleSubmitForm() {
			let apiURL = "http://54.236.93.253:3000/api/addVisit";
			this.errors = [];
			axios
				.post(apiURL, this.visit_history)
				.then(() => {
					this.$router.push("/reports/customer-visits");
				})
				.catch((errors) => {
					alert("Customer/Event does not exist or Customer is already assinged to event.")
					this.errors.push("There's an error submitting form." + errors.response.data);
				});
		},
	},
};
</script>
