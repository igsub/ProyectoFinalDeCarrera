import axios from "axios"

const weatherService = {
	getWeatherByDate: async (coords) => {
		return axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${process.env.REACT_APP_WHEATHER_API_KEY}`)
	},
}

export default weatherService
