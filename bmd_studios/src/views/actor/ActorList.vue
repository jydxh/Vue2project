<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>演员管理</el-breadcrumb-item>
			<el-breadcrumb-item>演员列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>

		<!-- 搜索表单 -->
		<el-form @submit.native.prevent :inline="true" class="demo-form-inline">
			<el-form-item label="姓名">
				<el-input v-model="name" @keyup.native.enter="search" placeholder="请输入姓名关键字"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
		</el-form>

		<el-divider content-position="left">演员列表</el-divider>
		<!--  -->
		<!-- 呈现演员列表 -->
		<person :name="item.actor_name" :avatar="item.actor_avatar" v-for="item in actors" :key="item.id" @del="deleteActor(item.id)"></person>
		<!-- 确认消息弹窗 -->
		<!-- <template>
			<el-button type="text" @click="open" style="display: none"></el-button>
		</template> -->
	</div>
</template>

<script>
	import Person from "@/components/Person.vue";
	import myaxios from "@/http/Myaxios.js";
	import httpApi from "@/http/index.js";
	export default {
		components: {
			Person,
		},
		data() {
			return {
				actors: [],
				name: "", //绑定输入框value name
			};
		},
		// 组件挂在完毕后执行
		mounted() {
			this.init();
		},
		/* pay attention here !!! methods! */
		methods: {
			// 弹窗代码
			open(id) {
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
						httpApi.actorApi.delete({ id }).then(res => {
							console.log("删除演员结果：", res);
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
			// 删除演员
			deleteActor(id) {
				console.log("catch the event in parents: ", id);
				this.open(id);
				/* const url = "http://localhost:3010/movie-actor/del";
				const params = { id };
				myaxios.post(url, params).then(res => {
					console.log("删除演员结果：", res);
					if ((res.data.code = 200)) this.search();
				}); */
			},
			/* 初始化数据 */
			init() {
				httpApi.actorApi
					.queryAllActors()
					.then(res => {
						console.log("result:", res);
						this.actors = res.data.data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			/* 点击查询后模糊查询列表数据 */
			search() {
				let para = { name: this.name };
				this.name !== ""
					? httpApi.actorApi.queryqueryByNameLike(para).then(res => {
							console.log("query results:", res);
							this.actors = res.data.data; //更新列表
					  })
					: this.init();
			},
		},
	};
</script>

<style lang="scss" scoped></style>
