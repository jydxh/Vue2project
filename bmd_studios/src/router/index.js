import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/home",
		name: "home",
		component: HomeView,
		children: [
			{
				path: "index",
				component: () => import("../views/Index.vue"),
			},
			{
				path: "actor-list",
				component: () => import("../views/actor/ActorList.vue"),
				// 在此处配置meta 意味着希望为该路由对象绑定一些自定义的数据
				// 这些自定义数据在组件中可以直接范文，通过this.$route.meta.thumb 访问
				meta: {
					thumb: ["演员管理", "演员列表"],
				},
			},
			{
				path: "actor-add",
				component: () => import("../views/actor/ActorAdd.vue"),
				meta: {
					thumb: ["演员管理", "新增演员"],
				},
			},
			{
				path: "director-add",
				component: () => import("../views/director/DirectorAdd.vue"),
				meta: {
					thumb: ["导演管理", "新增导演"],
				},
			},
			{
				path: "director-list",
				component: () => import("../views/director/DirectorList.vue"),
				meta: {
					thumb: ["演员管理", "导演列表"],
				},
			},
			{
				path: "movie-list",
				component: () => import("../views/movie/MovieList.vue"),
				meta: {
					thumb: ["首页", "电影管理", "电影列表"],
				},
			},
			{
				path: "movie-add",
				component: () => import("../views/movie/MovieAdd.vue"),
				meta: {
					thumb: ["电影管理", "新增电影"],
				},
			},
			{
				path: "movie-update/:id",
				component: () => import("../views/movie/MovieUpdate.vue"),
				meta: {
					thumb: ["电影管理", "电影列表", "修改电影信息"],
				},
			},
			{
				path: "movie-update",
				component: () => import("../views/movie/MovieUpdate.vue"),
				meta: {
					thumb: ["电影管理", "电影列表", "修改电影信息"],
				},
			},
			{
				path: "cinema-add",
				component: () => import("../views/cinema/CinemaAdd.vue"),
				meta: {
					thumb: ["电影院管理", "新增电影院"],
				},
			},
			{
				path: "cinema-list",
				component: () => import("../views/cinema/CinemaList.vue"),
				meta: {
					thumb: ["电影院管理", "电影院列表"],
				},
			},
			{
				path: "cinema-list-room/:cinemaId",
				component: () => import("../views/cinema/CinemaRoomList.vue"),
				meta: {
					thumb: ["电影院管理", "电影院列表", "放映厅列表"],
				},
			},

			{
				path: "showingon-plan-add/:roomId",
				component: () => import("../views/cinema/ShowingonPlanAdd.vue"),
				meta: {
					thumb: ["电影院管理", "电影院列表", "放映厅列表", "添加放映计划"],
				},
			},
			{
				path: "showingon-plan-list/:roomId",
				component: () => import("../views/cinema/ShowingonPlanList.vue"),
				meta: {
					thumb: ["电影院管理", "电影院列表", "放映厅列表", "放映计划表"],
				},
			},
			{
				path: "seat-template",
				component: () => import("../views/cinema/CinemaRoomSeatTemplate.vue"),
				meta: {
					thumb: ["电影院管理", "电影院列表", "放映厅列表", "配置座位模板"],
				},
			},
		],
	},
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
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
