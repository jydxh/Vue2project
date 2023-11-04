<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator=">">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>电影管理</el-breadcrumb-item>
			<el-breadcrumb-item>电影列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>

		<!-- 搜索表单 -->
		<el-form @submit.native.prevent :inline="true" class="demo-form-inline">
			<el-form-item label="电影名称">
				<el-input v-model="name" @keyup.native.enter="search" placeholder="请输入电影关键字"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
		</el-form>

		<el-divider content-position="left">电影列表</el-divider>

		<!-- table -->

		<el-table :data="movieData.result">
			<el-table-column label="封面" width="100" prop="cover"></el-table-column>
			<el-table-column label="标题" width="150" prop="title"></el-table-column>
			<el-table-column label="主演" width="200" prop="star_actor"></el-table-column>
			<el-table-column label="上映时间" width="150" prop="showingon"></el-table-column>
			<el-table-column label="时长" width="100" prop="duration"></el-table-column>
			<el-table-column label="所属类别" width="100" prop="type"></el-table-column>
			<el-table-column label="操作" width="200"></el-table-column>
		</el-table>

		<!-- pagination -->
		<el-pagination
			background
			content-position="right"
			:total="2013"
			:page-size="2"
			:current-page="2"
			layout="->,total, prev, pager, next,jumper"
			style="margin: 10px">
		</el-pagination>
	</div>
</template>

<script>
	import httpApi from "@/http/index.js";
	export default {
		data() {
			return {
				tableData: [],
				name: "", // save query key words
				// 保存电影数据
				movieData: {
					page: 1, //当前页面
					pagesize: 10, // 每页条数
					total: 0, // 总条目数
					result: [], // 电影列表
				},
			};
		},

		mounted() {
			this.init();
		},
		methods: {
			search() {},

			init() {
				let params = { page: 1, pagesize: 10 };
				httpApi.movieApi.queryAllMovie(params).then(res => {
					console.log("home page of movie:", res.data.data);
					this.movieData = res.data.data;
					console.log(this.movieData);
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
