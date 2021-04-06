<template>
	<view class="content">
		<view class="home-one">
			<u-image width="100%" height="100%" :src="src"></u-image>
			<view class="home-one-content">
				<u-icon name="clock" size="30"></u-icon>
				<view class="home-one-content-name">正式结束倒计时</view>
				<view class="home-one-content-block">56</view>
				<view class="home-one-content-size">天</view>
				<view class="home-one-content-block">08</view>
				<view class="home-one-content-size">时</view>
				<view class="home-one-content-block">47</view>
				<view class="home-one-content-size">分</view>
				<view class="home-one-content-block">57</view>
				<view class="home-one-content-size">秒</view>
			</view>
		</view>
		<view class="home-content">
			<view class="home-two">
				<view class="home-two-left">上湖明珠</view>
				<view class="home-two-right">
					<view class="right-sj" />
					房源总数：
					<view>926</view>
					套
				</view>
			</view>
			<view class="home-three">
				<view>本次开盘不设模拟环节</view>
				<view>
					<view>正式选房</view>
					<view>开始时间:2021-05-31 00:00</view>
					<view>结束时间:2021-05-31 00:00</view>
				</view>
			</view>
			<view class="home-foure">
				<view class="home-foure-title">户型展示</view>
				<view class="home-foure-body">
					<scroll-view scroll-x="true" class="scroll-view_H"  scroll-left="120">
					<view class="home-foure-content">
						<view class="home-foure-row">
							<u-image width="100%" height="300rpx" :src="src"></u-image>
							<view>1栋1/8户型</view>
							<view>3+1室两厅两卫</view>
						</view>
					</view>
				</scroll-view>
				</view>
				
			</view>
			<view class="home-five">
				<view class="home-five-title">项目介绍</view>
				<view class="home-five-img">
					<u-image width="100%" height="100%" :src="src"></u-image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
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

		.home-one {
			width: 100%;
			height: 300rpx;
			position: relative;

			.home-one-content {
				height: 130rpx;
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
				background-color: rgba($color: #000000, $alpha: 0.6);
				font-size: 30rpx;
				color: #fff;
				display: flex;
				align-items: center;
				padding-left: 20rpx;

				.home-one-content-name {
					margin: 0 10rpx;
				}

				.home-one-content-block {
					width: 80rpx;
					height: 80rpx;
					font-size: 50rpx;
					background-color: red;
					border-radius: 8rpx;
					color: #000;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: bold;
				}

				.home-one-content-size {
					font-size: 24rpx;
					color: red;
					margin: 0 10rpx;
				}
			}
		}

		.home-content {
			padding: 0 30rpx;
			width: 100%;
			height: 100%;
		}

		.home-two {
			margin: 30rpx 0rpx;
			height: 100rpx;
			border-bottom: 4rpx solid red;
			display: flex;
			box-sizing: border-box;
			position: relative;

			.home-two-left {
				width: 50%;
				height: 100%;
				font-size: 50rpx;
			}

			.home-two-right {
				width: 50%;
				height: 100%;
				background-color: red;
				font-size: 30rpx;
				color: #fff;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				position: relative;
				padding-right: 20rpx;

				.right-sj {
					position: absolute;
					top: 8rpx;
					left: -53rpx;
					width: 110rpx;
					height: 60rpx;
					transform: rotate(-65deg);
					background-color: #fff;
				}

				>view {
					font-size: 45rpx;
				}
			}
		}

		.home-three {
			display: flex;
			justify-content: space-between;
			border-radius: 8rpx;

			>view {
				width: calc(50% - 10rpx);
				height: 200rpx;
				background-color: #e5e5e5;
				color: #b5b5b5;
				font-size: 26rpx;
				padding-left: 10rpx;
			}

			>view:nth-child(1) {
				padding-top: 50rpx;
			}

			>view:last-child {
				>view:nth-child(1) {
					font-size: 40rpx;
					color: #000;
					margin-top: 10rpx;
					margin-bottom: 20rpx;
				}
			}
		}

		.home-foure {
			margin-top: 60rpx;

			.home-foure-title {
				font-size: 45rpx;
				margin-bottom: 30rpx;
			}
			.home-foure-body{
				width: 100%;
				height: 100%;
			}
			.home-foure-content {
				display: flex;
				width: 100%;
				height: 100%;
				.home-foure-row {
					width: 350rpx;
					min-width: 350rpx;
					margin-right: 30rpx;
					height: 450rpx;
					border: 1rpx solid #e5e5e5;
					border-radius: 8rpx;
					font-size: 34rpx;
					color: #b5b5b5;
					overflow: hidden;

					>view {
						margin: 0 20rpx;
						margin-top: 15rpx;
					}

					>view:nth-child(2) {
						color: #000;
						margin-top: 30rpx;
					}
				}
			}

		}
		.home-five{
			margin-top: 60rpx;
			margin-bottom: 250rpx;
				.home-five-title{
					font-size: 45rpx;
					margin-bottom: 30rpx;
					}
					.home-five-img{
						height: 300rpx;
						width: 100%;
					}
		}
	}
</style>
