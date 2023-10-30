<template>
	<div>
		<h2>this is table page</h2>
		<h2>employee tables</h2>
		<!-- display the table -->
		<hr />
		<h2>table illustration</h2>
		<el-table :data="tableData" style="width: 100%" class="table">
			<el-table-column prop="date" label="日期" width="180"> </el-table-column>
			<el-table-column prop="name" label="姓名" width="180"> </el-table-column>
			<el-table-column prop="address" label="地址"> </el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				persons: [
					{ id: 101, name: "晓宇", age: 18, gender: "女", married: false },
					{ id: 102, name: "亮亮", age: 28, gender: "男", married: false },
					{ id: 103, name: "小新", age: 38, gender: "男", married: true },
					{ id: 104, name: "华哥", age: 48, gender: "男", married: true },
				],
				tableData: [
					{
						date: "2016-05-02",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄",
					},
					{
						date: "2016-05-04",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1517 弄",
					},
					{
						date: "2016-05-01",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1519 弄",
					},
					{
						date: "2016-05-03",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1516 弄",
					},
				],
			};
		},
	};
</script>

<style lang="scss" scoped>
	.table {
		margin: 0 auto !important;
	}
</style>
