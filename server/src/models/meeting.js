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

// const DatetimesSchema = new mongoose.Schema({
//     date: String, //AAAA/MM/DD
//     times: [{type: mongoose.Schema.Types.ObjectId, ref: "Times"}],
//     count: Number,
//     meeting: {type: mongoose.Schema.Types.ObjectId, ref: "Meeting"}
// });

const DatetimeSlots = new mongoose.Schema({
    date: String,
    timeslots: [
        {
            range: Number,
            start: String,
            end: String,
        },
    ],
})

const DatetimesByUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
    },
    userid: {
        type: String,
        required: false,
    },
    datetimes: {
        type: [DatetimeSlots],
        required: false,
    },
})

const MeetingSchema = new mongoose.Schema({
    title: String,
    ownerId: String,
    description: String,
    location: {
        lat: String,
        lng: String,
        address: String
    },
    datetimesByUser: [DatetimesByUserSchema],
	weather: [WeatherObject]
});

const meeting = mongoose.model("Meeting", MeetingSchema);
//const datetimes = mongoose.model("DatetimesByUser", DatetimesByUserSchema);
//const times = mongoose.model("DatetimeSlots", DatetimeSlotsSchema);

module.exports = meeting;
