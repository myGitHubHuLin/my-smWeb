<template>
	<view class="user-content">
		<view class="user-header">
			<u-avatar :src="src"></u-avatar>
		</view>
		<view class="user-info">
			<view class="user-info-white">
				<view @click="login">{{userInfo.Name || '请登录'}}</view>
				<view>{{userInfo.Phone}}</view>
			</view>
		</view>
		<view class="user-bottom">
			<view class="user-bottom-row" v-for="(item, index) in list" :key="index" @click="tab(index)">
				<view class="user-bottom-row-left">
					<u-icon name="heart" size="40" v-show="index === 0"></u-icon>
					<u-icon name="heart" size="40" v-show="index === 1"></u-icon>
					<u-icon name="volume" size="40" v-show="index === 2"></u-icon>
					<u-icon name="phone" size="40" v-show="index === 3"></u-icon>
					<view>{{item.name}}</view>
				</view>
				<u-icon name="arrow-right" size="40"></u-icon>
			</view>
		</view>
		<u-toast ref="uToast" />
		<footer></footer>
	</view>
</template>

<script>
	import footer from './../index/index.vue';
	import {mapState} from 'vuex'
	export default {
		components:{
			footer
		},
		computed:{
			...mapState(['userInfo']) //  // 头部选择的下表:全部房源、我的收藏
		},
		data() {
			return {
				src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				list:[
					{name: '我的收藏'},
					{name: '我的房源'},
					{name: '选房须知'},
					{name: '致电售楼处'},
				],
				phone: '', // 致电售楼处
			}
		},
		onShow() {
			this.getContactPhone(); // 获取电话
		},
		methods: {
			getContactPhone() {
				this.$u.api.getContactPhone({}).then(res => {
					this.phone = res.Data;
				})
			},
			login() { // 未登录--跳转登录
				this.$u.func.wxLogin();
			},
			async tab(i){
				if(i === 0){ // 我的收藏
					if(this.$u.func.getGlobalUserInfoShow()) { // 没有值
						return this.$u.func.wxLogin();
					} else {
						this.$u.vuex('centerTab', 1); // 设置跳转到我的收藏--下表
						uni.switchTab({
							url: '/pages/tabbar/center/index'
						});
					}
				}else if(i === 1){ // 我的房源
					if(this.$u.func.getGlobalUserInfoShow()) { // 没有值
						return this.$u.func.wxLogin();
					} else {
						uni.navigateTo({
							url: '/pages/tabbar/user/my-housing'
						});
					}
				}else if(i === 2){ // 选房须知
					uni.navigateTo({
					    url: '/pages/tabbar/user/agreement'
					});
				}else if(i === 3){ // 拨打电话
					if(!this.phone) {
						return this.$refs.uToast.show({
							title: '暂无电话',
						})
					} else {
						uni.makePhoneCall({
							phoneNumber: this.phone //仅为示例
						});
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	@import  "@/style/style.scss";
	.user-content {
		width: 100wh;
		height: 100vh;
		.user-header{
			height: 300rpx;
			width: 100%;
			background-color: $color-red;
			display: flex;
			justify-content: center;
			padding-top: 70rpx;
		}
		.user-info{
			height: 200rpx;
			width: 100%;
			position: relative;
			.user-info-white{
				width: 100%;
				height: 200rpx;
				position: absolute;
				border-radius: 70% 70% 0 0;
				top: -100rpx;
				left: 0;
				background-color: $color-ff;
				display: flex;
				align-items: center;
				flex-direction: column;
				padding-top: 20rpx;
				font-size: 32rpx;
				color: #000;
				>view:first-child{
					margin-bottom: 10rpx;
				}
			}
		}
		.user-bottom{
			padding: 0 30rpx;
			.user-bottom-row{
				height: 100rpx;
				@include flex(center,space-between);
				border-bottom: 1rpx solid $color-e5;
				font-size: 30rpx;
				.user-bottom-row-left{
					display: flex;
					>view{
						margin-left: 30rpx;
					}
				}
			}
		}
	}
</style>
