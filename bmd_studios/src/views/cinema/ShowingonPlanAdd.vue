<template>
	<div>
		为 <span style="color: #3f9dff; font-weight: bold">{{ roomData.cinema_name }}</span> 的
		<span style="color: #3f9dff; font-weight: bold">{{ roomData.cinema_room_name }} （{{ roomData.cinema_room_type }}） </span>
		添加排片计划

		<el-divider></el-divider>

		<!-- form -->
		<el-form ref="form" style="width: 800px" :model="form" :rules="rules" label-width="120px">
			<el-form-item label="选择电影">
				<el-select
					placeholder="请电影名称"
					style="width: 100%"
					v-model="form.movie_id"
					filterable
					remote
					reserve-keyword
					:remote-method="remoteMethod"
					:loading="loading">
					<el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="放映日期" prop="showingon_date & showingon_time">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.showingon_date" style="width: 100%" value-format="yyyy-MM-dd"></el-date-picker>
				</el-col>
				<el-col class="line" :span="1" style="text-align: center">- </el-col>
				<el-col :span="11">
					<el-time-select
						placeholder="选择时间"
						v-model="form.showingon_time"
						style="width: 100%"
						value-format="HH:mm"
						:picker-options="{
							start: '06:00',
							step: '00:15',
							end: '23:59',
						}"></el-time-select>
				</el-col>
			</el-form-item>

			<el-form-item label="票价" prop="price">
				<el-input width="300px" v-model="form.price"></el-input>
			</el-form-item>

			<el-form-item label="立即发布" prop="status">
				<el-switch v-model="form.status"></el-switch>
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
				options: [],
				loading: false,
				roomData: {},
				form: {
					cinema_id: "", //this.roomData.cinema_id,
					cinema_room_id: "", //this.$route.params.roomId,
					movie_id: "",
					showingon_date: "",
					showingon_time: "",
					price: "0",
					status: true,
				},
				rules: {
					movie_id: [{ required: true, message: "cannot be empty", trigger: "change" }],
					showingon_date: [{ required: true, message: "cannot be empty", trigger: "change" }],
					showingon_time: [{ required: true, message: "cannot be empty", trigger: "change" }],
					price: [{ required: true, message: "cannot be empty", trigger: "blur" }],
					status: [{ required: true, message: "cannot be empty", trigger: "change" }],
				},
			};
		},
		mounted() {
			this.initRoomData();
		},

		methods: {
			submit() {
				this.form.cinema_id = this.roomData.cinema_id;
				this.form.cinema_room_id = this.$route.params.roomId;
				this.form.status ? (this.form.status = 1) : (this.form.status = 0);

				console.log("form:", this.form);
			},
			remoteMethod(query) {
				if (query !== "") {
					this.loading = true;
					let params = { name: query, page: 1, pagesize: 100 };
					httpApi.movieApi.queryByNameLike(params).then(res => {
						this.loading = false;
						console.log(res.data.data);
						this.options = res.data.data.result;
					});
				} else {
					this.options = [];
				}
			},
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
