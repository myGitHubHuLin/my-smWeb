<template>
	<view class="center-main">
		<view class="center-header">
			<u-tabs :list="[{name: '全部房源'},{name: '我的收藏'}]" :is-scroll="false" :current="count" @change="change"
				:show-bar="false" :active-item-style="{backgroundColor:'$color-ff',color: 'red'}" bg-color="$color-e5">
			</u-tabs>
		</view>
		<view v-if="count === 0">
			<view class="center-header-title">
				<view class="title-left">
					<view :class="{'title-select-line' : current === 0}" @click="chooseTitle(0)">一号楼</view>
					<view :class="{'title-select-line' : current === 1}" @click="chooseTitle(1)">车位</view>
				</view>
				<view class="title-right" :class="{'choose-color' : isChoose}" @click="rightChoose(isChoose)">只看未选
				</view>
			</view>
			<view class="center-title-three">
				<view v-for="(item, index) in unit" :key="index" :class="{'error': chooseUnit === index}"
					@click="threeChoose(item, index)">
					{{item.name}}
				</view>
			</view>
			<view class="scroll-contianr">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
					v-for="(value,key,index) in roomData" :key="index">
					<view class="scroll-view-item uni-bg-red">
						<view class="scroll-view-item-title">{{key}}</view>
						<view class="scroll-view-bottom">
							<view v-for="(childrenVal, childrenKey) in value" class="scroll-view-item-one"
								:key="childrenKey">
								<view class="scroll-view-item-block" @click="chooseItem(roomData[key],childrenKey)">
									<view v-if="childrenVal.isSale" class="item-sale">已售</view>
									<view class="item-collection">
										<u-icon name="heart"></u-icon>
									</view>
									<view class="grid-text grid-one"
										:style="{color: childrenVal.isSale ? '$color-e5' : '#000'}">{{childrenVal.name}}
									</view>
									<view class="grid-text grid-two"
										:style="{color: childrenVal.isSale ? '$color-e5' : '#000'}">
										{{childrenVal.price}}元/㎡
									</view>
									<view class="grid-text grid-two"
										:style="{color: childrenVal.isSale ? '$color-e5' : '#000'}">{{childrenVal.area}}㎡
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view v-else class="collection">
			<!-- 收藏-->
			<view class="collection-title">
				<view class="collection-title-left">
					<view>您已收藏1套房源</view>
					<!-- <view>点击右侧按钮,可拖拽调整已收藏房源的排序顺序,方便您排出选房优先级。</view> -->
				</view>
				<view class="collection-title-right">
					<!-- 拖拽图标 -->
				</view>
			</view>
			<view class="collection-rwo">
					<view>
						<view class="collection-rwo-num">1</view>
						<view>
							<view>车位-B1-118</view>
							<view>9.00万 27㎡ 1次收藏</view>
						</view>
						
					</view>
					<u-icon name="close" color="#2979ff" size="28"></u-icon>
			</view>
			
		</view>
		<u-popup v-model="show" mode="bottom" :closeable="true" class="model-main">
			<view>
				<view class="model-title">{{`${list[current].name}-${unit[chooseUnit].name}-${modelData.name}`}}
				</view>
				<view class="model-one" v-if="current === 0">
					<view class="model-one-top">
						<view class="text-left">房源总价：</view>
						<view>1176717.24元</view>
					</view>
					<view class="model-one-bottom">
						<view>
							<view class="text-left">房源单价：</view>
							<view>6920元/㎡</view>
						</view>
						<view>
							<view class="text-left">房源结构：</view>
							<view>四室两厅两卫</view>
						</view>
						<view>
							<view class="text-left">房源名称：</view>
							<view>A1户型</view>
						</view>
						<view>
							<view class="text-left">收藏数量：</view>
							<view>0次</view>
						</view>
					</view>
				</view>
				<view v-else class="model-one">
					<view class="model-one-top">
						<view class="text-left">车位总价：</view>
						<view>1176717.24元</view>
					</view>
					<view class="model-one-bottom">
						<view>
							<view class="text-left">车位单价：</view>
							<view>6920元/㎡</view>
						</view>
						<view>
							<view class="text-left">车位结构：</view>
							<view>四室两厅两卫</view>
						</view>
						<view>
							<view class="text-left">车位名称：</view>
							<view>A1户型</view>
						</view>
						<view>
							<view class="text-left">收藏数量：</view>
							<view>0次</view>
						</view>
					</view>
				</view>
				<view class="model-two" v-if="current === 0">
					<view class="text-left">房源备注:</view>
					<view class="text-right">3号楼一单元1101室为东户3号楼一单元1101室为东户3号楼一单元1101室为东户</view>
				</view>
			</view>
			<view class="mode-bottom">
				<view class="mode-bottom-left">
					<u-icon name="heart" :label-size="30"></u-icon>
					<view>收藏</view>
				</view>
				<view class="mode-bottom-right" @click="settleMode = true">
					<view>立即抢{{current === 0 ? '房' : '车位'}}</view>
					<view>{{`结束倒计时：${56}天${08}时`}}</view>
				</view>
			</view>
		</u-popup>
		<u-modal 
		v-model="settleMode" 
		:mask-close-able="true"
		:show-title="false"
		:show-confirm-button="false"
		:show-cancel-button="false">
		<view class="settle-mode-main">
			<view class="settle-mode-header">
				<view class="settle-mode-header-body">
					<view class="settle-mode-header-top">
						<view>确认选房</view>
						<view>一号楼-一单元-1202</view>
					</view>
					<view class="settle-mode-header-bottom">
						<view class="settle-mode-header-bottom-total">
							<view>￥11115878.45</view>
							<view>元</view>
						</view>
						<view class="settle-mode-header-bottom-price">6999元/㎡</view>
					</view>
					<view class="cli-left cli-plu"></view>
					<view class="cli-right cli-plu"></view>
				</view>
			</view>
			<view class="settle-mode-bottom">
				<view class="settle-mode-bottom-user">购买人：胡林</view>
				<view class="settle-mode-bottom-user">手机号：132726***132</view>
				<view class="settle-mode-bottom-rules">
					<u-checkbox-group active-color="red">
						<u-checkbox v-model="checked" shape="circle">我已阅读并同意《在线选房须知》</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="settle-mode-bottom-button">
					<view>取消</view>
					<view @click="settleMode=false;succeseMode=true">确定</view>
				</view>
				<view class="settle-mode-bottom-tip">请及时完成确认选房,否则选房结果作废</view>
			</view>
		</view>
		</u-modal>
		<u-modal
		v-model="succeseMode" 
		:mask-close-able="true"
		:show-title="false"
		:show-confirm-button="false"
		:show-cancel-button="false">
			<view class="succese-mode-main">
				<view class="succese-mode-title">祝贺您成功选定房源</view>
				<view class="succese-mode-info">房号为：一号楼-一单元-10302</view>
				<view class="succese-mode-button">查看我的房源</view>
				<view class="succese-mode-tip">请于2日内前往售楼部签订合同,否则选房结果作废</view>
			</view>
		</u-modal>
		<footer></footer>
	</view>
