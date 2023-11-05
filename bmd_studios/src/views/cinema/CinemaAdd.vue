<template>
	<div>
		<el-form label-width="120px" style="width: 650px">
			<el-form-item label="电影院名称">
				<el-input clearable></el-input>
			</el-form-item>
			<el-form-item label="选择位置"><el-input clearable></el-input></el-form-item>
			<el-form-item label="详细地址"><div id="main" style="height: 200px; border: 1px solid #666"></div></el-form-item>
			<el-form-item label="省份"><el-input clearable></el-input></el-form-item>
			<el-form-item label="城市"><el-input clearable></el-input></el-form-item>
			<el-form-item label="地区"><el-input clearable></el-input></el-form-item>
			<el-form-item label="经度"><el-input clearable></el-input></el-form-item>
			<el-form-item label="纬度"><el-input clearable></el-input></el-form-item>
			<el-form-item label="选择标签">
				<el-select>
					<el-option label="3DMax" value="3DMax"></el-option>
					<el-option label="2DMax" value="2DMax"></el-option> </el-select
			></el-form-item>
			<el-form-item>
				<el-button type="primary">新增电影院</el-button>
				<el-button>重置表格</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped></style>
