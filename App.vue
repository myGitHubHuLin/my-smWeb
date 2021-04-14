<script>
	import  wxLogin from './utils/common.js'; // this.$u.share
	export default {
		onLaunch: function() {
			console.log('App onLaunch')
		},
		onShow: async function() { // 初始化获取token以及用户信息
			let user = {};
			await this.$u.func.wxLogin(true, false);
			// this.$u.vuex('token', user.Token);
			// this.$u.vuex('userInfo', {Name: user.Name, Phone: user.Phone});
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	// @import  "style/style.scss";
	/*每个页面公共css */
</style>
