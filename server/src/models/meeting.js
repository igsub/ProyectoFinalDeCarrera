// datetimes.model.js
const mongoose = require('mongoose');

// const DatetimeSlot = new mongoose.Schema({  
//     date: Date,   
//     timeslots:[
//            {
//                start: Number,
//                 end: Number
//             }
//         ]
// })

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
//    meetid: {
//        type: String,
//        required: false
//    },
//    userid: {
//        type: String,
//        required: false
//    },
//    datetimes: {
//        type: [DatetimeSlot],
//        required: false
//    },
//    weather: {
//        type: Boolean,
//        required: true
//    } ,
//    description: {
//        type: String,
//        required: true
//    }
});

const meeting = mongoose.model("Meeting", MeetingSchema);
module.exports = meeting;