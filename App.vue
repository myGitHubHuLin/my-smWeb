<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onTabItemTap : function(e) {
		    console.log(e);
		    // e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
		},
		onNavigationBarButtonTap : function (e) {
		    console.log(e);
		    // e的返回格式为json对象：{"text":"测试","index":0}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	// @import  "style/style.scss";
	/*每个页面公共css */
</style>
