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

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
