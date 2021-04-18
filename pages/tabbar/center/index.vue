<template>
	<view class="center-main">
		<view class="center-header">
			<u-tabs :list="[{name: '全部房源'},{name: '我的收藏'}]" :is-scroll="false" :current="centerTab" @change="change"
				:show-bar="false" :active-item-style="{backgroundColor:'$color-ff',color: 'red'}" bg-color="$color-e5">
			</u-tabs>
		</view>
		<view v-if="centerTab === 0">
			<view class="center-header-title">
				<view class="center-header-title-left">
					<scroll-view :scroll-x="true">
						<view class="center-header-title-main">
							<view 
								v-for="(first, index) in list" :key="index"
								:class="{'title-select-line' : current === index}" 
								class="title-left"
								@click="chooseTitle(index)">
								{{first.Name}}
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="title-right" :class="{'choose-color' : query.SellStatus !== 0}" @click="rightChoose(query.SellStatus)">只看未选
				</view>
			</view>
			<view class="center-title-three" v-show="list[current] && list[current].Architectures">
				<view v-for="(item, index) in list[current].Architectures" :key="index" :class="{'error': chooseUnit === index}"
					@click="threeChoose(item, index)">
					{{item.Name}}
				</view>
			</view>
			<view class="scroll-contianr">
				<u-empty text="暂未录入数据,请先去管理后台录入数据" mode="list" v-if="!roomData || roomData.length < 1"></u-empty>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
					v-for="(value,key,index) in roomData" :key="index">
					<view class="scroll-view-item uni-bg-red">
						<view class="scroll-view-item-title">{{value.Name}}</view>
						<view class="scroll-view-bottom">
							<view v-for="(childrenVal, childrenKey) in value.ArchitectureDetails" class="scroll-view-item-one"
								:key="childrenKey" @click="chooseItem" :data-val="childrenVal">
								<view class="scroll-view-item-block" >
									<view v-if="childrenVal.SellStatus === 2" class="item-sale">已售</view>
									<view class="item-collection" v-if="childrenVal.IsCollect">
										<u-icon name="heart"></u-icon>
									</view>
									<view class="grid-text grid-one"
										:style="{color: childrenVal.SellStatus === 2 ? '$color-e5' : '#000'}">{{childrenVal.ArchitectureCode}}
									</view>
									<view class="grid-text grid-two"
										:style="{color: childrenVal.SellStatus === 2 ? '$color-e5' : '#000'}">
										{{childrenVal.UnitPrice}}元/㎡
									</view>
									<view class="grid-text grid-two"
										:style="{color: childrenVal.SellStatus === 2 ? '$color-e5' : '#000'}">{{childrenVal.ArchitectureSize}}㎡
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
					<view>您已收藏{{myCollect.length}}套房源</view>
					<!-- <view>点击右侧按钮,可拖拽调整已收藏房源的排序顺序,方便您排出选房优先级。</view> -->
				</view>
				<!-- <view class="collection-title-right"> -->
					<!-- 拖拽图标 -->
				<!-- </view> -->
			</view>
			<view class="collection-rwo" v-for="(item, index) in myCollect" :key="index">
					<view>
						<view class="collection-rwo-num">{{index + 1}}</view>
						<view>
							<view>{{item.HousingName}}</view>
							<view>{{(item.UnitPrice/ 10000).toFixed(2)}}万 {{item.ArchitectureSize}}㎡ {{item.CollectNum}}次收藏</view>
						</view>
						
					</view>
					<u-icon name="close" color="#2979ff" size="28" @click="delCollect(item)"></u-icon>
			</view>
			<u-empty text="暂无数据" mode="favor" v-if="!myCollect || myCollect.length < 1 "></u-empty>
			
		</view>
		<u-popup v-model="show" mode="bottom" :closeable="true" class="model-main">
			<view>
				<view class="model-title">{{`${list[current].Name}-${list[current].Architectures[chooseUnit].Name}-${modelData.ArchitectureCode}`}}
				</view>
				<view class="model-one" v-if="modelData.ArchitectureType === 1">
					<view class="model-one-top">
						<view class="text-left">房源总价：</view>
						<view>{{modelData.TotalPrice}}元</view>
					</view>
					<view class="model-one-bottom">
						<view>
							<view class="text-left">房源单价：</view>
							<view>{{modelData.UnitPrice}}元/㎡</view>
						</view>
						<view>
							<view class="text-left">房源结构：</view>
							<view>{{modelData.ArchitectureStructure}}</view>
						</view>
						<view>
							<view class="text-left">房源名称：</view>
							<view>{{modelData.ArchitectureName}}</view>
						</view>
						<view>
							<view class="text-left">收藏数量：</view>
							<view>{{modelData.CollectNum}}次</view>
						</view>
					</view>
				</view>
				<view v-else class="model-one">
					<view class="model-one-top">
						<view class="text-left">车位总价：</view>
						<view>{{modelData.TotalPrice}}元</view>
					</view>
					<view class="model-one-bottom">
						<view>
							<view class="text-left">车位单价：</view>
							<view>{{modelData.UnitPrice}}元/㎡</view>
						</view>
						<view>
							<view class="text-left">车位结构：</view>
							<view>{{modelData.ArchitectureStructure}}</view>
						</view>
						<view>
							<view class="text-left">车位名称：</view>
							<view>{{modelData.ArchitectureName}}</view>
						</view>
						<view>
							<view class="text-left">收藏数量：</view>
							<view>{{modelData.CollectNum}}次</view>
						</view>
					</view>
				</view>
				<view class="model-two" v-if="modelData.ArchitectureType === 1">
					<view class="text-left">房源备注:</view>
					<view class="text-right">{{modelData.Remarks}}</view>
				</view>
			</view>
			<view class="mode-bottom">
				<view class="mode-bottom-left" @click="creactCollect(modelData)">
					<u-icon name="heart" :label-size="30" v-if="!modelData.IsCollect"></u-icon>
					<u-icon name="heart-fill" :label-size="30" v-else color="red"></u-icon>
					<view :style="{color: modelData.IsCollect ? 'red' : '#000'}">收藏</view>
				</view>
				<view class="mode-bottom-right" @click="settleMode = (timestamp > 0)" :style="{backgroundColor: timestamp > 0 ? '' : '#b5b5b5'}">
					<view>立即抢{{modelData.ArchitectureType === 1 ? '房' : '车位'}}</view>
					<view>{{`结束倒计时：`}}
					<u-count-down
					:timestamp="timestamp" 
					separator="zh"
					separator-color="#fff"
					:show-minutes="false"
					:show-seconds="false"
					bg-color="transparent"
					color="#fff"
					></u-count-down>
					</view>
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
						<view>{{`${list[current].Name}-${list[current].Architectures[chooseUnit].Name}-${modelData.ArchitectureCode}`}}</view>
					</view>
					<view class="settle-mode-header-bottom">
						<view class="settle-mode-header-bottom-total">
							<view>￥{{modelData.TotalPrice}}</view>
							<view>元</view>
						</view>
						<view class="settle-mode-header-bottom-price">{{modelData.UnitPrice}}元/㎡</view>
					</view>
					<view class="cli-left cli-plu"></view>
					<view class="cli-right cli-plu"></view>
				</view>
			</view>
			<view class="settle-mode-bottom">
				<view class="settle-mode-bottom-user">购买人：{{userInfo.Name}}</view>
				<view class="settle-mode-bottom-user">手机号：{{userInfo.Phone}}</view>
				<view class="settle-mode-bottom-rules">
					<u-checkbox-group active-color="red">
						<u-checkbox v-model="checked" shape="circle">我已阅读并同意《在线选房须知》</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="settle-mode-bottom-button">
					<view @click="settleMode=false">取消</view>
					<view @click="creactOrder">确定</view>
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
				<view class="succese-mode-info">房号为：{{`${list[current].Name}-${list[current].Architectures[chooseUnit].Name}-${modelData.ArchitectureCode}`}}</view>
				<view class="succese-mode-button" @click="lookMyHouse">查看我的房源</view>
				<view class="succese-mode-tip">请于2日内前往售楼部签订合同,否则选房结果作废</view>
			</view>
		</u-modal>
		<u-toast ref="uToast" />
		<footer></footer>
	</view>
