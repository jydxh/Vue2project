import Myaxios from "../Myaxios";
import BaseUrl from "../BaseUrl";
const BMDURL = BaseUrl.BMDURL;

const movieApi = {
	/** 新增电影
	 * @param {Obejct}
	 *  @return Promise
	 */
	add(param) {
		const url = BMDURL + "/movie-info/add";
		return Myaxios.post(url, param);
	},
	/* 查询电影类型列表 */
	queryMovieType() {
		const url = BMDURL + "/movie-types";
		return Myaxios.get(url);
	},
	/* 查询所有电影（分页） */
	/**
	 * @param {Object}
	 * @return Promise
	 */
	queryAllMovie(params) {
		const url = BMDURL + "/movie-infos";
		return Myaxios.get(url, params);
	},

	/* 根据电影名字模糊查询所有电影（分页） */
	/**
	 * @param {name: "string", page:1 ,pagesize：10}
	 * @returns promise
	 */
	queryMovieByName(param) {
		const url = BMDURL + "/movie-infos/name";
		return Myaxios.post(url, param);
	},

	/**
	 * @param {id:1}
	 * @returns promise
	 */
	deleteMovie(param) {
		const url = BMDURL + "/movie-info/del";
		return Myaxios.post(url, param);
	},

	/**
	 * @param {id:3}
	 * @returns Promise
	 */
	queryMovieById(param) {
		const url = BMDURL + "/movie-info/query";
		return Myaxios(url, param);
	},

	/**
	 * @param {Object}
	 * @return Promise
	 */
	modifyMovie(param) {
		const url = BMDURL + "/movie-info/update";
		return Myaxios(url, param);
	},

	/**
	 * @param {Object}
	 * @returns Promise
	 */
	bindActors(params) {
		const url = BMDURL + "/movie-info/bind-actors";
		return Myaxios(url, params);
	},
};

export default movieApi;
