// 全局公共方法
// 此处第二个参数vm，就是我页面使用的this
const install = (Vue, vm) => {
	// 检查登录状态
	const checkLogin = (e = {}) => {
		if (!vm.isLogin) {
			uni.navigateTo({
				url: '/pages/user/login/login'
			})
			return false
		}
		return true
	}
	
	// 校验是否是H5页面
	const checkH5 = (url) => {
		const testHttp = vm.$u.test.url(url)
		if (testHttp) {
			return '/pages/h5/h5?url=' + url
		} else {
			return url
		}
	}
	// URL参数转对象
	const paramsToObj = (url) => {
		// 如果是完整URL，包含?号，先通过?号分解
		if (url.indexOf('?') != -1) {
			let arr = url.split('?')[1]
		}
		let arr = url.split('&') //先通过？分解得到？后面的所需字符串，再将其通过&分解开存放在数组里
		let obj = {}
		for (let i of arr) {
			obj[i.split('=')[0]] = i.split('=')[1] //对数组每项用=分解开，=前为对象属性名，=后为属性值
		}
		return obj
	}

	// 刷新当前页面
	const refreshPage = () => {
		const pages = getCurrentPages()
		const currentPage = pages[pages.length - 1]
		const path = '/' + currentPage.route + vm.$u.queryParams(currentPage.options)
		if (vm.$u.test.contains(currentPage.route, 'tabbar')) {
			uni.reLaunch({
				url: path,
				fail: (err) => {
					console.log(err)
				}
			})
		} else {
			uni.redirectTo({
				url: path,
				fail: (err) => {
					console.log(err)
				}
			})
		}
	}
	
	
	
	Vue.prototype.$u.func = {
		checkLogin,
		checkH5,
		paramsToObj,
		refreshPage
	}
	// 将各个定义的方法，统一放进对象挂载到vm.$u.share(因为vm就是this，也即this.$u.share)下
}
export default {
	install
}
