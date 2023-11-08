<template>
	<div>
		为 <span style="color: #3f9dff; font-weight: bold">{{ roomData.cinema_name }}</span> 的
		<span style="color: #3f9dff; font-weight: bold">{{ roomData.cinema_room_name }} （{{ roomData.cinema_room_type }}） </span>
		的排片计划列表

		<el-divider></el-divider>
	</div>
</template>

<script>
	import httpApi from "../../http";
	export default {
		data() {
			return {
				roomData: {},
			};
		},
		methods: {
			initRoomData() {
				let id = this.$route.params.roomId;
				httpApi.cinemaRoomApi.queryById({ id }).then(res => {
					console.log(res.data.data);
					this.roomData = res.data.data;
				});
			},
		},
		mounted() {
			this.initRoomData();
		},
	};
</script>

<style lang="scss" scoped></style>
