<template>
	<div>
		<!-- 添加导演表单 -->
		<el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 600px">
			<el-form-item label="姓名" prop="directorName">
				<el-input v-model="form.directorName"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="directorAvatar">
				<el-upload
					class="avatar-uploader"
					action="http://localhost:9000/upload"
					:show-file-list="true"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="form.directorAvatar" :src="form.directorAvatar" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submit">立即新增</el-button>
				<el-button @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import myaxios from "@/http/Myaxios.js";
	export default {
		data() {
			return {
				form: {
					directorName: "", // 封装导演名字
					directorAvatar: "", // 封装导演头像路径
				},
				rules: {
					directorName: [{ required: true, message: "请输入导演名字", trigger: "blur" }],
					directorAvatar: [{ required: true, message: "请先上传头像再提交", trigger: "blur" }],
				},
			};
		},

		methods: {
			/* 取消重置表单 */
			cancel() {
				this.form.directorAvatar = "";
				this.form.directorName = "";
			},
			/* 提交表单 */
			submit() {
				const url = "http://localhost:3010/movie-director/add";
				let params = this.form;
				this.$refs["form"].validate(valid => {
					if (valid) {
						myaxios
							.post(url, params)
							.then(res => {
								console.log(res);
								if (res.data.code == 200) {
									this.$message.success("上传成功！");
								} else {
									this.$message.error("服务器繁忙，请重试");
								}
								// reset form
								this.$refs["form"].resetFields();
							})
							.catch(err => {
								console.log(err);
							});
					} else {
						this.$message.error("上传失败，请重试！");
					}
				});
			},

			/** 上传成功后执行 */
			handleAvatarSuccess(res, file) {
				//console.log(res.data);
				this.form.directorAvatar = res.data;
			},

			/** 上传之前完成图片格式的验证 */
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
		height: 120px;
		line-height: 120px;
		text-align: center;
	}
	.avatar {
		width: 140px;
		height: 140px;
		object-fit: cover;
		display: block;
	}
</style>
