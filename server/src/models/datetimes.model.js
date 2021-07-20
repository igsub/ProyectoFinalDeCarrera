// datetimes.model.js
const mongoose = require('mongoose');

const datetimeslots = new mongoose.Schema({  
    date: Date,   
    timeslots:[
           {
               start: Number,
                end: Number
            }
        ]
})

const datetimesSchema = new mongoose.Schema({
   meetid: {
       type: String,
       required: true
   },
   userid: {
       type: String,
       required: true
   },
   datetimes: {
       type: [datetimeslots],
       required: true
   },  
});

const datetimes = mongoose.model("datetimes", datetimesSchema);
module.exports = datetimes;