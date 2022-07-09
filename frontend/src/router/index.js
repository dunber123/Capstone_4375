import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import { isLoggedIn } from "../utils/auth";

// Define some routes
// Each route should map to a component.
const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			allowAnonymous: true,
		},
	},

	{
		path: "/products/:product_category",
		name: "products",
		component: () => import("../components/Products"),
		meta: {
			allowAnonymous: true,
		},
	},
	{
		path: "/product/:product_id:cost",
		name: "ProductInfo",
		component: () => import("../components/ProductInfo"),
		meta: {
			allowAnonymous: true,
		},
	},
	// SUPPLIER SECTION

	{
		path: "/events",
		name: "event",
		component: () => import("../components/Events"),
		meta: {
			allowAnonymous: true,
		},
	},
	{
		path: "/login",
		name: "login",
		component: Login,
		meta: {
			allowAnonymous: true,
		},
	},

	// REPORTS SECTION
	{
		path: "/admin",
		name: "admin",
		component: () => import("../components/Admin"),
		meta: {
			hideNavbar: true,
		},

		children: [
			{
				path: "/supplierUpdate",
				name: "supplierUpdate",
				component: () => import("../components/SupplyChainReports/editForms/updateSupplier"),
			},
			{
				path: "/materialAdd",
				name: "materialAdd",
				component: () => import("../components/SupplyChainReports/addForms/materialAdd"),
			},
			{
				path: "/eventAdd",
				name: "eventAdd",
				component: () => import("../components/Events_LocsReports/addForms/EventAdd"),
			},
			{
				path: "/eventUpdate",
				name: "eventUpdate",
				component: () => import("../components/Events_LocsReports/editForms/updateEvent"),
			},
			{
				path: "/customerUpdate",
				name: "customerUpdate",
				component: () => import("../components/CustomerReports/editForms/updateCustomer"),
			},
			{
				path: "/addCustomerVisit",
				name: "addCustomerVisit",
				component: () => import("../components/CustomerReports/addForms/addCustomerVisit"),
			},
			{
				path: "/locationAdd",
				name: "locationAdd",
				component: () => import("../components/Events_LocsReports/addForms/LocationAdd"),
			},
			{
				path: "/updateLocation",
				name: "locationUpdate",
				component: () => import("../components/Events_LocsReports/editForms/updateLocation"),
			},
			{
				path: "/updateProduct",
				name: "updateProduct",
				component: () => import("../components/ProductReports/editForms/updateProduct"),
			},
			{
				path: "/supplierAdd",
				name: "supplier-insert",
				component: () => import("../components/SupplyChainReports/addForms/supplier-insert"),
			},
			{
				path: "/eventUpdate",
				name: "eventUpdate",
				component: () => import("../components/Events_LocsReports/editForms/updateEvent"),
			},

			//added route for new supply order
			{
				path: "/newSupplyOrder",
				name: "newSupplyOrder",
				component: () => import("../components/SupplyChainReports/addForms/newSupplyOrder"),
			},

			// reports
			{
				path: "/reports/supply-orders",
				name: "supply-orders",
				component: () => import("../components/SupplyChainReports/supply-orders"),
			},
			{
				path: "/reports/events",
				name: "events",
				component: () => import("../components/Events_LocsReports/Events"),
			},
			{
				path: "/reports/locations",
				name: "locations",
				component: () => import("../components/Events_LocsReports/Locations"),
			},

			{
				path: "/reports/customer-visits",
				name: "customer-visits",
				component: () => import("../components/CustomerReports/customer-visits"),
			},
			//added report of all customers
			{
				path: "/reports/all-customers",
				name: "all-customers",
				component: () => import("../components/CustomerReports/all-customers"),
			},

			// form to add customer
			{
				path: "/addCustomers",
				name: "addCustomers",
				component: () => import("../components/CustomerReports/addForms/addCustomer"),
			},
			{
				path: "/reports/all-products",
				name: "all-products",
				component: () => import("../components/ProductReports/allProducts"),
			},
			{
				path: "/addProduct",
				name: "addProduct",
				component: () => import("../components/ProductReports/addForms/productAdd"),
			},

			{
				path: "/reports/customer-purchases",
				name: "customer-purchases",
				component: () => import("../components/CustomerReports/customer-purchases"),
			},
			{
				path: "/reports/suppliers",
				name: "suppliers",
				component: () => import("../components/SupplyChainReports/suppliers"),
			},
			{
				path: "/reports/materials",
				name: "materials",
				component: () => import("../components/SupplyChainReports/Materials"),
			},
			{
				path: "/reports/suppliers-orders",
				name: "suppliers-orders",
				component: () => import("../components/SupplyChainReports/suppliers-orders"),
			},
			{
				path: "/reports/best-sellers",
				name: "best-sellers",
				component: () => import("../components/ProductReports/best-sellers"),
			},
			{
				path: "/reports/worst-sellers",
				name: "worst-sellers",
				component: () => import("../components/ProductReports/worst-sellers"),
			},
		],
	},
];

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
	if (to.name == "login" && isLoggedIn()) {
		next({ path: "/admin" });
	} else if (!to.meta.allowAnonymous && !isLoggedIn()) {
		next({
			path: "/login",
			query: { redirect: to.fullPath },
		});
	} else {
		next();
	}
});

export default router;
