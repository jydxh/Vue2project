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
		<person :name="item.actor_name" :avatar="item.actor_avatar" v-for="item in actors" :key="item.id"></person>
	</div>
</template>

<script>
	import Person from "@/components/Person.vue";
	import myaxios from "@/http/Myaxios.js";
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
			/* 初始化数据 */
			init() {
				/* let url = "https://web.codeboy.com/bmdapi/movie-actors"; */
				const url = "http://localhost:3010/movie-actors";
				const params = { page: 150, pagesize: 120 };
				myaxios
					.get(url, params)
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
				const url = "http://localhost:3010/movie-actors/name";
				let para = { name: this.name };
				this.name !== ""
					? myaxios.post(url, para).then(res => {
							console.log("query results:", res);
							this.actors = res.data.data; //更新列表
					  })
					: this.init();
			},
		},
	};
</script>

<style lang="scss" scoped></style>
