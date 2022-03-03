// datetimes.model.js
const mongoose = require("mongoose")

const DateTimeWeather = new mongoose.Schema({
	id: Number,
	main: String,
	description: String,
	icon: String,
})

const WeatherObject = new mongoose.Schema({
	main: {
		temp: Number,
		feels_like: Number,
		temp_min: Number,
		temp_max: Number,
		pressure: Number,
		sea_level: Number,
		grnd_level: Number,
		humidity: Number,
		temp_kf: Number,
	},
	datetime: String,
	weather: [DateTimeWeather],
})

const MeetingSchema = new mongoose.Schema({
	meetId: String,
	title: String,
	ownerId: String,
	description: String,
	location: {
		lat: String,
		lng: String,
		address: String,
	},
	weather: [WeatherObject],
})

const meeting = mongoose.model("Meeting", MeetingSchema)
module.exports = meeting
