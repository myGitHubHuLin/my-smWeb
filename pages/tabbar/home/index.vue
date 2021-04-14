<template>
	<view class="content">
		<view class="home-one">
			<u-image width="100%" height="100%" :src="src"></u-image>
			<view class="home-one-content">
				<u-icon name="clock" size="30"></u-icon>
				<view class="home-one-content-name">正式结束倒计时</view>
				<!-- <view class="home-one-content-block">56</view>
				<view class="home-one-content-size">天</view>
				<view class="home-one-content-block">08</view>
				<view class="home-one-content-size">时</view>
				<view class="home-one-content-block">47</view>
				<view class="home-one-content-size">分</view>
				<view class="home-one-content-block">57</view>
				<view class="home-one-content-size">秒</view> -->
				<u-count-down 
				:timestamp="timestamp" 
				separator="zh"
				separator-color="red"
				font-size="45"
				bg-color="red"
				color="#000"
				height="80"></u-count-down>
			</view>
		</view>
		<view class="home-content">
			<view class="home-two">
				<view class="home-two-left">{{data.Name}}</view>
				<view class="home-two-right">
					<view class="right-sj" />
					房源总数：
					<view>{{data.HousingTotal}}</view>
					套
				</view>
			</view>
			<view class="home-three">
				<view>本次开盘不设模拟环节</view>
				<view>
					<view>正式选房</view>
					<view>开始时间:{{data.ChooseHouseStartTime}}</view>
					<view>结束时间:{{data.ChooseHouseEndTime}}</view>
				</view>
			</view>
			<view class="home-foure">
				<view class="home-foure-title">户型展示</view>
				<view class="home-foure-body">
					<scroll-view scroll-x="true" class="scroll-view_H"  scroll-left="120">
					<view class="home-foure-content">
						<view class="home-foure-row" v-for="(item, index) in data.HouseTypes" :key="index">
							<u-image width="100%" height="300rpx" :src="item.HouseTypePics"></u-image>
							<view>{{item.HouseType}}</view>
							<view>{{item.HouseTypeDesc}}</view>
						</view>
						<u-empty text="暂无数据" mode="data" v-if="!data.HouseTypes || data.HouseTypes.length < 1"></u-empty>
					</view>
				</scroll-view>
				</view>
				
			</view>
			<view class="home-five">
				<view class="home-five-title">项目介绍</view>
				<view class="home-five-img">
					<u-parse :html="data.HousingIntroduce"></u-parse>
					<u-empty text="暂无数据" mode="data" v-if="!data.HousingIntroduce"></u-empty>
				</view>
			</view>
		</view>
<footer></footer>
	</view>
</template>

<script>
	import footer from './../index/index.vue';
	import moment from 'moment'
	export default {
		components:{
			footer
		},
		data() {
			return {
				src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				data: {}, // 房源信息
				timestamp: 0, // 倒计时的时间戳
			}
		},
		onShow() {
			console.log(this.$u.func)
			this.getBackdropPic();
			this.getOneHousingInfo();
		},
		methods: {
			getBackdropPic() {
				this.$u.api.getBackdropPic({}).then(res => {
					this.src = res.Data;
				})
			},
			getOneHousingInfo() {
				this.$u.api.getOneHousingInfo({}).then(res => {
					this.data = res.Data[0];
					if(res.Data[0].ChooseHouseEndTime) { // 倒计时
						let time = +moment(res.Data[0].ChooseHouseEndTime).format('X');
						let nowTime = +moment().format('X');
						let lastTime = (time - nowTime) > 0 ? (time - nowTime) : 0;
						this.timestamp = lastTime;
						console.log(lastTime)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	@import  "@/style/style.scss";
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
				color: $color-ff;
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
					background-color: $color-red;
					border-radius: 8rpx;
					color: #000;
					@include flex();
					font-weight: bold;
				}

				.home-one-content-size {
					font-size: 24rpx;
					color: $color-red;
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
			border-bottom: 4rpx solid $color-red;
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
				background-color: $color-red;
				font-size: 30rpx;
				color: $color-ff;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				position: relative;
				padding-right: 20rpx;

				.right-sj {
					position: absolute;
					top: 9rpx;
					left: -53rpx;
					width: 110rpx;
					height: 60rpx;
					transform: rotate(-65deg);
					background-color: $color-ff;
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
				height: 150rpx;
				background-color: $color-e5;
				color: $color-b5;
				font-size: 22rpx;
				padding-left: 10rpx;
			}

			>view:nth-child(1) {
				padding-top: 50rpx;
			}

			>view:last-child {
				>view:nth-child(1) {
					font-size: 30rpx;
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
					border: 1rpx solid $color-e5;
					border-radius: 8rpx;
					font-size: 34rpx;
					color: $color-b5;
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
