<template>
	<div>
		<h2 align="center">Materials</h2>
		<br />
		<div class="row">
			<div class="table-wrapper table-earnings data-sticky-header">
				<table class="table table-striped table-bordered">
					<thead class="thead-dark">
						<tr>
							<th>Material</th>
							<th>Supplier</th>
							<th>Unit Price</th>
							<th>Count</th>
							<th>Total Price</th>
							<th scope="col" width="150px">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in rows" :key="x">
							<td>{{ x.material_name }}</td>
							<td>{{ x.supplier_name }}</td>
							<td>{{ formatPrice(x.material_cost) }}</td>
							<td>{{ x.soli_count }}</td>
							<td>{{ formatPrice(x.so_total) }}</td>
							<td>
								<a class="btn btn-danger is-small" @click.prevent="deleteMaterial(x.material_id)">Delete</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<br />
		<div class="d-grid gap-4 d-md-flex justify-content-md-end">
			<a class="btn btn-primary me-md-2" href="/materialAdd" role="button">Add Material</a>
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
		let apiURL = `http://54.236.93.253:3000/api/materials`;
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
		formatPrice(value) {
			let val = (value / 1).toFixed(2).replace(",", ".");
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},
		deleteMaterial(id) {
			let apiURL = `http://54.236.93.253:3000/api/deleteMaterial/${id}`;
			console.log(id);
			let indexOfArrayItem = this.rows.findIndex((x) => x.material_id === id);
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
