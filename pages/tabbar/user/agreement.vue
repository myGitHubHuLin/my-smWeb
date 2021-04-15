<template>
	<view class="agreement-main">
		<view class="agreement-header">在线选房须知</view>
		<view class="agreement-body">
			<u-parse :html="content"></u-parse>
			<u-empty text="未录入须知,请联系管理人员录入" mode="list" v-if="!content"></u-empty>
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
		onShow() {
			this.getPurchaseAgreement(); // 获取购房须知
		},
		methods: {
			back(){ // 返回
				uni.navigateBack({
					url: '/pages/tabbar/user/index',
				})
			},
			getPurchaseAgreement() {
				this.$u.api.getPurchaseAgreement({}).then(res => {
					this.content = res.Data;
				})
			},
		}
	}
</script>

<style lang="scss">
	@import  "@/style/style.scss";
	.agreement-main{
		width: 100wh;
		height: 100vh;
		.agreement-header{
			height: 150rpx;
			width: 100%;
			font-size: 40rpx;
			color: #000;
			@include flex();
		}
		.agreement-body{
			height: calc(100% - 450rpx);
			width: calc(100% - 60rpx);
			margin: 0 30rpx;
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
