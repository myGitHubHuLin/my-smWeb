<template>
	<view class="agreement-main">
		<view class="agreement-header">*****-在线选房须知</view>
		<view class="agreement-body">
			<u-parse :html="content"></u-parse>
		</view>
		<view class="agreement-footer">
			<u-button type="error" class="agreement-footer-button" @click="back">返回</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'', // 富文本内容
			}
		},
		methods: {
			back(){ // 返回
				uni.navigateBack({
					url: '/pages/tabbar/user/index',
				})
			},
		}
	}
</script>

<style lang="scss">
	.agreement-main{
		width: 100wh;
		height: 100vh;
		.agreement-header{
			height: 150rpx;
			width: 100%;
			background-color: red;
			font-size: 40rpx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.agreement-body{
			height: calc(100% - 450rpx);
			width: calc(100% - 60rpx);
			margin: 0 30rpx;
			background-color: red;
		}
		.agreement-footer{
			height: 300rpx;
			width: calc(100% - 60rpx);
			margin: 0 30rpx;
			display: flex;
			align-items: flex-end;
			.agreement-footer-button{
				width: 100%;
				height: 100rpx;
			}
		}
	}
</style>
