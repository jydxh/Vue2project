<template>
	<div>
		<h2>employee tables</h2>
		<!-- display the table -->
		<hr />

		<el-table :data="persons" style="width: 100%" class="table">
			<el-table-column prop="id" label="ID" width="180"> </el-table-column>
			<el-table-column prop="name" label="Name" width="180"> </el-table-column>
			<el-table-column prop="age" label="Age" width="180"> </el-table-column>
			<el-table-column prop="gender" label="Gender" width="180"> </el-table-column>
			<el-table-column prop="married" label="Marriage Status" width="180"> </el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				persons: [
					{ id: 101, name: "晓宇", age: 18, gender: "女", married: "false" },
					{ id: 102, name: "亮亮", age: 28, gender: "男", married: "false" },
					{ id: 103, name: "小新", age: 38, gender: "男", married: "true" },
					{ id: 104, name: "华哥", age: 48, gender: "男", married: "true" },
				],
			};
		},
	};
</script>

<style lang="scss" scoped>
	.table {
		margin-left: 220px;
	}
</style>
