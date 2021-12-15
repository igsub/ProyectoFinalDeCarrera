const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    address: String,
    meetingId: Number
});

const participant = mongoose.model("Participant", UserSchema);
module.exports = participant;