<template>
	<div>
		<el-form label-width="80px">
			<el-form-item label="姓名">
				<el-input placeholder="请输入关键字" v-model="name" style="width: 300px"></el-input>

				<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
		</el-form>

		<el-divider content-position="left">导演列表</el-divider>
		<person v-for="item in directors" :key="item.id" :name="item.director_name" :avatar="item.director_avatar" @del="deleteDirector(item.id)"></person>
	</div>
</template>

<script>
	import Person from "../../components/Person.vue";
	import myaxios from "../../http/Myaxios";
	export default {
		components: { Person },
		data() {
			return {
				directors: [],
				name: "",
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			// 弹窗代码

			deleteDirector(id) {
				this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						this.$message({
							type: "success",
							message: "删除成功!",
						});
						/* axios删除服务器对应id */
						const url = "http://localhost:3010/movie-director/del";
						const params = { id };
						myaxios.post(url, params).then(res => {
							console.log("删除导演结果：", res);
							if ((res.data.code = 200)) this.search();
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			},
			init() {
				const url = "http://localhost:3010/movie-directors";
				const params = { page: 1, pagesize: 100 };
				myaxios.get(url, params).then(res => (this.directors = res.data.data));
			},

			search() {
				const url = "http://localhost:3010/movie-directors/name";
				const params = { name: this.name };
				this.name !== ""
					? myaxios.post(url, params).then(res => {
							console.log(res.data.data);
							this.directors = res.data.data;
					  })
					: this.init();
			},
		},
	};
</script>

<style lang="scss" scoped></style>
