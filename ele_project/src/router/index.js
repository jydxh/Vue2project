import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/about",
		name: "about",
		component: () => import("../views/AboutView.vue"),
	},
	{
		path: "/nav",
		name: "nav",
		component: () => import("../views/Nav.vue"),
	},
	{
		path: "/container",
		component: () => import("../views/Container.vue"),
	},
	{
		path: "/components",
		name: "components",
		component: () => import("../views/Components.vue"),
		// redirect to the container page
		redirect: "/components/container",
		children: [
			{
				// 只有一级路由要加"/", 往下级别的 不要加 “/”
				path: "table",
				name: "table",
				component: () => import("../views/Table.vue"),
			},

			{
				path: "container",
				name: "container",
				component: () => import("../views/Container.vue"),
			},
			{
				path: "form",
				name: "form",
				component: () => import("../views/Form.vue"),
			},
		],
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