</template>

<script>
	import footer from './../index/index.vue';
	export default {
		components:{
			footer
		},
		data() {
			return {
				title: '选房',
				count: 0, // 头部选择的下表:全部房源、我的收藏
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
				scrollTop: 0,
				show: false, // 下边的model
				modelData: {}, // 打开model的数据
				settleMode: false, // 结算的model
				checked: true, // 用户须知勾选
				succeseMode: false, // 成功之后的model框
			}
		},
		created() {
			let myData = {};
			for (let j = 0; j < 5; j++) {
				myData[`${j+1}层`] = [];
				for (let i = 0; i < 15; i++) {
					myData[`${j+1}层`].push({
						name: `${j + 1}0${i+1}`,
						isSale: i % 2 == 0, // 是否已售
						price: 9000, // 单价
						area: 66, // 面积大小
					})
				}
			}
			this.roomData = myData;
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
			chooseItem(val, i) { // 点击块--选择
				const value = val[i];
				if (!value.isSale) { // 没有销售--打开model
					this.show = true;
					this.modelData = value;
				}
				console.log(value)
			},
		}
	}
</script>

<style lang="scss">
@import  "@/style/style.scss";
	.center-main {

		// height: 100%;
		// width:100%;
		.center-header {
			height: 80rpx;
			width: 100wh;
			border-bottom: 1rpx solid $color-d5;
		}

		.center-header-title {
			height: 80rpx;
			width: 100wh;
			border-bottom: 1rpx solid $color-d5;
			display: flex;
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
				background-color: $color-ff;
				padding: 20rpx 30rpx;
				border-radius: 8rpx;
				border: 1rpx solid $color-e5;
			}

			.error {
				color: $color-ff;
				background-color: $color-red;
				border: 1rpx solid $color-red;
			}

		}

		.scroll-contianr {
			// 滚动区域的样式
			width: 100%;
			height: calc(100% - 100rpx);
			padding: 0 30rpx;
			margin-bottom: 250rpx;

			.scroll-Y {
				.scroll-view-item {
					.scroll-view-item-title {
						font-size: 30rpx;
						margin-top: 30rpx;
					}

					.scroll-view-bottom {
						display: flex;
						flex-wrap: wrap;

						.scroll-view-item-one {
							margin-right: 30rpx;
							margin-top: 10rpx;

							.scroll-view-item-block {
								width: 200rpx;
								height: 180rpx;
								background-color: $color-ff;
								border-radius: 10rpx;
								border: 1rpx solid $color-e5;
								position: relative;
								overflow: hidden;

								.grid-text {
									display: flex;
									justify-content: center;
								}

								.grid-one {
									font-size: 45rpx;
									color: #000;
									margin-top: 8rpx;
								}

								.grid-two {
									font-size: 30rpx;
									margin-top: 8rpx;
								}

								.item-sale { // 已售
									position: absolute;
									left: -45rpx;
									top: -45rpx;
									width: 100rpx;
									height: 100rpx;
									transform: rotate(-45deg);
									background-color: red;
									@include flex(flex-end, center);
									color: $color-ff;
								}
								.item-collection{ // 收藏
									position: absolute;
									right: -45rpx;
									bottom: -45rpx;
									width: 100rpx;
									height: 100rpx;
									transform: rotate(-45deg);
									background-color: $color-red;
									@include flex(flex-start, center);
									color: $color-ff;
								}
							}
						}
					}


				}
			}
		}

		.model-main {

			// model框
			.model-title {
				font-size: 40rpx;
				font-weight: bold;
				height: 100rpx;
				display: flex;
				align-items: center;
				padding-left: 30rpx;
			}

			.text-left {
				// 内容左侧的公共样式
				color: $color-d5;
				font-size: 24rpx;
			}

			.text-right {
				// 内容右侧的样式
				font-size: 24rpx;
			}

			.model-one {
				border-top: 1rpx solid $color-e5;
				border-bottom: 1rpx solid $color-e5;
				padding: 30rpx;

				.model-one-top {
					display: flex;
				}

				.model-one-bottom {
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					>view {
						width: 50%;
						display: flex;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}

			.model-two {
				display: flex;
				padding: 30rpx;
				border-bottom: 1rpx solid $color-e5;

				>view:first-child {
					width: 150rpx;
				}

				>view:last-child {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.mode-bottom {
				height: 120rpx;
				display: flex;
				font-size: 30rpx;

				.mode-bottom-left {
					width: 150rpx;
					height: 100%;
					@include flex();
					flex-direction: column;
				}

				.mode-bottom-right {
					width: calc(100% - 150rpx);
					height: 100%;
					background-color: $color-red;
					@include flex();
					flex-direction: column;
					color: $color-ff;

					>view:first-child {
						font-size: 40rpx;
					}
				}
			}
		}

		.collection {
			.collection-title {
				height: 200rpx;
				padding: 40rpx 30rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1rpx solid $color-e5;

				.collection-title-left {
					font-size: 30rpx;
					color: $color-b5;

					>view:first-child {
						font-size: 50rpx;
						color: #000;
					}
				}

				.collection-title-right {}
			}

			.collection-rwo {
				border-bottom: 1rpx solid $color-e5;
				height: 120rpx;
				padding: 0 30rpx;
				@include flex(center, space-between);
				.collection-rwo-num {
					width: 40rpx;
					height: 40rpx;
					@include flex();
					background-color: $color-red;
					border-radius: 50%;
					overflow: hidden;
					color: $color-ff;
					font-size: 24rpx;
				}
				>view:first-child{
					display: flex;
					align-items: center;
					>view:nth-child(2) {
						margin-left: 30rpx;
						>view:nth-child(1){
							font-size: 50rpx;
						}
						>view:last-child {
						font-size: 30rpx;
						color: $color-b5;
					}
					}
				}
				
			}
		}
		.settle-mode-main{ // 结算的model
			width: 600rpx;
			height: 850rpx;
			.settle-mode-header{
				height: 60%;
				width: 100%;
				background-color: $color-red;
				padding: 50rpx 30rpx;
				position: relative;
				.cli-plu{
					position: absolute;
					bottom: 163rpx;
					width: 50rpx;
					height: 50rpx;
					background-color: $color-red;
				}
				.cli-left{
					left: 0rpx;
					border-radius: 0 50% 50% 0 ;
					border-right: 1rpx solid $color-red;
				}
				.cli-right{
					right: 0rpx;
					border-radius: 50% 0 0 50%;
					border-left: 1rpx solid $color-red;
				}
				.settle-mode-header-body{
					background-color: $color-ff;
					height: 100%;
					border-radius: 8rpx;
					.settle-mode-header-top{
						width: 100%;
						height: 65%;
						font-size: 35rpx;
						color: $color-b5;
						display: flex;
						flex-direction: column;
						align-items: center;
						border-bottom: 4rpx dashed $color-red;
						padding-top: 20rpx;
						>view:last-child{
							color: #000;
							font-size: 45rpx;
							background-color: $color-e5;
							margin-top: 30rpx;
							width: calc(100% - 60rpx);
							height: 120rpx;
							@include flex();
						}
					}
					.settle-mode-header-bottom{
						height: 35%;
						width: 100%;
						color: $color-red;
						@include flex();
						flex-direction: column;
						.settle-mode-header-bottom-total{
							font-size: 45rpx;
							font-weight: bold;
							display: flex;
							>view:last-child{
								font-size: 40rpx;
							}
						}
						.settle-mode-header-bottom-price{
							font-size: 30rpx;
						}
					}
				}
			}
			.settle-mode-bottom{
				height: 40%;
				width: 100%;
				padding: 30rpx;
				.settle-mode-bottom-user{
					font-size: 35rpx;
					margin-bottom: 10rpx;
				}
				.settle-mode-bottom-rules{
					color: $color-b5;
					font-size: 35rpx;
				}
				.settle-mode-bottom-button{
					display: flex;
					justify-content: space-between;
					margin: 10rpx 0;
					>view{
						width: calc(50% - 15rpx);
						height: 80rpx;
						color: $color-ff;
						font-size: 40rpx;
						@include flex();
						border-radius: 8rpx;
					}
					>view:first-child{
						background-color: $color-b5;
					}
					>view:last-child{
						background-color: $color-red;
					}
				}
				.settle-mode-bottom-tip{
					font-size: 35rpx;
					color: $color-b5;
				}
			}
		}
		.succese-mode-main{ // 结算成功之后的model
			width: 600rpx;
			height: 800rpx;
			padding: 40rpx;
			.succese-mode-title{
				font-size: 35rpx;
				color: #000;
				font-weight: bold;
			}
			.succese-mode-info{
				font-size: 30rpx;
				color: $color-b5;
				margin-top: 20rpx;
				margin-bottom: 40rpx;
			}
			.succese-mode-button{
				color: $color-ff;
				border-radius: 8rpx;
				background-color: $color-red;
				font-size: 40rpx;
				@include flex();
				height: 80rpx;
				width: 100%;
			}
			.succese-mode-tip{
				margin-top: 20rpx;
				font-size: 26rpx;
				color: #c5c5c5;
			}
		}
	}
</style>
