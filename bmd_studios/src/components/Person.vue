<template>
	<div class="person">
		<!-- src/components/Person.vue -->
		<img :src="avatar" />
		<p>{{ name }}</p>
		<i class="el-icon-error" @click="deletePerson"></i>
	</div>
</template>

<script>
	export default {
		// props声明自定义属性，接收父组件传过来的参数: name  avatar
		// 一旦声明了这两个属性，
		// template中可以使用{{name}} {{avatar}}直接引用父组件传过来的参数
		props: ["name", "avatar"],
		methods: {
			/* 监听到了用户点击了叉子 */
			deletePerson() {
				/* 此处需要通知父组件，用户点击了，在当前子组件无法处理，交给父组件处理 */
				this.$emit("del"); // 主动触发一个自定义事件：del
			},
		},
	};
</script>

<style lang="scss" scoped>
	.person {
		width: 80px;
		text-align: center;
		display: inline-block;
		margin-right: 10px;
		position: relative;
		&:hover i {
			display: block;
		}
		i {
			display: none;
			position: absolute;
			top: -10px;
			right: -8px;
		}
		img {
			width: 80px;
		}
		p {
			font-size: 0.9em;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			margin-bottom: 10px;
		}
	}
</style>
