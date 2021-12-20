const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: Number,
    name: String,
    lastname: String,
    address: String,
    meetings: [String]
});

const user = mongoose.model("User", UserSchema);
module.exports = user;