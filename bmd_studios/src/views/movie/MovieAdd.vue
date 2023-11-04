<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>电影管理</el-breadcrumb-item>
			<el-breadcrumb-item>新增电影</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>

		<!-- form -->
		<el-form style="width: 600px" label-width="120px">
			<el-form-item label="封面图片">
				<el-upload
					class="avatar-uploader"
					:action="uploadURL + '/upload'"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
					<i class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>

			<el-form-item label="电影类别">
				<el-radio-group>
					<el-radio label="1">热映</el-radio>
					<el-radio label="2">待映</el-radio>
					<el-radio label="3">经典</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="电影名称" prop="name">
				<el-input type="text"></el-input>
			</el-form-item>

			<el-form-item label="电影类型">
				<el-select multiple placeholder="请选择电影类型">
					<el-option label="爱情"></el-option>
					<el-option label="悬疑"></el-option>
					<el-option label="动作"></el-option>
					<el-option label="科幻"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="电影主演">
				<el-select multiple filterable remote reserve-keyword placeholder="请输入关键词">
					<el-option label="主演1"></el-option>
					<el-option label="主演2"></el-option>
					<el-option label="主演3"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="上映时间">
				<el-date-picker type="date" placeholder="选择日期"> </el-date-picker>
			</el-form-item>

			<el-form-item label="电影评分">
				<el-input type="text"></el-input>
			</el-form-item>
			<el-form-item label="电影时长">
				<el-input type="text"></el-input>
			</el-form-item>
			<el-form-item label="电影简介">
				<el-input type="textarea" rows="3"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary">立即创建</el-button>
				<el-button>重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		methods: {
			handleAvatarSuccess(res, file) {
				console.log(res);
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
<style scoped>
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
		width: 120px;
		height: 120px;
		display: block;
	}
</style>
