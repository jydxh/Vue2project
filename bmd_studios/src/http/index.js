import actorApi from "./api/ActorApi";
import movieApi from "./api/MovieApi";
import cinemaApi from "./api/CinemaApi";
// import directorApi from "./api/DirectorApi";

// index.js 提供访问具体某接口模块对象
const httpApi = {
	actorApi,
	movieApi,
	cinemaApi,
	// directorApi,
};

export default httpApi;
