<template>
	<div>
		<el-container style="width: 1200px; margin: 0 auto">
			<el-header class="header">
				<img src="../assets/logo_el.svg" alt="" />
				<el-input placeholder="search for documentation" size="small" class="input"></el-input>
				<el-menu :default-active="active" class="el-menu-demo" mode="horizontal">
					<el-menu-item index="1" class="menu-top">Guide</el-menu-item>
					<el-menu-item index="2" class="menu-top">Components</el-menu-item>
					<el-menu-item index="3" class="menu-top">Theme</el-menu-item>
					<el-menu-item index="4" class="menu-top">Resources</el-menu-item>
					<el-menu-item index="5" class="menu-top">Github</el-menu-item>
				</el-menu>
				<div class="line"></div>
			</el-header>
			<el-container class="second-container">
				<el-aside class="aside scroll">
					<el-menu :default-active="$route.path" class="el-menu-demo" router>
						<el-menu-item index="/components/container" class="menu">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span> Container</span>
							</template>
						</el-menu-item>
						<el-menu-item index="/components/table" class="menu">
							<template slot="title">
								<i class="el-icon-document"></i>
								<span> table</span>
							</template>
						</el-menu-item>
						<el-menu-item index="/components/form" class="menu">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span> form</span>
							</template>
						</el-menu-item>

						<el-menu-item index="/components" class="menu">
							<template slot="title">
								<i class="el-icon-setting"></i>
								<span> Home</span>
							</template>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				menu: [
					{
						index: "/components/container",
						icon: "el-icon-location",
						text: "Container 容器组件",
					},
					{
						index: "/components/table",
						icon: "el-icon-location",
						text: "Table 表格组件",
					},
					{
						index: "/components/form",
						icon: "el-icon-location",
						text: "Form 表单组件",
					},
					{
						index: "/components/button",
						icon: "el-icon-location",
						text: "Button按钮组件",
					},
				],
			};
		},
	};
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
	}
	.input {
		width: 200px;
		margin: 0 80px 0 100px;
	}
	.aside {
		width: 220px !important;
		//	border-right: 1px solid #eee;
		overflow-y: scroll;
		position: fixed;
		height: calc(100vh - 60px);
	}
	.menu {
		font-size: 16px !important;
		text-align: left;
	}
	.menu-top {
		font-size: 18px;
		font-weight: bold;
	}
	.second-container {
		height: 90vh;
	}
	.el-menu {
		border-right: none;
	}
	// 设置滚动条样式
	.scroll::-webkit-scrollbar {
		width: 8px;
	}

	.scroll::-webkit-scrollbar-track {
		width: 8px;
		background: transparent;
	}

	.scroll::-webkit-scrollbar-thumb {
		width: 8px;
		background: #ddd;
		border-radius: 2px;
	}
</style>
