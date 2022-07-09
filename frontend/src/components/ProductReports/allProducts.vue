<template>
	<div>
		<h2 align="center">Products</h2>
		<br />
		<div class="row">
			<div class="table-wrapper table-earnings">
				<table class="table table-striped table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col">Product Name</th>
							<th scope="col">Product Desc</th>
							<th scope="col">Product Cost</th>
							<th scope="col" width="180">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in rows" :key="x">
							<td>{{ x.product_name }}</td>
							<td>{{ x.product_desc }}</td>
							<td>${{ formatPrice(x.product_cost) }}</td>
							<td>
								<router-link :to="{ name: 'updateProduct', params: { id: x.product_id } }" class="btn btn-info is-small">Edit</router-link>
								<button @click.prevent="deleteProducts(x.product_id)" class="btn btn-danger mx-2">Delete</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="d-grid gap-4 d-md-flex justify-content-md-end">
			<a class="btn btn-primary me-md-2" href="/addProduct" role="button">Add New Product</a>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			rows: [],
		};
	},
	// this is using created hook
	created() {
		let apiURL = `http://54.236.93.253:3000/api/products`;
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
		deleteProducts(id) {
			let apiURL = `http://54.236.93.253:3000/api/deleteProduct/${id}`;
			console.log(id);
			let indexOfArrayItem = this.rows.findIndex((x) => x.product_id === id);
			if (window.confirm("Do you really want to delete?")) {
				axios
					.delete(apiURL)
					.then(() => {
						this.rows.splice(indexOfArrayItem, 1);
						// this.forceRerender()
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
		formatPrice(value) {
			let val = (value / 1).toFixed(2).replace(",", ".");
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},
	},
};
</script>
<style scoped>
.table-wrapper {
	max-height: 600px;
	overflow: auto;
	display: inline-block;
}
.table-earnings {
	background: #f3f5f6;
}
th {
	position: sticky;
	top: 0px;
	background: #f3f5f6;
}
.btn {
	margin-right: 3px;
}
</style>
