<template>
	<div>
		<h2 align="center">Customer Visits</h2>
		<br />
		<div class="row">
			<div class="table-wrapper table-earnings data-sticky-header">
				<table class="table table-striped table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col">Customer ID</th>
							<th scope="col">First Name</th>
							<th scope="col">Last Name</th>
							<th scope="col">Location</th>
							<th scope="col">Event</th>
							<th scope="col" width="150px">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in rows" :key="x">
							<td>{{ x.customer_id }}</td>
							<td>{{ x.customer_f_name }}</td>
							<td>{{ x.customer_l_name }}</td>
							<td>{{ x.location_name }}</td>
							<td>{{ x.event_name }}</td>
							<td>
								<a class="btn btn-danger is-small" @click.prevent="deleteCustVisit(x.customer_id, x.event_id)">Delete</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<br />
		<div class="d-grid gap-4 d-md-flex justify-content-md-end">
			<a class="btn btn-primary me-md-2" href="/addCustomerVisit" role="button">Add New Customer Visit</a>
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
		let apiURL = `http://54.236.93.253:3000/api/customerVisits`;
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
		deleteCustVisit(cid, eid) {
			let apiURL = `http://54.236.93.253:3000/api/deleteCustVisit/${cid}-${eid}`;
			console.log(cid + ' ' + eid);
			let indexOfArrayItem = this.rows.findIndex((x) => x.customer_id === cid && x.event_id === eid );
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