</template>

<script>
	import footer from './../index/index.vue';
	import moment from 'moment'
	import {
		mapState
	} from 'vuex'
	import store from "@/store"
	export default {
		components:{
			footer
		},
		computed:{
			...mapState(['centerTab', 'userInfo']) //  // 头部选择的下表:全部房源、我的收藏
		},
		data() {
			return {
				title: '选房',
				// count: 0, // 头部选择的下表:全部房源、我的收藏
				list: [], // 最顶部的查询条件
				current: 0, // 切换房号、车位
				query: { // 查询列表的条件
					HousingId: 1, // 房源id
					Id: 0, // 第二层建筑的id
					SellStatus: 0, // 1：未选折   0：全部--默认 是否查看未选
				},
				chooseUnit: 0, // 当前选中的index
				roomData: [], // 房间具体的信息
				scrollTop: 0,
				show: false, // 下边的model
				modelData: {}, // 打开model的数据
				settleMode: false, // 结算的model
				checked: true, // 用户须知勾选
				succeseMode: false, // 成功之后的model框
				myCollect: [], // 我的收藏
				timestamp: 0, // 结束的倒计时
			}
		},
		async onShow() {
			await this.loadHouseQuery(); // 查询条件的查询
			await this.getHouseList(); // 列表的查询
		},
		onTabItemTap : function(e) { // 监听tabbar点击事件，重置index
			this.$u.vuex('centerTab',0); 
		    // e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
		},
		methods: {
			loadHouseQuery() { // 查询条件的查询
				return this.$u.api.getHouse({HousingId: 1}).then(res =>{
					this.list = res.Data;
					this.query.Id = res?.Data[0]?.Architectures[0]?.Id
				})
			},
			getHouseList() {
				const {query} = this;
				if (!query.Id) {
					return this.roomData = [];
				}
				return this.$u.api.getHouseList(query).then(res =>{
					this.roomData = res.Data;
				})
			},
			chooseTitle(i) { // 房号、车位切换
				this.current = i;
				this.chooseUnit = 0; // 重置单元下标
				this.query.Id = this.list[i]?.Architectures[0]?.Id
				if(!this.list[i]?.Architectures[0]?.Id) { // 没有下级
					this.roomData = [];
				} else {
					this.getHouseList();
				}
			},
			async change(index) { // 顶部切换
				this.$u.vuex('centerTab', index);
				if(index === 0) { // 切回我的房源
					this.current = 0;
					this.chooseUnit = 0;
					await this.loadHouseQuery(); // 查询条件的查询
					await this.getHouseList(); // 列表的查询
				} else { // 我的收藏
					if (!this.$u.func.getGlobalUserInfoShow()) { // 登录成功之后才能打开model
						this.getCollect();
					}
				}
			},
			rightChoose(val) { // 是否查看未选择
				this.query.SellStatus = val === 0 ? 1 : 0;
				this.getHouseList(); // 列表的查询
			},
			threeChoose(item, i) { // 单元切换
				this.chooseUnit = i;
				this.query.Id = this.list[this.current]?.Architectures[i]?.Id
				this.getHouseList();
			},
			async chooseItem(val) { // 点击块--选择
				const value = val.currentTarget.dataset.val;
				if (value.SellStatus !== 2) { // 没有销售--打开model
					if (this.$u.func.getGlobalUserInfoShow()) { // 没有信息打开model
						await this.$u.func.wxLogin();
					} else{
						this.show = true;
						this.modelData = value;
						console.log(value)
						let time = +moment(value.ChooseHouseEndTime).format('X');
						let nowTime = +moment().format('X');
						let lastTime = (time - nowTime) > 0 ? (time - nowTime) : 0;
						this.timestamp = lastTime || 0;
					}
				}
			},
			creactOrder() { // 微信支付确定订单
				 const {modelData, checked} = this;
				 if(!checked) {
					 this.$refs.uToast.show({
					 		title: '请先勾选【在线选房须知】',
					 		type: 'error',
					 		// url: '/pages/user/index'
					 })
					 return false;
				 }
				 this.$u.api.creactOrder({ArchitectureId: modelData.Id}).then(res => {
					 if (res.Data.ArchitectureOrderId) {
						 this.openWXpay(res.Data)
					 } else {
						 uni.showToast({
						   title: '未配置支付配置，请先配置微信支付配置！',
						   icon: 'none',
						   duration: 2000,
						 })
					 }
					 // this.settleMode=false;
					 // this.show = false;
					 // this.succeseMode=true;
				 })
			},
			openWXpay (payConfig) { // 微信支付
				let that = this;
				  uni.requestPayment({
					  provider: "wxpay",
					  orderInfo: payConfig.ArchitectureOrderId,
				      timeStamp: payConfig.TimeStamp,
				      nonceStr: payConfig.NonceStr,
				      package: payConfig.Package,
				      signType: payConfig.SignType,// 'MD5',
				      paySign: payConfig.PaySign,
				      success: function (res) {
				        uni.showToast({
				          title: '支付成功！',
				          icon: 'success',
				          duration: 1000,
				        })
				        setTimeout(()=>{
				            that.settleMode=false;
				            that.show = false;
				            that.succeseMode=true;
				        },500)
				      },
				      fail: function (res) {
						  console.log(res)
				        uni.showToast({
				          title: '支付失败',
				          icon: 'none',
				        })
				      }
				    })
			},
			lookMyHouse() { // 查看我的房源
				this.succeseMode = false;
				uni.navigateTo({
				    url: '/pages/tabbar/user/my-housing'
				});
			},
			creactCollect(data) { // 添加收藏
				if(data.IsCollect) { // 已经收藏--取消收藏
					this.cannelCollect(data);
				} else { // 添加收藏
					this.addCollect();
				}
			},
			addCollect() { // 添加收藏
				const {modelData} = this;
				this.$u.api.creactCollect({CollectId: modelData.Id, CollectType: modelData.ArchitectureType}).then(async res => {
					await this.loadHouseQuery(); // 查询条件的查询
					await this.getHouseList(); // 列表的查询
					this.modelData.IsCollect = true;
					this.modelData.CollectNum++
				})
			},
			getCollect() { // 获取我的收藏
				const {modelData} = this;
				this.$u.api.getCollect().then(res => {
					this.myCollect = res.Data;
					console.log(res)
				})
			},
			cannelCollect(item) { // model得取消
				this.$u.api.cannelCollect({CollectId: item.Id, CollectType: item.ArchitectureType}).then(async res => {
					await this.loadHouseQuery(); // 查询条件的查询
					await this.getHouseList(); // 列表的查询
					this.modelData.IsCollect = false;
					this.modelData.CollectNum--
				})
			},
			delCollect(item) { // 收藏列表--删除收藏 
				this.$u.api.delCollect([item.Id]).then(async res => {
					this.getCollect();
				})
			}
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
			.center-header-title-left{
				width: calc(100% - 140rpx);
				height: 100%;
				.center-header-title-main{
					@include flex(center, flex-start);
					width: 100%;
					height: 100%;
					.title-left {
						width: 180rpx;
						min-width: 180rpx;
						@include textOverflow();
						height:  80rpx;
						font-size: 35rpx;
						margin-right: 30rpx;
						display: flex;
						align-items: center;
					}
					
					.title-select-line {
						border-bottom: 2px solid $color-red;
						color: $color-red;
					}
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
									font-size: 40rpx;
									color: #000;
									margin-top: 8rpx;
								}

								.grid-two {
									font-size: 26rpx;
									margin-top: 8rpx;
								}

								.item-sale { // 已售
									position: absolute;
									left: -45rpx;
									top: -45rpx;
									width: 90rpx;
									height: 90rpx;
									transform: rotate(-45deg);
									background-color: red;
									@include flex(flex-end, center);
									color: $color-ff;
								}
								.item-collection{ // 收藏
									position: absolute;
									right: -45rpx;
									bottom: -45rpx;
									width: 90rpx;
									height: 90rpx;
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
							font-size: 35rpx;
							max-width: 500rpx;
							@include textOverflow();
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
							font-size: 40rpx;
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
							font-size: 40rpx;
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
					font-size: 30rpx;
					color: $color-b5;
				}
			}
		}
		.succese-mode-main{ // 结算成功之后的model
			width: 600rpx;
			height: 400rpx;
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
