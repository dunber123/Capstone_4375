<template>
	<div>
		<h2 align="center">Location</h2>
		<br />
		<div class="row">
			<div class="table-wrapper table-earnings">
				<table class="table table-striped table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col">Location Name</th>
							<th scope="col">Location Address</th>
							<th scope="col">Location Addr 2</th>
							<th scope="col">City</th>
							<th scope="col">State</th>
							<th scope="col">Zip</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in rows" :key="x.location_id">
							<td>{{ x.location_name }}</td>
							<td>{{ x.location_address }}</td>
							<td>{{ x.location_address_two }}</td>
							<td>{{ x.location_city }}</td>
							<td>{{ x.location_state }}</td>
							<td>{{ x.location_zip }}</td>
							<td>
								<router-link :to="{ name: 'locationUpdate', params: { id: x.location_id } }" class="btn btn-info is-small">Edit</router-link>
								<button @click.prevent="deleteEvents(x.location_id)" class="btn btn-danger mx-2">Delete</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="d-grid gap-4 d-md-flex justify-content-md-end">
			<a class="btn btn-primary me-md-2" href="/locationadd" role="button">Add New Location</a>
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
		let apiURL = `http://54.236.93.253:3000/api/locations`;
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
		deleteEvents(id) {
			let apiURL = `http://54.236.93.253:3000/api/deleteLocation/${id}`;
			console.log(id);
			let indexOfArrayItem = this.rows.findIndex((x) => x.location_id === id);
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
