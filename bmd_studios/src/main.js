import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
/* 为Vue对象注入自定义属性 全局变量 */
import BaseUrl from "./http/BaseUrl";
const uploadURL = BaseUrl.UPLOADURL;
Vue.prototype.uploadURL = uploadURL;

Vue.config.productionTip = false;
//设置高德地图安全密钥
window._AMapSecurityConfig = {
	securityJsCode: "a3a745d98e36965a1a002e35bf5995d4",
};
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
