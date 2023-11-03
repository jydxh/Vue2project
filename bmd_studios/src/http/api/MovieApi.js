import Myaxios from "../Myaxios";
import BaseUrl from "../BaseUrl";
const BMDURL = BaseUrl.BMDURL;

const movieApi = {
	/** 新增电影
	 *
	 */
	add() {
		const url = BMDURL + "/movie-info/add";
		return Myaxios.post(url, params);
	},
	/* 查询电影类型列表 */
	queryMovieType() {
		const url = BMDURL + "/movie-types";
		return Myaxios.get(url);
	},
	/* 查询所有电影（分页） */
	/**
	 * @params {page:2, pagesize:2 }
	 * @returns promise
	 */
	queryAllMovie() {
		const url = BMDURL + "/movie-infos";
		return Myaxios.get(url, params);
	},

	/* 根据电影名字模糊查询所有电影（分页） */
	/**
	 * @params {name: "string", page:1 ,pagesize：10}
	 * @returns promise
	 */
	queryMovieByName() {
		const url = BMDURL + "/movie-infos/name";
		return Myaxios.post(url, params);
	},

	/**
	 * @param {id:1}
	 * @returns promise
	 */
	deleteMovie() {
		const url = BMDURL + "/movie-info/del";
		return Myaxios.post(url, params);
	},

	/**
	 * @param {id:3}
	 * @returns promise
	 */
	queryMovieById() {
		const url = BMDURL + "/movie-info/query";
		return Myaxios(url, params);
	},

	/**
	 * @params {id:5, category_id:1, cover:http://localhost:9000/test.jpg, title: "xxx", type:"xxx", star_actor:"xx", showingin: "1000-11-11", score: 9.0, description: "xxx", duration: 107}
	 * @returns promise
	 */
	modifyMovie() {
		const url = BMDURL + "/movie-info/update";
		return Myaxios(url, params);
	},

	/**
	 * @params {movie_id: 1, actor_ids: 15,16,23,25}
	 * @returns
	 */
	bindActors() {
		const url = BMDURL + "/movie-info/bind-actors";
		return Myaxios(url, params);
	},
};

export default movieApi;
