import axios from "axios"

import userService from "./Services/userService"

const EXPRESS_HOST = process.env.NODE_ENV === "production" ? "https://meet-app.duckdns.org/api" : "http://localhost:5000";

const instance = axios.create({
	baseURL: `${EXPRESS_HOST}`,
})

instance.interceptors.request.use(
	(request) => {
		request.headers["Authorization"] = "Bearer " + userService.getToken()
		return request
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default instance
