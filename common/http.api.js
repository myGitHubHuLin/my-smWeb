// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let wxappLoginUrl = '/Wechatapplets/userInfo';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	// 小程序授权登录
	let wxappLogin = (params = {}) => vm.$u.get('/Index/wxappLogin', params);
	
	// 获取用户信息
	let getUserInfo = (params = {}) => vm.$u.get('/Index/getUserInfo', params);
	
	// 生成订单
	let createOrder = (params = {}) => vm.$u.post('/Order/create', params);
	
	// 获取用户订单列表
	let getOrderList = (params = {}) => vm.$u.post('/Order/list', params);
	
	// 获取房源的查询条件
	let getHouse = (params = {}) => vm.$u.post('/api/AppletsArchitecture/GetArchitectures', params);
	
	// 获取建筑明细列表
	let getHouseList = (params = {}) => vm.$u.post('/api/AppletsArchitecture/GetArchitectureDetails', params);
	
	// 微信支付--确定订单
	let creactOrder = (params = {}) => vm.$u.post('/api/ArchitectureOrder/Create', params);
	
	// 查看我的房源
	let getMyHousing = (params = {}) => vm.$u.get('/api/ArchitectureOrder/GetMyHousing', params);
	
	// 获取手机号--售房
	let getContactPhone = (params = {}) => vm.$u.get('/api/AppletsArchitecture/GetContactPhone', params);
	
	// 查询首页的房源
	let getOneHousingInfo = (params = {}) => vm.$u.get('/api/AppletsArchitecture/GetOneHousingInfo', params);
	
	// 添加收藏
	let creactCollect = (params = {}) => vm.$u.post('/api/CollectLogs/Create', params);
	
	// 获取我的收藏列表
	let getCollect = (params = {}) => vm.$u.get('/api/CollectLogs/GetMyCollectLogs', params); 
	
	// 取消收藏--model框使用
	let cannelCollect = (params = {}) => vm.$u.post('/api/CollectLogs/CannelCollect', params); 
	
	// 删除收藏--我的收藏列表使用
	let delCollect = (params = {}) => vm.$u.post('/api/CollectLogs/Delete', params); 
	
	//购房须知
	let getPurchaseAgreement = (params = {}) => vm.$u.get('/api/AppletsArchitecture/GetPurchaseAgreement', params); 
	
	// 绑定顾客信息
	let bindCustomer = (params = {}) => vm.$u.post('/api/Open/BindCustomer', params);
	
	// 获取背景图片
	let getBackdropPic = (params = {}) => vm.$u.get('/api/AppletsArchitecture/GetBackdropPic', params);
	
	// 微信登陆
	let login = (params = {}) => vm.$u.get('/api/Open/Login', params);

	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		wxappLogin,
		getUserInfo,
		createOrder,
		getOrderList,
		getHouse,
		getHouseList,
		creactOrder,
		getMyHousing,
		getOneHousingInfo,
		getContactPhone,
		creactCollect,
		getCollect,
		delCollect,
		getPurchaseAgreement,
		bindCustomer,
		getBackdropPic,
		login,
		cannelCollect
		};
}

export default {
	install
}


