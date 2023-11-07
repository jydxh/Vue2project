<template>
	<div>
		为 <span style="color: #3f9dff; font-weight: bold">{{ roomData.cinema_name }}</span> 的
		<span style="color: #3f9dff; font-weight: bold">{{ roomData.cinema_room_name }} （{{ roomData.cinema_room_type }}） </span>
		添加排片计划

		<el-divider></el-divider>

		<!-- form -->
		<el-form ref="form" style="width: 800px" :model="form" :rules="rules" label-width="120px">
			<el-form-item label="电影名称">
				<el-select placeholder="请电影名称" style="width: 100%">
					<el-option label="1" value="1"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="放映日期" prop="date1">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%"></el-date-picker>
				</el-col>
				<el-col class="line" :span="1" style="text-align: center">- </el-col>
				<el-col :span="11">
					<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%"></el-time-picker>
				</el-col>
			</el-form-item>

			<el-form-item label="票价">
				<el-input width="300px"></el-input>
			</el-form-item>

			<el-form-item label="立即发布">
				<el-switch></el-switch>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submit">立即新增该计划</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import httpApi from "../../http";
	export default {
		data() {
			return {
				roomData: {},
				form: {
					movie: "",
					date1: "",
					date2: "",
					price: "0",
					delivery: true,
				},
				rules: {
					movie: [{ required: true, message: "cannot be empty", trigger: blur }],
					date1: [{ required: true, message: "cannot be empty", trigger: blur }],
					date2: [{ required: true, message: "cannot be empty", trigger: blur }],
					price: [{ required: true, message: "cannot be empty", trigger: blur }],
					delivery: [{ required: true, message: "cannot be empty", trigger: blur }],
				},
			};
		},
		mounted() {
			this.initRoomData();
		},

		methods: {
			initRoomData() {
				let id = this.$route.params.roomId;
				httpApi.cinemaRoomApi.queryById({ id }).then(res => {
					console.log(res.data.data);
					this.roomData = res.data.data;
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
