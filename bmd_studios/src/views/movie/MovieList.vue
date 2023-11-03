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

		<el-table style="width: 100%">
			<el-table-column label="封面" width="100"></el-table-column>
			<el-table-column label="标题" width="150"></el-table-column>
			<el-table-column label="主演" width="200"></el-table-column>
			<el-table-column label="上映时间" width="150"></el-table-column>
			<el-table-column label="时长" width="100"></el-table-column>
			<el-table-column label="所属类别" width="100"></el-table-column>
			<el-table-column label="操作" width="200"></el-table-column>
		</el-table>

		<!-- pagination -->
		<el-pagination
			background
			content-position="right"
			:total="100"
			:page-size="6"
			:current-page="3"
			layout="->,total, prev, pager, next,jumper"
			style="margin: 10px">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				name: "",
			};
		},
		methods: {
			search() {},
		},
	};
</script>

<style lang="scss" scoped></style>
