<template>
	<div>
		<el-form label-width="120px" style="width: 650px">
			<el-form-item label="电影院名称">
				<el-input clearable></el-input>
			</el-form-item>
			<el-form-item label="选择位置"><el-input clearable></el-input></el-form-item>
			<el-form-item label="详细地址"><div id="container" style="height: 200px; border: 1px solid #666"></div></el-form-item>
			<el-form-item label="省份"><el-input clearable></el-input></el-form-item>
			<el-form-item label="城市"><el-input clearable></el-input></el-form-item>
			<el-form-item label="地区"><el-input clearable></el-input></el-form-item>
			<el-form-item label="经度"><el-input clearable></el-input></el-form-item>
			<el-form-item label="纬度"><el-input clearable></el-input></el-form-item>
			<el-form-item label="选择标签">
				<el-select>
					<el-option label="3DMax" value="3DMax"></el-option>
					<el-option label="2DMax" value="2DMax"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item>
				<el-button type="primary">新增电影院</el-button>
				<el-button>重置表格</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import AMapLoader from "@amap/amap-jsapi-loader";
	export default {
		mounted() {
			this.initMap(); // 初始化地图
		},
		methods: {
			initMap() {
				AMapLoader.load({
					key: "0506ae0d5b52767350f5812bdb67e915", // 申请好的Web端开发者Key，首次调用 load 时必填
					version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
					plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
				})
					.then(AMap => {
						this.map = new AMap.Map("container", {
							// 设置地图容器id
							viewMode: "3D", // 是否为3D地图模式
							zoom: 11, // 初始化地图级别
							center: [116.397428, 39.90923], // 初始化地图中心点位置
						});
					})
					.catch(e => {
						console.log(e);
					});
			},
		},
	};
</script>

<style lang="scss" scoped>
	#container {
		padding: 0px;
		margin: 0px;
		width: 100%;
		height: 800px;
	}
</style>
