<template>
	<div>
		<el-form :model="form" label-width="120px" style="width: 650px">
			<el-form-item label="电影院名称">
				<el-input v-model="form.cinema_name" type="text"></el-input>
			</el-form-item>

			<el-form-item label="选择位置">
				<div id="container" style="height: 200px; border: 1px solid #666"></div>
			</el-form-item>

			<el-form-item label="详细地址">
				<el-input clearable v-model="form.address" type="text"></el-input>
			</el-form-item>

			<el-form-item label="省份"> <el-input clearable v-model="form.province" type="text"> </el-input></el-form-item>

			<el-form-item label="城市">
				<el-input clearable v-model="form.city" type="text"></el-input>
			</el-form-item>

			<el-form-item label="地区">
				<el-input clearable v-model="form.district" type="text"></el-input>
			</el-form-item>

			<el-form-item label="经度">
				<el-input clearable v-model="form.longitude" type="text"></el-input>
			</el-form-item>
			<el-form-item label="纬度">
				<el-input clearable v-model="form.latitude" type="text"></el-input>
			</el-form-item>
			<el-form-item label="选择标签">
				<el-select v-model="form.tags" style="width: 100%">
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
	import httpApi from "../../http";
	export default {
		data() {
			return {
				form: {
					cinema_name: "",
					address: "",
					province: "",
					city: "",
					district: "",
					longitude: "",
					latitude: "",
					tags: [],
				},
			};
		},
		mounted() {
			this.initMap(); // 初始化地图
			// 初始化电影标签选择器 select 的option列表
			httpApi.cinemaApi.queryTypes.then(res => {
				console.log(res);
			});
		},
		methods: {
			initMap() {
				AMapLoader.load({
					key: "0506ae0d5b52767350f5812bdb67e915", // 申请好的Web端开发者Key，首次调用 load 时必填
					version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
					plugins: ["AMap.Geocoder"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
				})
					.then(AMap => {
						this.map = new AMap.Map("container", {
							// 设置地图容器id
							viewMode: "3D", // 是否为3D地图模式
							zoom: 11, // 初始化地图级别
							center: [116.397428, 39.90923], // 初始化地图中心点位置
						});
						this.map.on("click", e => {
							//此处为什么用箭头函数才能加载出页面？解释：由于array function的this 实际是继承的它定义时所处的全局执行环境中的this，所以指向Vue对象，如果用function declaration，则指向调用次函数对象的上下文，为this.map对象，则无法获取到vue对象，导致后面对this.form对象中的key 无法赋值！！！ important！！！
							let lng = e.lnglat.getLng();
							let lat = e.lnglat.getLat();
							this.form.longitude = lng;
							this.form.latitude = lat;
							console.log(lng, lat);

							//调用接口输入当前坐标 获取结果
							let geocoder = new AMap.Geocoder();
							geocoder.getAddress([lng, lat], (status, result) => {
								if (status === "complete" && result.info === "OK") {
									console.log(status, result);
									// 回填数据表单

									let info = result.regeocode.addressComponent;
									this.form.address = result.regeocode.formattedAddress;
									this.form.city = info.city;
									this.form.province = info.province;
									this.form.district = info.district;
								}
							});
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
