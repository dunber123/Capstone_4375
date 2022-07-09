<template>
	<div class="row justify-content-center">
		<div class="col-md-6">
			<h1>Edit The Customer</h1>
			<form @submit.prevent="handleUpdate">
				<div class="row">
					<div class="col">
						<label>First Name</label>
						<input type="text" class="form-control" v-model="customer.customer_f_name" required />
					</div>
					<div class="col">
						<label>Last Name</label>
						<input type="text" class="form-control" v-model="customer.customer_l_name" required />
					</div>
				</div>

				<br />

				<div class="form-group">
					<label>Shipping Address</label>
					<input type="text" class="form-control" v-model="customer.customer_ship_address" required />
				</div>
				<br />

				<div class="form-group">
					<label>Shipping Address (Cont'd)</label>
					<input type="text" class="form-control" v-model="customer.customer_ship_address_two" />
				</div>
				<br />

				<div class="form-group">
					<label>City</label>
					<input type="text" class="form-control" v-model="customer.customer_ship_city" required />
				</div>
				<br />

				<div class="form-group">
					<label>State</label>
					<input type="text" class="form-control" v-model="customer.customer_ship_state" required />
				</div>
				<br />

				<div class="form-group">
					<label>Zip</label>
					<input type="number" class="form-control" v-model="customer.customer_ship_zip" required />
				</div>
				<br />

				<div class="row">
					<div class="col">
						<div class="form-group">
							<label>Billing Address</label>
							<input type="text" class="form-control" v-model="customer.customer_bill_address" required />
						</div>
						<br />

						<div class="form-group">
							<label>Billing Address (Cont'd)</label>
							<input type="text" class="form-control" v-model="customer.customer_bill_address_two" />
						</div>
						<br />

						<div class="form-group">
							<label>City</label>
							<input type="text" class="form-control" v-model="customer.customer_bill_city" required />
						</div>
						<br />

						<div class="form-group">
							<label>State</label>
							<input type="text" class="form-control" v-model="customer.customer_bill_state" required />
						</div>
						<br />

						<div class="form-group">
							<label>Zip</label>
							<input type="number" class="form-control" v-model="customer.customer_bill_zip" required />
						</div>
						<br />

						<div class="form-group">
							<label>Email </label>
							<input type="text" class="form-control" v-model="customer.customer_email" required />
						</div>
						<br />

						<div class="form-group">
							<label>Points</label>
							<input type="number" class="form-control" v-model="customer.customer_point_total" required />
						</div>
						<br />
					</div>
				</div>
				<div class="d-grid gap-4 d-md-flex justify-content-md-end">
					<button class="btn btn-danger mt-3">Update customer</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "#updateCustomer",
	data() {
		return {
			errors: [],
			rows: [],
			customer: {
				customer_f_name: "",
				customer_l_name: "",
				customer_ship_address: "",
				customer_ship_address_two: "",
				customer_ship_city: "",
				customer_ship_state: "",
				customer_ship_zip: "",
				customer_bill_address: "",
				customer_bill_address_two: "",
				customer_bill_city: "",
				customer_bill_state: "",
				customer_bill_zip: "",
				customer_email: "",
				customer_point_total: "",
			},
		};
	},
	created: function () {
		this.getOne();
	},
	methods: {
		async getOne() {
			try {
				const res = await axios.get(`http://54.236.93.253:3000/api/customer/${this.$route.params.id}`);
				this.customer = res.data;
			} catch (err) {
				console.log(err);
			}
		},
		handleUpdate() {
			let apiURL = `http://54.236.93.253:3000/api/updateCustomer/${this.$route.params.id}`;
			this.errors = [];
			axios
				.put(apiURL, this.customer)
				.then(() => {
					this.$router.push("/reports/all-customers");
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
