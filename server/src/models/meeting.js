// datetimes.model.js
const mongoose = require("mongoose")

const DateTimeWeather = new mongoose.Schema({
	id: Number,
	main: String,
	description: String,
	icon: String,
});

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
});

const TimesSchema = new mongoose.Schema({
    range: Number, //1: 8-12 2: 12-16 3: 16-20 4: 20-24
    start: String,
    end: String
});

const DatetimesSchema = new mongoose.Schema({
    date: String, //AAAA/MM/DD
    times: [{type: mongoose.Schema.Types.ObjectId, ref: "Times"}],
    count: Number,
    meeting: {type: mongoose.Schema.Types.ObjectId, ref: "Meeting"}
});

const MeetingSchema = new mongoose.Schema({
    meetId: String,
    title: String,
    ownerId: String,
    description: String,
    location: {
        lat: String,
        lng: String,
        address: String
    },
    datetimes: [{type: mongoose.Schema.Types.ObjectId, ref: "Datetimes"}],
	weather: [WeatherObject]
});

const meeting = mongoose.model("Meeting", MeetingSchema);
const datetimes = mongoose.model("Datetimes", DatetimesSchema);
const times = mongoose.model("Times", TimesSchema);

module.exports = meeting, datetimes, times;
