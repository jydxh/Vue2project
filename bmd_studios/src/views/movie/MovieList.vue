<template>
	<div>
		<!-- 搜索表单 -->
		<el-form @submit.native.prevent :inline="true" class="demo-form-inline">
			<el-form-item label="电影名称">
				<el-input v-model="name" @keyup.native.enter="search" placeholder="请输入电影关键字" clearable></el-input>
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
				<template slot-scope="scope">
					<el-button size="small" type="info" icon="el-icon-user" circle></el-button>
					<el-button size="small" type="success" icon="el-icon-picture-outline" circle></el-button>
					<el-button size="small" type="warning" icon="el-icon-edit" circle @click="updateMovie(scope.row.id)"></el-button>
					<el-button size="small" type="danger" icon="el-icon-delete" circle @click="deleteMovie(scope.$index, scope.row)"></el-button>
				</template>
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
			/* 修改电影 */
			updateMovie(id) {
				console.log(id);
				this.$router.push(`/home/movie-update/${id}`);
			},
			deleteMovie(index, row) {
				console.log(index, row); // row = this.movieData.result
				let param = { id: row.id };

				this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						httpApi.movieApi.delete(param).then(res => {
							console.log(res);
							if (res.data.code == 200) {
								this.$message({
									type: "success",
									message: "删除成功!",
								});
								this.search();
							} else {
								this.$message({
									type: "fail",
									message: "删除失败！",
								});
							}
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			},

			search() {
				let params = { name: this.name, page: this.movieData.page, pagesize: this.movieData.pagesize };
				if (params.name == "") {
					this.queryMovies();
				} else {
					httpApi.movieApi.queryByNameLike(params).then(res => {
						console.log(res);
						this.movieData = res.data.data;
					});
				}
			},

			changeCurrentpage(page) {
				if (this.name == "") {
					this.movieData.page = page;
					this.queryMovies();
				} else {
					this.movieData.page = page;
					this.search();
				}
			},
			/* 查询电影列表，根据当前页码 发送请求， 更新列表 */
			queryMovies() {
				let params = { page: this.movieData.page, pagesize: this.movieData.pagesize };
				httpApi.movieApi.queryAll(params).then(res => {
					console.log("home page of movie:", res);
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
