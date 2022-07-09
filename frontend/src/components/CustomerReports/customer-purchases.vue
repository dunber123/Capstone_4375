<template>
	<div>
		<h2 align="center">Customers Purchases</h2>
		<br />
		<div class="row">
			<div class="table-wrapper table-earnings data-sticky-header">
				<table class="table table-striped table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">First Name</th>
							<th scope="col">Last Name</th>
							<th scope="col">Email</th>
							<th scope="col">Product Purchased</th>
							<th scope="col" width="150px">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in rows" :key="x">
							<td>{{ x.customer_id }}</td>
							<td>{{ x.customer_f_name }}</td>
							<td>{{ x.customer_l_name }}</td>
							<td>{{ x.customer_email }}</td>
							<td>{{ x.product_name }}</td>
							<td>
								<a class="btn btn-danger is-small" @click.prevent="deleteCustomer(x.customer_id)">Delete</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<br />
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
		let apiURL = `http://54.236.93.253:3000/api/customerPurchases`;
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
		deleteCustomer(id) {
			let apiURL = `http://54.236.93.253:3000/api/deleteCustomer/${id}`;
			console.log(id);
			let indexOfArrayItem = this.rows.findIndex((x) => x.customer_id === id);
			if (window.confirm("Do you really want to delete?")) {
				axios
					.delete(apiURL)
					.then(() => {
						//this.$router.push('/reports/customer-purchases')
						this.rows.splice(indexOfArrayItem, 1);
						// this.forceRerender()
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
	},
};
</script>

<!--https://stackoverflow.com/questions/40499855/bootstrap-table-vertical-scroll-->
<style scoped>
.table-wrapper {
	max-height: 500px;
	overflow: auto;
	display: inline-flex;
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
