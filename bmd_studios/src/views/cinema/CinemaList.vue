<template>
	<div>
		<!-- 地图模块 -->
		<div id="container"></div>
		<el-divider content-position="left">电影列表模块</el-divider>

		<!-- table -->
		<el-table :data="cinema">
			<el-table-column label="电影院名称" sortable width="200" prop="cinema_name" align="center"> </el-table-column>
			<el-table-column label="影院地址" prop="address" align="center"> </el-table-column>
			<el-table-column label="电影院位置" sortable width="200" align="center">
				<template slot-scope="scope">
					{{ scope.row.city }}
					{{ scope.row.district }}
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="200">
				<template slot-scope="scope">
					<el-button size="small" type="success" icon="el-icon-map-location" circle @click="moveTo(scope.row)"></el-button>
					<el-button
						@click="$router.push('/home/cinema-list-room/' + scope.row.id)"
						size="small"
						type="info"
						icon="el-icon-video-camera-solid"
						circle></el-button>
					<el-button size="small" type="warning" icon="el-icon-edit" circle></el-button>
					<el-button size="small" type="danger" icon="el-icon-delete" circle @click="deleteCinema(scope.$index, scope.row)"></el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import AMapLoader from "@amap/amap-jsapi-loader";
	import httpApi from "../../http";
	export default {
		data() {
			return {
				cinema: [],
				map: null,
				AMap: null,
			};
		},
		name: "map-view",
		mounted() {
			this.initAMap();
			//	this.initData(); 要让地图加载完毕后再加载data 才能保证地图上显示出 data中 电影院位置
		},
		unmounted() {
			this.map?.destroy();
		},
		methods: {
			//getAddress
			moveTo(cinema) {
				console.log(cinema);
				let lng = cinema.longitude;
				let lat = cinema.latitude;
				// 将地图的中心位置移动到该经纬度的位置
				this.map.setZoomAndCenter(14, [lng, lat], false, 700);
			},
			//delete
			deleteCinema(index, row) {
				this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						httpApi.cinemaApi.delete({ id: row.id }).then(res => {
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
			initAMap() {
				AMapLoader.load({
					key: "0506ae0d5b52767350f5812bdb67e915", // 申请好的Web端开发者Key，首次调用 load 时必填
					version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
					plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
				})
					.then(AMap => {
						this.AMap = AMap;
						this.map = new AMap.Map("container", {
							// 设置地图容器id
							viewMode: "3D", // 是否为3D地图模式
							zoom: 11, // 初始化地图级别
							center: [116.397428, 39.90923], // 初始化地图中心点位置
						});
						this.initData();
					})
					.catch(e => {
						console.log(e);
					});
			},
			//加载数据
			initData() {
				httpApi.cinemaApi.queryAll().then(res => {
					console.log(res.data.data);
					this.cinema = res.data.data;
					// 此处可以为每一家电影院都添加一个点标记到地图上
					this.cinema.forEach(item => {
						let lng = item.longitude;
						let lat = item.latitude;
						let marker = new this.AMap.Marker({
							position: new this.AMap.LngLat(lng, lat),
							title: item.cinema_name,
						});
						this.map.add(marker);
					});
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
		height: 260px;
		border: 1px solid #666;
	}
</style>
