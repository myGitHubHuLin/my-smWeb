<template>
	<view class="index-content">
		<!-- <view class="u-page page-main"> -->
			<!-- 所有内容的容器 -->
		<!-- 	<home v-if="current === 0"></home>
			<center v-if="current === 1"></center>
			<user v-if="current === 2"></user> -->
		<!-- </view> -->
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list" :mid-button="true" active-color="red" class="footer-tabbar" @before-switch="switchTab"></u-tabbar>
	</view>
</template>

<script>
	// import user from "./../user/index.vue"; // 我的
	// import center from "./../center/index.vue"; // 选房
	// import home from "./../home/index.vue"; // 首页
	// import {tabbar} from "../../../common/tab.js";
	export default {
		// components:{
		// 	user,
		// 	center,
		// 	home,
		// },
		data() {
			return {
				current: 0,
				// tabbar:tabbar,
				list: [{
						// iconPath: "home",
						// selectedIconPath: "home-fill",
						text: '首页',
						customIcon: false,
					},
					{
						// iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
						// selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
						text: '选房',
						midButton: true,
						customIcon: false,
					},

					{
						// iconPath: "account",
						// selectedIconPath: "account-fill",
						text: '我的',
						isDot: false,
						customIcon: false,
					},
				],
			}
		},
		methods: {
			switchTab(index){
				// const url = ['/pages/tabbar/index/index','/pages/tabbar/center/index','/pages/tabbar/user/index'][i];
				let pages = getCurrentPages();
				console.log(pages)
				let page = '/' + pages[pages.length - 1].route;
				let pageUrl = this.list[index].pagePath;
				if (page == pageUrl) {
					return false;
					}else{
						this.$u.vuex('centerTab', 0); // 设置跳转到我的收藏--下表
						uni.reLaunch({
							url:pageUrl
						})
					}
				// uni.switchTab({
				// 	url:url
				// })
			},
		}
	}
</script>

<style lang="scss">
	// .index-content {
	// 	width: 100wh;
	// 	height: 100vh;
	// 	.page-main{
	// 		width: 100%;
	// 		height: 100%;
	// 	}
		.footer-tabbar{
			box-shadow: inset 0 0 10px #CCC;
		}
	// }
</style>
