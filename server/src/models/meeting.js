// datetimes.model.js
const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    meetId: String,
    title: String,
    ownerId: String,
    description: String,
    location: {
        lat: String,
        lng: String,
        address: String
    }
});

const meeting = mongoose.model("Meeting", MeetingSchema);
module.exports = meeting;