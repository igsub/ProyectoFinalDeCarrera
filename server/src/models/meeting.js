// datetimes.model.js
const mongoose = require('mongoose');

//const Datetimes = require('./datetimes');

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
    datetimes: [{type: mongoose.Schema.Types.ObjectId, ref: "Datetimes"}]
});

const meeting = mongoose.model("Meeting", MeetingSchema);
const datetimes = mongoose.model("Datetimes", DatetimesSchema);
const times = mongoose.model("Times", TimesSchema);

module.exports = meeting, datetimes, times;