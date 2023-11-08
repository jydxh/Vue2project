<template>
	<div>
		<el-button @click="dialogFormVisible = true" plain type="primary">新增放映厅</el-button>
		<el-divider content-position="left">放映厅列表</el-divider>

		<!-- 放映厅列表数据 -->
		<el-table :data="rooms">
			<el-table-column label="放映厅名称" align="center" prop="room_name"></el-table-column>
			<el-table-column label="放映厅类型" align="center" prop="room_type"></el-table-column>
			<el-table-column label="放映厅座位数" align="center">
				<template slot-scope="scope"> {{ scope.row.room_size ? scrope.row.room_size : "【暂未配置座位模板】" }} </template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button size="small" type="success" icon="el-icon-view" circle @click="$router.push('/home/showingon-plan-list/' + scope.row.id)"></el-button>
					<el-button size="small" type="primary" icon="el-icon-plus" circle @click="$router.push('/home/showingon-plan-add/' + scope.row.id)"></el-button>
					<el-button size="small" type="warning" icon="el-icon-menu" circle @click="$router.push('/home/seat-template')"></el-button>
					<el-button size="small" type="danger" icon="el-icon-delete" circle @click="deleteRoom(scope.row)"></el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 新增放映厅表单 对话框 -->
		<el-dialog title="新增放映厅" :visible.sync="dialogFormVisible">
			<el-form :model="form" style="width: 85%" ref="form" :rules="rules">
				<el-form-item label="放映厅名称" label-width="130px" prop="room_name">
					<el-input v-model="form.room_name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="放映厅类型" label-width="130px" prop="room_type">
					<el-select v-model="form.room_type" placeholder="放映厅类型">
						<el-option v-for="item in types" :key="item.id" :label="item.type_name" :value="item.type_name"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import httpApi from "../../http";

	export default {
		data() {
			return {
				dialogFormVisible: false, // 控制Dialog的显示与隐藏
				form: {
					room_name: "",
					room_type: "",
					movie_cinema_id: this.$route.params.cinemaId,
				},
				rules: {
					room_name: [{ required: "true", message: "该项不能为空", trigger: "blur" }],
					room_type: [{ required: "true", message: "该项不能为空", trigger: "change" }],
				},
				types: [],
				rooms: [],
			};
		},
		methods: {
			deleteRoom(row) {
				this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						httpApi.cinemaRoomApi.delete({ id: row.id }).then(res => {
							console.log(res);
							if (res.data.code == 200) {
								this.$message({
									type: "success",
									message: "删除成功!",
								});
								this.$router.go();
							}
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			},
			submit() {
				this.$refs["form"].validate(valid => {
					if (valid) {
						console.log(this.form);
						httpApi.cinemaRoomApi.add(this.form).then(res => {
							console.log("submit result:", res);
							if (res.data.code == 200) {
								this.$message.success("放映厅添加成功");
								this.dialogFormVisible = false;
								this.$router.go();
							} else {
								this.$message.error("系统异常，稍后再试");
							}
						});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			initRoomTypes() {
				httpApi.cinemaRoomApi.queryAllTypes().then(res => {
					console.log("加载电影类型列表", res);
					this.types = res.data.data;
				});
			},
			initList() {
				httpApi.cinemaRoomApi.list({ cinema_id: this.form.movie_cinema_id }).then(res => {
					console.log("initList result:", res.data.data);
					this.rooms = res.data.data;
				});
			},
		},
		mounted() {
			this.initRoomTypes();
			this.initList();
		},
	};
</script>

<style lang="scss" scoped></style>
