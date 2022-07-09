<template>
	<div>
		<h2 align="center">Events</h2>
		<br />
		<div class="row">
			<div class="table-wrapper table-earnings">
				<table class="table table-striped table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col">Event</th>
							<th scope="col">Date</th>
							<th scope="col">Event Desc</th>
							<th scope="col">Location</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in rows" :key="x">
							<td>{{ x.event_name }}</td>
							<td>{{ formatDate(x.event_date) }}</td>
							<td>{{ x.event_desc }}</td>
							<td>{{ x.location.location_name }}</td>

							<td>
								<router-link :to="{ name: 'eventUpdate', params: { id: x.event_id } }" class="btn btn-info is-small">Edit</router-link>
								<button @click.prevent="deleteEvents(x.event_id)" class="btn btn-danger mx-2">Delete</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="d-grid gap-4 d-md-flex justify-content-md-end">
			<a class="btn btn-primary me-md-2" href="/eventadd" role="button">Add New Event</a>
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
		let apiURL = `http://54.236.93.253:3000/api/events`;
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
			let apiURL = `http://54.236.93.253:3000/api/eventDelete/${id}`;
			console.log(id);
			let indexOfArrayItem = this.rows.findIndex((x) => x.event_id === id);
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
		formatDate(date) {
			let protoDate = new Date(date);
			//return moment(date).format("MMMM DD YYYY")
			return protoDate.toDateString();
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
