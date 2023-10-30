<template>
	<div>
		<h2>employee tables</h2>
		<!-- display the table -->

		<el-table :data="persons" style="width: 80%" class="table">
			<el-table-column prop="id" label="ID" width="50"> </el-table-column>
			<el-table-column label="Name" width="100">
				<template slot-scope="scope">
					<el-tag size="small">{{ scope.row.name }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="Age" width="80">
				<template slot-scope="scope"> {{ scope.row.age }}周岁 </template>
			</el-table-column>
			<el-table-column prop="gender" label="Gender" width="80"> </el-table-column>
			<el-table-column label="Marriage Status" width="180">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.married" type="success">已婚</el-tag>
					<el-tag v-else type="danger">未婚</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
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
			};
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
				// confirm("are you sure delete it?") ? this.persons.splice(index, 1) : null;
				this.$confirm("此操作将永久删除该员工, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						this.persons.splice(index, 1);
						this.$message({
							type: "success",
							message: "删除成功!",
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.table {
		margin-left: 220px;
		overflow: hidden;
	}
</style>
