<template>
	<view class="content">
		<view class="u-page page-main">
			<!-- 所有内容的容器 -->
			<home v-if="current === 0"></home>
			<center v-if="current === 1"></center>
			<user v-if="current === 2"></user>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list" :mid-button="true" active-color="red"></u-tabbar>
	</view>
</template>

<script>
	import user from "./../user/user.vue"; // 我的
	import center from "./../center/index.vue"; // 选房
	import home from "./../home/index.vue"; // 首页
	export default {
		components:{
			user,
			center,
			home,
		},
		data() {
			return {
				current: 0,
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						customIcon: false,
					},
					{
						iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
						selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
						text: '选房',
						midButton: true,
						customIcon: false,
					},

					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						isDot: false,
						customIcon: false,
					},
				],
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		width: 100wh;
		height: 100vh;
		.page-main{
			width: 100%;
			height: 100%;
		}
	}
</style>
