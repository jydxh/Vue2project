<template>
	<div class="form">
		<el-form :model="form" :rules="rules" lavel-width="100px">
			<el-form-item label="用户账号" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="用户密码" prop="pwd">
				<el-input v-model="form.pwd" show-password></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="pwd2">
				<el-input v-model="form.pwd2" show-password></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">快速注册</el-button>
				<el-button type="danger">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				rules: {
					name: [
						{ required: true, message: "必填项", trigger: "blur" },
						{ min: 5, max: 10, message: "长度为5-10个字符", trigger: "blur" },
						{ pattern: /^\w{5-10}$/, message: "含有非法字符", trigger: "blur" },
					],
					pwd: [
						{ required: true, message: "必填项", trigger: "blur" },
						{ min: 6, max: 6, message: "only 6 digit", trigger: "blur" },
					],

					pwd2: [
						{ required: true, message: "必填项", trigger: "blur" },
						{ min: 6, max: 6, message: "only 6 digit", trigger: "blur" },
						{
							validator: (rule, value, callback) => {
								console.log(this.form.pwd);
								if (this.form.pwd == this.form.pwd2) {
									callback();
								} else {
									callback(new Error("两次输入不一致"));
								}
							},
							message: "两次输入不一致",
							trigger: "blur",
						},
					],
					phone: [
						{ required: true, message: "必填项", trigger: "blur" },
						{ pattern: /^1[3-9]\d{9}$/, message: "wrong input", trigger: "blur" },
					],
				},
			};
		},
	};
</script>

<style lang="scss" scoped>
	.form {
		background: wheat;
		padding: 10px;
		width: 30%;
		margin-left: 230px;
		border: 1px solid #eee;
		border-radius: 2%;
	}
</style>
