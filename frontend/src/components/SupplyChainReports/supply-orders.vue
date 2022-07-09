<template>
	<div>
		<br />
		<h2 align="center">Supply Orders</h2>
		<br />
		<br />
		<div class="row">
			<div class="table-wrapper table-earnings">
				<table class="table table-striped table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Date</th>
							<th scope="col">Payment Method</th>
							<th scope="col">Supply Sub Total</th>
							<th scope="col">Supply Shipping</th>
							<th scope="col">Supply Tax</th>
							<th scope="col">Total</th>
							<th scope="col" width="150">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in rows" :key="x">
							<td>{{ x.so_id }}</td>
							<td>{{ formatDate(x.so_date) }}</td>
							<td>{{ x.so_payment_methods }}</td>
							<td>${{ formatPrice(x.so_subtotal) }}</td>
							<td>${{ formatPrice(x.so_shipping) }}</td>
							<td>${{ formatPrice(x.so_tax) }}</td>
							<td>${{ formatPrice(x.so_total) }}</td>
							<td>
								<a class="btn btn-danger is-small" @click.prevent="deleteSupplyOrder(x.so_id)">Delete</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<br />
		<div class="d-grid gap-4 d-md-flex justify-content-md-end">
			<a class="btn btn-primary me-md-2" href="/newSupplyOrder" role="button">Add New Supply Order</a>
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
		let apiURL = `http://54.236.93.253:3000/api/allsupplyOrders`;
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
		//date formatting is needed to make readable
		formatDate(date) {
			let protoDate = new Date(date);
			//return moment(date).format("MMMM DD YYYY")
			return protoDate.toDateString();
		},
		deleteSupplyOrder(id) {
			let apiURL = `http://54.236.93.253:3000/api/deleteSupplyOrder/${id}`;
			console.log(id);
			let indexOfArrayItem = this.rows.findIndex((x) => x.so_id === id);
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
