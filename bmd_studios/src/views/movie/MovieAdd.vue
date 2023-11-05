<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>电影管理</el-breadcrumb-item>
			<el-breadcrumb-item>新增电影</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>

		<!-- 新增电影的表单 -->
		<el-form label-width="120px" style="width: 600px">
			<el-form-item label="封面图片">
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
			<el-form-item label="电影类别">
				<el-radio label="1" v-model="form.categoryId">热映</el-radio>
				<el-radio label="2" v-model="form.categoryId">待映</el-radio>
				<el-radio label="3" v-model="form.categoryId">经典</el-radio>
			</el-form-item>
			<el-form-item label="电影名称">
				<el-input type="text" v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="电影类型">
				<el-select multiple placeholder="请选择电影类型" v-model="form.type">
					<el-option v-for="item in types" :key="item.id" :label="item.typename" :value="item.typename"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="电影主演">
				<el-select v-model="form.starActor" multiple filterable remote reserve-keyword placeholder="请输入关键词">
					<el-option label="主演1"></el-option>
					<el-option label="主演2"></el-option>
					<el-option label="主演3"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="上映时间">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.showingon"> </el-date-picker>
			</el-form-item>
			<el-form-item label="电影评分">
				<el-input type="text" v-model="form.score"></el-input>
			</el-form-item>
			<el-form-item label="电影时长">
				<el-input type="text" v-model="form.duration"></el-input>
			</el-form-item>
			<el-form-item label="电影简介">
				<el-input type="textarea" rows="3" v-model="form.description"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">立即创建</el-button>
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
					categoryId: "1", //类别id 1=热映
					cover: "",
					title: "",
					type: [],
					starActor: "",
					showingon: "",
					score: "",
					description: "",
					duration: "",
				},
				types: [], // 保存所有电影类型
			};
		},
		mounted() {
			this.initMovieTypes();
		},
		methods: {
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
		line-height: 120px;
		text-align: center;
	}
	.avatar {
		width: 120px;
		display: block;
	}
</style>
