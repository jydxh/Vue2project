import Myaxios from "../Myaxios";
const actorApi = {
	/* 查询所有演员 返回promise */
	queryAllActors() {
		let url = "http://localhost:3010/movie-actors";
		return Myaxios.get(url, { page: 1, pagesize: 100 });
	},

	/**
	 * 通过姓名模糊查询演员列表
	 * @param {Object} params 请求参数对象。例如： {name:'张'}
	 * @return Promise
	 */
	queryqueryByNameLike(params) {
		let url = "http://localhost:3010/movie-actors/name";
		return Myaxios.post(url, params);
	},

	/**
	 * 添加演员
	 * @param {Object} params 参数对象。
	 *  例如：{actorName:演员名称, actorAvatar:演员头像}
	 * @return Promise
	 */

	add(params) {
		let url = "http://localhost:3010/movie-actor/add";
		return Myaxios.get(url, params);
	},

	/**
	 * 删除演员
	 * @param {Object} params 参数对象。  {id:演员id}
	 * @return Promise
	 */

	delete(params) {
		const url = "http://localhost:3010/movie-actor/del";
		return Myaxios.post(url, params);
	},
};
export default actorApi;
