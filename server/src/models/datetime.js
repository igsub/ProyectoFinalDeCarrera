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

const DatetimeSchema = new mongoose.Schema({
    meetId: String,
    userId: String,
    start: Number,
    end: Number,
    description: String,
    weather: Boolean
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

const datetime = mongoose.model("Datetime", DatetimeSchema);
module.exports = datetime;