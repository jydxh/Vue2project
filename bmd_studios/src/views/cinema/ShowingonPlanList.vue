<template>
	<div>
		为 <span style="color: #3f9dff; font-weight: bold">{{ roomData.cinema_name }}</span> 的
		<span style="color: #3f9dff; font-weight: bold">{{ roomData.cinema_room_name }} （{{ roomData.cinema_room_type }}） </span>
		的排片计划列表

		<el-divider></el-divider>

		<!-- table -->
		<el-table :data="tableData">
			<el-table-column prop="title" label="电影名称" width="300" align="center"></el-table-column>

			<el-table-column prop="showingon_date" label="放映时间" width="150" align="center"></el-table-column>

			<el-table-column prop="showingon_time" label="场次" width="150" align="center"></el-table-column>

			<el-table-column label="票价" align="center">
				<template slot-scope="scope"> {{ scope.row.price }} 元 </template>
			</el-table-column>

			<el-table-column label="是否已发布" align="center">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="updateStatus(scope.row.status, scope.row.plan_id)"> </el-switch>
				</template>
			</el-table-column>

			<el-table-column label="操作" align="center">
				<el-button type="danger" size="small" icon="el-icon-delete" circle></el-button>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import httpApi from "../../http";
	export default {
		data() {
			return {
				roomData: {},
				tableData: [],
			};
		},
		methods: {
			updateStatus(status, id) {
				if (status == 1) {
					httpApi.showingonPlanApi.publish({ id }).then(res => {
						console.log(res);
					});
				} else if (status == 0) {
					httpApi.showingonPlanApi.noPublish({ id }).then(res => {
						console.log(res);
					});
				}
			},
			initTableData() {
				let room_id = this.$route.params.roomId;
				httpApi.showingonPlanApi.queryByRoomId({ room_id }).then(res => {
					console.log(res);
					this.tableData = res.data.data;
				});
			},
			initRoomData() {
				let id = this.$route.params.roomId;
				httpApi.cinemaRoomApi.queryById({ id }).then(res => {
					console.log(res.data.data);
					this.roomData = res.data.data;
				});
			},
		},
		mounted() {
			this.initRoomData();
			this.initTableData();
		},
	};
</script>

<style lang="scss" scoped></style>
