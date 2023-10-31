// Myaxios.js
import qs from "qs";
import axios from "axios";
const instance = axios.create();
let Myaxios = {
	// short cut /**
	/**
	 *发送get请求
	 * @param {string} url
	 * @param {object} params
	 * @returns Promise use .then or .catch to use the result
	 */

	get(url, params) {
		return instance({
			url: url,
			method: "GET",
			params: params,
		});
	},
	post(url, params) {
		return instance({
			url: url,
			method: "POST",
			data: qs.stringify(params),
		});
	},
};

export default Myaxios;
