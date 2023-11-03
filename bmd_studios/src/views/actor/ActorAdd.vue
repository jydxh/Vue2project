<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>演员管理</el-breadcrumb-item>
			<el-breadcrumb-item>新增演员</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>

		<!-- 添加演员表单 -->
		<el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 600px">
			<el-form-item label="姓名" prop="actorName">
				<el-input v-model="form.actorName"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="actorAvatar">
				<el-upload
					class="avatar-uploader"
					:action="uploadURL + '/upload'"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="form.actorAvatar" :src="form.actorAvatar" class="avatar" />
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
	import httpApi from "@/http/index.js";
	/* import BaseUrl from "../../http/BaseUrl.js";
	const url = BaseUrl.UPLOADURL; */
	export default {
		data() {
			return {
				// url,
				form: {
					actorName: "", // 封装演员名字
					actorAvatar: "", // 封装演员头像路径
				},
				rules: {
					actorName: [{ required: true, message: "请输入演员名字", trigger: "blur" }],
					actorAvatar: [{ required: true, message: "请先上传头像再提交", trigger: "blur" }],
				},
			};
		},

		methods: {
			/* 取消重置表单 */
			cancel() {
				this.form.actorAvatar = "";
				this.form.actorName = "";
			},
			/* 提交表单 */
			submit() {
				let params = this.form;
				this.$refs["form"].validate(valid => {
					if (valid) {
						httpApi.actorApi
							.add(params)
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
				this.form.actorAvatar = res.data;
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
