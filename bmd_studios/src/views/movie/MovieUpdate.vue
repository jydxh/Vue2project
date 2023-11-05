<template>
	<div>
		<!-- 新增电影的表单 -->
		<el-form label-width="120px" style="width: 600px" ref="form" :model="form" :rules="rules">
			<el-form-item label="封面图片" prop="cover">
				<el-upload
					class="avatar-uploader"
					:action="`${uploadURL}/upload`"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="form.cover" :src="form.cover" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="电影类别" prop="category_id">
				<el-radio :label="1" v-model="form.category_id">热映</el-radio>
				<el-radio :label="2" v-model="form.category_id">待映</el-radio>
				<el-radio :label="3" v-model="form.category_id">经典</el-radio>
			</el-form-item>
			<el-form-item label="电影名称" prop="title">
				<el-input type="text" v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="电影类型" prop="type">
				<el-select style="width: 100%" multiple placeholder="请选择电影类型" v-model="form.type">
					<el-option v-for="item in types" :key="item.id" :label="item.typename" :value="item.typename"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="电影主演" prop="star_actor">
				<el-select
					style="width: 100%"
					v-model="form.star_actor"
					multiple
					filterable
					remote
					reserve-keyword
					placeholder="请输入关键词"
					:remote-method="remoteMethod"
					:loading="loading">
					<el-option v-for="item in actors" :key="item.id" :value="item.actor_name" :label="item.actor_name"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="上映时间" prop="showingon">
				<el-date-picker style="width: 100%" type="date" placeholder="选择日期" v-model="form.showingon" value-format="yyyy-MM-dd"> </el-date-picker>
			</el-form-item>
			<el-form-item label="电影评分" prop="score">
				<el-input type="text" v-model="form.score"></el-input>
			</el-form-item>
			<el-form-item label="电影时长" prop="duration">
				<el-input type="text" v-model="form.duration"></el-input>
			</el-form-item>
			<el-form-item label="电影简介" prop="description">
				<el-input type="textarea" rows="3" v-model="form.description"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submit">立即更新</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import httpApi from "../../http/index";
	export default {
		data() {
			return {
				// 保存当前表单收集到的数据
				form: {
					category_id: "1", //类别id 1=热映
					cover: "",
					title: "",
					type: [],
					star_actor: [],
					showingon: "",
					score: "",
					description: "",
					duration: "",
					id: this.$route.params.id, //获取列表页传过来的参数 电影id 通过id才可以获取详细数据
				},
				rules: {
					category_id: [{ required: true, message: "选项不能为空", trigger: "blur" }],
					cover: [{ required: true, message: "选项不能为空", trigger: "blur" }],
					title: [{ required: true, message: "选项不能为空", trigger: "blur" }],
					type: [{ required: true, message: "选项不能为空", trigger: "change" }],
					star_actor: [{ required: true, message: "选项不能为空", trigger: "change" }],
					showingon: [{ required: true, message: "选项不能为空", trigger: "blur" }],
					score: [{ required: true, message: "选项不能为空", trigger: "blur" }],
					description: [{ required: true, message: "选项不能为空", trigger: "blur" }],
					duration: [{ required: true, message: "选项不能为空", trigger: "blur" }],
				},
				types: [], // 保存所有电影类型
				actors: [],
				loading: false, // 下拉列表是否正在加载
			};
		},
		mounted() {
			httpApi.movieApi.queryById({ id: this.form.id }).then(res => {
				console.log("queryById: ", res);
				let { type, star_actor } = res.data.data;
				this.form = res.data.data;
				this.form.type = type.split("／");
				this.form.star_actor = star_actor.split("／");
			});

			this.initMovieTypes();
		},
		methods: {
			/* 提交表单 */
			submit() {
				// 处理form中的字段，改为服务器需要的格式（string）
				this.form.type = this.form.type.join("／");
				this.form.star_actor = this.form.star_actor.join("／");
				//去掉服务器不要的属性
				this.form.actor = undefined;
				this.form.director = undefined;
				this.form.thumb = undefined;

				console.log(this.form);
				// 验证表单
				this.$refs["form"].validate(valid => {
					if (valid) {
						httpApi.movieApi.update(this.form).then(res => {
							console.log("update: ", res);
							if (res.data.code == 200) {
								this.$message({ type: "success", message: "更新成功！" });
								//刷新当前网页
								this.$router.go(0);
							}
						});
					}
				});
			},
			// 若表单数据收集完毕，发送新增请求即可

			/* 当在el-select中输入内容，需要异步搜索演员时 执行 */
			remoteMethod(name) {
				console.log(name);
				let params = { name };
				if (name !== "") {
					this.loading = true;
					httpApi.actorApi.queryqueryByNameLike(params).then(res => {
						console.log("actorquery result:", res);
						this.actors = res.data.data;
						this.loading = false;
					});
				}
			},
			initMovieTypes() {
				httpApi.movieApi.queryMovieType().then(res => {
					console.log("queryMovieType result: ", res.data.data);
					this.types = res.data.data;
				});
			},
			handleAvatarSuccess(res, file) {
				console.log(res.data);
				this.form.cover = res.data;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === "image/jpeg";
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error("上传头像图片只能是 JPG 格式!");
				}
				if (!isLt2M) {
					this.$message.error("上传头像图片大小不能超过 2MB!");
				}
				return isJPG && isLt2M;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 120px;
		line-height: 120px;
		text-align: center;
	}
	.avatar {
		width: 120px;
		display: block;
	}
</style>
