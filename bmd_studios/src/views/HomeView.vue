<template>
	<div>
		<el-container style="height: 100vh">
			<el-aside class="aside" :style="{ width: `${isCollapse ? 65 : 240}px`, transition: '0.4s' }">
				<el-menu
					router
					:default-active="$route.path"
					background-color="#345"
					text-color="#bbb"
					:style="{ height: '100vh' }"
					:collapse="isCollapse"
					class="el-menu-vertical-demo">
					<el-menu-item>
						<img width="30px" src="../assets/logo.svg" alt="" />
						<template slot="title">
							<span style="font-size: 1.2em; color: #efefef; font-weight: bold">&nbsp;&nbsp;百慕大影城后台管理</span>
						</template>
					</el-menu-item>

					<template v-for="item in menu">
						<!-- 如果item时 menu-item 则普通列表项 -->
						<el-menu-item :index="item.link" :key="item.title" v-if="item.type == 'menu-item'">
							<i :class="item.icon"></i>
							<template slot="title"> {{ item.title }} </template>
						</el-menu-item>
						<!-- 如果item.type 为sub menu 则执行一下代码 -->
						<el-submenu :key="item.title" :index="item.link" v-else>
							<template slot="title">
								<i :class="item.icon"></i>
								<span slot="title">{{ item.title }}</span>
							</template>
							<!-- sub menu 列表项 -->
							<el-menu-item v-for="subItem in item.children" :index="subItem.link" :key="subItem.title">
								<i :class="subItem.icon"></i>
								<span slot="title">{{ subItem.title }}</span>
							</el-menu-item>
						</el-submenu>
					</template>
					<!-- <el-menu-item index="/home/index">
						<i class="el-icon-message"></i>
						<template slot="title"> 首页 </template>
					</el-menu-item> -->
					<!-- <el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span slot="title">演员管理</span>
						</template>
						<el-menu-item index="/home/actor-list">
							<i class="el-icon-notebook-2"></i>
							<span slot="title">演员列表</span>
						</el-menu-item>
						<el-menu-item index="/home/actor-add">
							<i class="el-icon-plus"></i>
							<span slot="title">新增演员</span>
						</el-menu-item>
					</el-submenu>

					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span slot="title">导演管理</span>
						</template>
						<el-menu-item index="/home/director-list">
							<i class="el-icon-notebook-2"></i>
							<span slot="title">导演列表</span>
						</el-menu-item>
						<el-menu-item index="/home/director-add">
							<i class="el-icon-plus"></i>
							<span slot="title">新增导演</span>
						</el-menu-item>
					</el-submenu>

					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span slot="title">电影管理</span>
						</template>
						<el-menu-item index="/home/movie-list">
							<i class="el-icon-notebook-2"></i>
							<span slot="title">电影列表</span>
						</el-menu-item>
						<el-menu-item index="/home/movie-add">
							<i class="el-icon-plus"></i>
							<span slot="title">新增电影</span>
						</el-menu-item>
					</el-submenu>

					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span slot="title">电影院管理</span>
						</template>
						<el-menu-item index="/home/cinema-list">
							<i class="el-icon-notebook-2"></i>
							<span slot="title">电影院列表</span>
						</el-menu-item>
						<el-menu-item index="/home/cinema-add">
							<i class="el-icon-plus"></i>
							<span slot="title">新增电影院</span>
						</el-menu-item>
					</el-submenu> -->
				</el-menu>
			</el-aside>

			<el-container>
				<el-header class="header">
					<i v-show="!isCollapse" class="el-icon-s-fold" @click="isCollapse = true"></i>
					<i v-show="isCollapse" class="el-icon-s-unfold" @click="isCollapse = false"></i>
					<!-- 面包屑导航 -->

					<el-breadcrumb separator="/" style="margin-left: 20px; flex: 1">
						<el-breadcrumb-item v-for="item in $route.meta.thumb" :key="item">{{ item }}</el-breadcrumb-item>
					</el-breadcrumb>

					<template v-if="user">
						<span>{{ user.username }}</span
						>&nbsp;|&nbsp; <span>{{ user.nickname }}</span
						>&nbsp;|&nbsp; <span>{{ user.phone }}</span
						>&nbsp;|&nbsp;
						<span>{{ user.email }}</span>
					</template>
				</el-header>

				<el-main>
					<!-- 二级路由所需要显示的内容 -->
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				isCollapse: false,
				menu: [], // 存储完整的菜单列表
			};
		},

		computed: {
			...mapState(["user", "cityname"]),
		},

		mounted() {
			//模拟发送http请求获取当前登录用户的菜单列表;
			let menu = [
				{
					type: "menu-item",
					title: "首页",
					link: "/home/index",
					icon: "el-icon-message",
				},
				{
					type: "sub-menu",
					link: "1",
					title: "演员管理",
					icon: "el-icon-location",
					children: [
						{
							type: "menu-item",
							link: "/home/actor-list",
							title: "演员列表",
							icon: "el-icon-notebook-2",
						},
						{
							type: "menu-item",
							link: "/home/actor-add",
							title: "新增演员",
							icon: "el-icon-plus",
						},
					],
				},
				{
					type: "sub-menu",
					link: "2",
					title: "导演管理",
					icon: "el-icon-location",
					children: [
						{
							type: "menu-item",
							link: "/home/director-list",
							title: "导演列表",
							icon: "el-icon-notebook-2",
						},
						{
							type: "menu-item",
							link: "/home/director-add",
							title: "新增导演",
							icon: "el-icon-plus",
						},
					],
				},
				{
					type: "sub-menu",
					link: "3",
					title: "电影管理",
					icon: "el-icon-location",
					children: [
						{
							type: "menu-item",
							link: "/home/movie-list",
							title: "电影列表",
							icon: "el-icon-notebook-2",
						},
						{
							type: "menu-item",
							link: "/home/movie-add",
							title: "新增电影",
							icon: "el-icon-plus",
						},
					],
				},
				{
					type: "sub-menu",
					link: "4",
					title: "电影院管理",
					icon: "el-icon-location",
					children: [
						{
							type: "menu-item",
							link: "/home/cinema-list",
							title: "电影院列表",
							icon: "el-icon-notebook-2",
						},
						{
							type: "menu-item",
							link: "/home/cinema-add",
							title: "新增电影院",
							icon: "el-icon-plus",
						},
					],
				},
			];
			this.menu = menu;
		},
	};
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;

		i {
			font-size: 1.3em;
		}
	}
	.aside::-webkit-scrollbar {
		display: none;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 240px;
		min-height: 400px;
	}
</style>
