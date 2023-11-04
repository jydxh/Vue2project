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
			<el-table-column label="电影封面" align="center" width="100">
				<template slot-scope="scope"> <img :src="scope.row.cover" width="60px" /> </template>
			</el-table-column>
			<el-table-column label="电影名称" align="center" prop="title"></el-table-column>
			<el-table-column label="主演" align="center" width="200" prop="star_actor"></el-table-column>
			<el-table-column label="上映时间" align="center" width="120" prop="showingon"></el-table-column>

			<el-table-column label="时长" align="center" width="80">
				<template slot-scope="scope"> {{ scope.row.duration }} 分钟 </template>
			</el-table-column>

			<el-table-column label="所属类别" align="center" prop="type"></el-table-column>
			<el-table-column label="操作" align="center" width="180">
				<el-button size="small" type="info" icon="el-icon-user" circle></el-button>
				<el-button size="small" type="success" icon="el-icon-picture-outline" circle></el-button>
				<el-button size="small" type="warning" icon="el-icon-edit" circle></el-button>
				<el-button size="small" type="danger" icon="el-icon-delete" circle></el-button>
			</el-table-column>
		</el-table>

		<!-- pagination -->
		<div class="pagination">
			<el-pagination
				background
				:total="movieData.total"
				:page-size="movieData.pagesize"
				:current-page="movieData.page"
				@current-change="changeCurrentpage"
				@prev-click="changeCurrentpage"
				@next-click="changeCurrentpage"
				layout="total, prev,pager, next,jumper  "
				style="margin: 10px">
			</el-pagination>
		</div>
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
					pagesize: 5, // 每页条数
					total: 0, // 总条目数
					result: [], // 电影列表
				},
			};
		},

		mounted() {
			this.queryMovies();
		},
		methods: {
			search() {},
			handleEdit() {},
			handleDelete() {},
			changeCurrentpage(page) {
				this.movieData.page = page;
				this.queryMovies();
			},
			/* 查询电影列表，根据当前页码 发送请求， 更新列表 */
			queryMovies() {
				let params = { page: this.movieData.page, pagesize: this.movieData.pagesize };
				httpApi.movieApi.queryAllMovie(params).then(res => {
					console.log("home page of movie:", res.data.data);
					this.movieData = res.data.data;
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.pagination {
		width: 80vw;
		margin: 20px auto;
		display: flex;
		justify-content: center;
	}
</style>
