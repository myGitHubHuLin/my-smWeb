<template>
	<view class="my-housing">
		<view class="my-housing-body">
			<scroll-view :scroll-y="true">
				<view class="my-housing-card-main" v-for="(item, i) in list" :key="i">
					<view class="my-housing-card">
						<view class="my-housing-card-header">
							<u-icon name="photo"></u-icon>
							<view class="header-name">{{item.name}}</view>
						</view>
						<view class="header-content">
							<view class="header-row">选房时间：{{item.time}}</view>
							<view class="header-row">认购人：{{item.userName}}</view>
							<view class="header-row">电话号：{{item.phone}}</view>
							<view class="header-row">房源单价：{{item.price}}</view>
							<view class="header-row">房源面积：{{item.area}}</view>
						</view>
						<view class="bottom-tatol">总价：{{item.totalPrice}}元</view>
						<view class="cli-left"></view>
						<view class="cli-right"></view>
					</view>
					<!-- <view class="bottom">
						<u-button class="bottom-button">取消订单</u-button>
					</view> -->
				</view>

			</scroll-view>
		</view>
		<view class="my-housing-footer">有问题请致电售楼处或联系您的专属置业顾问</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '一号楼-一单元-103',
						time: '2010-04-06 18:36:37',
						userName: '胡林',
						phone: '13272613028',
						price: '7022',
						area: 169.05,
						totalPrice: 111154.54,
					},
					{
						name: '一号楼-一单元-103',
						time: '2010-04-06 18:36:37',
						userName: '胡林',
						phone: '13272613028',
						price: '7022',
						area: 169.05,
						totalPrice: 111154.54,
					},
					{
						name: '一号楼-一单元-103',
						time: '2010-04-06 18:36:37',
						userName: '胡林',
						phone: '13272613028',
						price: '7022',
						area: 169.05,
						totalPrice: 111154.54,
					},
					{
						name: '一号楼-一单元-103',
						time: '2010-04-06 18:36:37',
						userName: '胡林',
						phone: '13272613028',
						price: '7022',
						area: 169.05,
						totalPrice: 111154.54,
					},
				],
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	$color-red: red;

	.my-housing {
		width: 100wh;
		height: 100vh;

		.my-housing-body {
			height: calc(100% - 100rpx);
			width: 100%;
			
			.my-housing-card-main {
				margin-bottom: 30rpx;
				&:last-child{
					margin-bottom: 180rpx;
				}
				.bottom{
					height: 80rpx;
					display: flex;
					justify-content: center;
					margin: 30rpx  0 50rpx 0;
					.bottom-button{
						height: 100%;
						width: 300rpx;
					}
				}
			}

			.my-housing-card {
				height: 700rpx;
				width: calc(100% - 60rpx);
				margin: 0 30rpx;
				padding: 0 30rpx;
				border: 4rpx solid #e5e5e5;
				border-radius: 10rpx;
				box-shadow: 0px 0px 2px #888888;
				position: relative;
				.cli-left{
					position: absolute;
					left: -25rpx;
					bottom: 110rpx;
					width: 50rpx;
					height: 50rpx;
					background-color: #fff;
					border-radius: 0 50% 50% 0 ;
					border-right: 1rpx solid #888888;
				}
				.cli-right{
					position: absolute;
					right: -25rpx;
					bottom: 110rpx;
					width: 50rpx;
					height: 50rpx;
					background-color: #fff;
					border-radius: 50% 0 0 50%;
					border-left: 1rpx solid #888888;
				}
				.my-housing-card-header {
					height: 200rpx;
					width: 100%;
					border-bottom: 4rpx dashed red;
					display: flex;
					align-items: center;

					.header-name {
						font-size: 40rpx;
						margin-left: 30rpx;
					}
				}

				.header-content {
					margin-bottom: 70rpx;
					padding-top: 30rpx;

					.header-row {
						height: 65rpx;
						font-size: 30rpx;
						color: #d5d5d5;
					}
				}

				.bottom-tatol {
					font-size: 30rpx;
					color: $color-red;
				}
			}
		}

		.my-housing-footer {
			position: fixed;
			bottom: 0;
			background-color: #fff;
			height: 100rpx;
			width: 100%;
			font-size: 35rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #b5b5b5;
		}
	}
</style>
