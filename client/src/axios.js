import axios from "axios"

import userService from "./Services/userService"

const instance = axios.create({
	baseURL: "http://localhost:5000",
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
