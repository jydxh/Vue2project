import actorApi from "./api/ActorApi";
import movieApi from "./api/MovieApi";
// import directorApi from "./api/DirectorApi";

// index.js 提供访问具体某接口模块对象
const httpApi = {
	actorApi,
	movieApi,
	// directorApi,
};

export default httpApi;
