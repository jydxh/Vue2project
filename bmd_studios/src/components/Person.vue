<template>
	<div class="person">
		<!-- src/components/Person.vue -->
		<img :src="avatar" />
		<p>{{ name }}</p>
	</div>
</template>

<script>
	export default {
		// props声明自定义属性，接收父组件传过来的参数: name  avatar
		// 一旦声明了这两个属性，
		// template中可以使用{{name}} {{avatar}}直接引用父组件传过来的参数
		props: ["name", "avatar"],
	};
</script>

<style lang="scss" scoped>
	.person {
		width: 80px;
		text-align: center;
		display: inline-block;
		margin-right: 10px;
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
