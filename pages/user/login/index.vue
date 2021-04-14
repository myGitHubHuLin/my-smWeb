<template>
	<view class="my-login">
		<u-image width="100%" height="400rpx" :src="src" class="login-bacground-img"></u-image>
		<view class="login-form">
			<u-form :model="form" ref="uForm" :label-width="200">
				<u-form-item label="姓名" prop="Name">
					<u-input v-model="form.Name" placeholder="请输入姓名"/>
				</u-form-item>
				<u-form-item label="身份证号码" prop="IdCard">
					<u-input v-model="form.IdCard"  placeholder="请输入身份证号码" tyep="idcard"/>
				</u-form-item>
				<u-form-item label="手机号" prop="Phone">
					<u-input v-model="form.Phone"  placeholder="请输入手机号" type="number"/>
				</u-form-item>
			</u-form>
			<u-button @click="submit" class="my-login-button" type="error">确定绑定</u-button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		computed:{
			...mapState(['CustomeGrantId']) 
		},
		data() {
			return {
				src: '',
				form: { // 表单数据
					Name: '',
					IdCard: '',
					Phone: '',
				},
				rules: {
					Name: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'blur,change'
					}],
					IdCard: [{
							required: true,
							message: '请输入身份证号码',
							trigger: 'blur,change'
						}],
					Phone: [{
							required: true,
							message: '请输入手机证号码',
							trigger: 'blur,change'
						}]
				}
			}
		},
		onShow() {
			this.getBackdropPic(); // 获取背景图
			// console.log(this.$u, getCurrentPages())
		},
		onReady() { // 初始化规则
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.bindCustomer();
					} else {
						// uni.switchTab({
						// 	url: '/pages/tabbar/home/index'
						// });
						// this.$u.route({type: 'navigateBack'});
						console.log('验证失败');
					}
				})
			},
			bindCustomer() { // 提交顾客信息
				this.$u.api.bindCustomer({CustomeGrantId: this.CustomeGrantId, ...this.form}).then(res => {
					const data = res.Data;
					this.$u.vuex('token', data.Token);
					this.$u.vuex('userInfo', {Name: data.Name, Phone: data.Phone});
					// uni.switchTab({
					// 	url: '/pages/tabbar/center/index'
					// });
					this.$u.route({type: 'navigateBack'});
				})
			},
			getBackdropPic() {
				this.$u.api.getBackdropPic({}).then(res => {
					this.src = res.Data;
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-login {
		width: 100wh;
		height: 100vh;
		position: relative;

		.login-bacground-img {
			height: 400rpx;
			width: 100%;
		}

		.login-form {
			position: absolute;
			top: 250rpx;
			left: 0;
			padding: 0 30rpx;
			width: calc(100% - 60rpx);
			margin: 0 30rpx;
			background-color: #fff;
			border-radius: 10rpx;
			box-shadow: 2rpx 2rpx 10rpx 4rpx #888;
			;

			.my-login-button {
				margin: 0 30px;
				width: calc(100% - 60rpx);
			}
		}
	}
</style>
