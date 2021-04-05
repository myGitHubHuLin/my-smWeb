<template>
	<view class="center-main">
		<view class="center-header">
			<u-tabs :list="[{name: '全部房源'},{name: '我的收藏'}]" :is-scroll="false" :current="count" @change="change"
				:show-bar="false" :active-item-style="{backgroundColor:'#fff',color: 'red'}" bg-color="#e5e5e5">
			</u-tabs>
		</view>
		<view class="center-header-title">
			<view class="title-left">
				<view :class="{'title-select-line' : current === 0}" @click="chooseTitle(0)">一号楼</view>
				<view :class="{'title-select-line' : current === 1}" @click="chooseTitle(1)">车位</view>
			</view>
			<view class="title-right" :class="{'choose-color' : isChoose}" @click="rightChoose(isChoose)">只看未选</view>
		</view>
		<view class="center-title-three">
			<view v-for="(item, index) in unit" :key="index" :class="{'error': chooseUnit === index}"
				@click="threeChoose(item, index)">
				{{item.name}}
			</view>
		</view>
		<view class="scroll-contianr">
			
			<scroll-view 
				:scroll-top="scrollTop" 
				scroll-y="true" 
				class="scroll-Y" 
				v-for="(value,key,index) in roomData"
				:key="index"
			>
				<view class="scroll-view-item uni-bg-red" >
					<view class="scroll-view-item-title">{{key}}</view>
					<view class="scroll-view-bottom">
						<view v-for="(childrenVal, childrenKey) in value" 
							class="scroll-view-item-one"
							:key="childrenKey"
							@click="chooseItem(childrenVal)">
						<view class="scroll-view-item-block">
								<view v-if="childrenVal.isSale" class="item-sale">已售</view>
								<view class="grid-text grid-one" :style="{color: childrenVal.isSale ? '#e5e5e5' : '#000'}">{{childrenVal.name}}</view>
								<view class="grid-text grid-two" :style="{color: childrenVal.isSale ? '#e5e5e5' : '#000'}">{{childrenVal.price}}元/㎡</view>
								<view class="grid-text grid-two" :style="{color: childrenVal.isSale ? '#e5e5e5' : '#000'}">{{childrenVal.area}}㎡</view>
							</view>
					</view>
					</view>
					
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '选房',
				count: 0, // 头部选择的下表
				list: [{
					name: '一号楼'
				}, {
					name: '车位'
				}],
				current: 0, // 切换房号、车位
				isChoose: false, // 是否查看未选
				unit: [{
						name: '一单元'
					},
					{
						name: '二单元'
					},
				],
				chooseUnit: 0, // 当前选中的index
				roomData: { // 房间具体的信息
					// "1层": [{
					// 		name: '101',
					// 		isSale: false, // 是否已售
					// 		price: 9000, // 单价
					// 		area: 66, // 面积大小
					// 	},
					// 	{
					// 		name: '102',
					// 		isSale: false, // 是否已售
					// 		price: 9000, // 单价
					// 		area: 66, // 面积大小
					// 	},
					// 	{
					// 		name: '103',
					// 		isSale: false, // 是否已售
					// 		price: 9000, // 单价
					// 		area: 66, // 面积大小
					// 	},
					// ],
				},
				scrollTop:0,
			}
		},
		mounted() {
			let myData = {};
			for(let j=0;j<5;j++){
				myData[`${j+1}层`] = [];
				for(let i=0;i<15;i++){
				myData[`${j+1}层`].push(
				{name: `${j + 1}0${i+1}`,
							isSale: i%2 ==0, // 是否已售
							price: 9000, // 单价
							area: 66, // 面积大小
							})
			}
			}
			this.roomData= myData;
		},
		methods: {
			chooseTitle(i) { // 房号、车位切换
				this.current = i;
				this.chooseUnit = 0; // 重置单元下标
				this.unit = [{
						name: 'B1'
					},
					{
						name: 'B2'
					},
				];
			},
			change(index) { // 顶部切换
				this.count = index;
			},
			rightChoose(val) { // 是否查看未选择
				this.isChoose = !val;
			},
			threeChoose(item, i) { // 单元切换
				this.chooseUnit = i;
			},
			chooseItem(val){ // 点击块--选择
				console.log(val)
			},
		}
	}
</script>

<style lang="scss">
	$color-red: red;

	.center-main {

		// height: 100%;
		// width:100%;
		.center-header {
			height: 80rpx;
			width: 100wh;
			border-bottom: 1rpx solid #d5d5d5;
		}

		.center-header-title {
			height: 80rpx;
			width: 100wh;
			border-bottom: 1rpx solid #d5d5d5;
			display: flex;
			// align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;

			.title-left {
				width: calc(100% - 120rpx);
				display: flex;

				>view {
					height: 100%;
					font-size: 40rpx;
					margin-right: 30rpx;
					display: flex;
					align-items: center;
				}

				.title-select-line {
					border-bottom: 2px solid $color-red;
					color: $color-red;
				}
			}

			.title-right {
				width: 120rpx;
				display: flex;
				align-items: center;
			}

			.choose-color {
				color: $color-red;
			}
		}

		.center-title-three {
			// 单元切换
			display: flex;
			margin: 30rpx 0;
			padding: 0 30rpx;

			>view {
				margin-right: 30rpx;
				color: #000;
				background-color: #fff;
				padding: 20rpx 30rpx;
				border-radius: 8rpx;
				border: 1rpx solid #e5e5e5;
			}

			.error {
				color: #fff;
				background-color: $color-red;
				border: 1rpx solid $color-red;
			}

		}
		.scroll-contianr{ // 滚动区域的样式
			width: 100%;
			height: calc(100% - 100rpx);
			padding: 0 30rpx;
			margin-bottom: 250rpx;
			.scroll-Y{
				.scroll-view-item{
					.scroll-view-item-title{
						font-size: 30rpx;
						margin-top: 30rpx;
					}
					.scroll-view-bottom{
						display: flex;
						flex-wrap: wrap;
						.scroll-view-item-one{
							margin-right: 30rpx;
							margin-top: 10rpx;
						.scroll-view-item-block{
						width: 200rpx;
						height: 180rpx;
						background-color: #fff;
						border-radius: 10rpx;
						border: 1rpx solid #e5e5e5;
						position: relative;
						overflow: hidden;
						.grid-text{
							display: flex;
							justify-content: center;
						}
						.grid-one{
							font-size: 45rpx;
							color: #000;
							margin-top: 8rpx;
						}
						.grid-two{
							font-size: 30rpx;
							margin-top: 8rpx;
						}
						.item-sale{
							position: absolute;
							left: -45rpx;
							top: -45rpx;
							width: 100rpx;
							height: 100rpx;
							transform: rotate(-45deg);
							background-color: red;
							display: flex;
							align-items: flex-end;
							justify-content: center;
							color: #fff;
						}
					}
					}
					}
					
					
				}
			}
		}
	}
</style>
