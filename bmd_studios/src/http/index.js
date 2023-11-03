import myaxios from "./Myaxios";

// index.js 提供访问接口的API
const httpApi = {
	queryAllActors() {
		let url = "http://localhost:3010/movie-actors";
		let params = { page: 1, pagesize: 100 };
		return myaxios.get(url, params); //返回的promise对象
	},
};

export default httpApi;
