const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    lastname: String,
    address: String,
    meetings: [String],
    email: String,
});

const user = mongoose.model("User", UserSchema);
module.exports = user;