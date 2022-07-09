<template>
	<div class="row justify-content-center">
		<div class="col-md-6">
			<h1>Update Existing Product Form</h1>
			<form @submit.prevent="handleUpdate">
				<div class="form-group">
					<label>Product Name</label>
					<input type="text" class="form-control" v-model="product.product_name" required />
				</div>
				<br />

				<div class="form-group">
					<label>Product Category</label>
					<input type="number" class="form-control" v-model="product.product_category" required />
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
	name: "#UpdateProduct",
	data() {
		return {
			errors: [],
			rows: [],
			product: {
				product_id: "",
				product_name: "",
				product_category: "",
				product_desc: "",
				product_cost: "",
			},
		};
	},
	created: function () {
		this.getOne();
	},
	methods: {
		async getOne() {
			try {
				const res = await axios.get(`http://54.236.93.253:3000/api/products/${this.$route.params.id}`);
				this.product = res.data;
			} catch (err) {
				console.log(err);
			}
		},
		handleUpdate() {
			let apiURL = `http://54.236.93.253:3000/api/updateProduct/${this.$route.params.id}`;
			this.errors = [];
			axios
				.put(apiURL, this.product)
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
