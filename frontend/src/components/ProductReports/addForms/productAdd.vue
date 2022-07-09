<template>
	<div class="row justify-content-center">
		<div class="col-md-6">
			<h1>Add New Product Form</h1>
			<form @submit.prevent="handleSubmitForm">
				<div class="form-group">
					<label>Product Name</label>
					<input type="text" class="form-control" v-model="product.product_name" required />
				</div>
				<br />

				<div class="form-group">
					<label>Product Category</label>
					<select class="form-select" aria-label="Default select example" v-model="product.product_category" required>
						<option v-for="i in rows" :key="i.prod_cat_id" :value="i.prod_cat_id">{{ i.prod_cat_name }}</option>
					</select>
				</div>
				<br />

				<div class="form-group">
					<label>Product Description</label>
					<input type="text" class="form-control" v-model="product.product_desc" required />
				</div>
				<br />

				<div class="form-group">
					<label>Product Cost </label>
					<input type="number" step="0.01" class="form-control" v-model="product.product_cost" require />
				</div>
				<br />
				<div class="d-grid gap-4 d-md-flex justify-content-md-end">
					<button class="btn btn-danger mt-3">Add new product</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "#CreateProduct",
	data() {
		return {
			errors: [],
			rows: [],
			product: {
				product_name: "",
				product_category: "",
				product_desc: "",
				product_cost: "",
			},
		};
	},
	created() {
		let apiURL = `http://54.236.93.253:3000/api/product_category`;
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
		handleSubmitForm() {
			let apiURL = "http://54.236.93.253:3000/api/addProduct"; // path to database on server
			this.errors = []; //throw any errors
			axios
				.post(apiURL, this.product)
				.then(() => {
					this.$router.push("/reports/all-products");
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
