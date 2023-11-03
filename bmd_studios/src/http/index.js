import actorApi from "./api/ActorApi";

// index.js 提供访问具体某接口模块对象
const httpApi = {
	actorApi,
	movieApi,
};

export default httpApi;
