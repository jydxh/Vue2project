// index.js 提供访问具体某接口模块对象
import actorApi from "./api/ActorApi";
import directorApi from "./api/DirectorApi";
import movieApi from "./api/MovieApi";
import cinemaApi from "./api/CinemaApi";
import cinemaRoomApi from "./api/CinemaRoomApi";
import showingonPlanApi from "./api/ShowingonPlanApi";
import adminApi from "./api/AdminApi";

const httpApi = {
	actorApi,
	directorApi,
	movieApi,
	cinemaApi,
	cinemaRoomApi,
	showingonPlanApi,
	adminApi,
};

export default httpApi;
