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
       required: false
   },
   userid: {
       type: String,
       required: false
   },
   datetimes: {
       type: [datetimeslots],
       required: false
   },
   weather: {
       type: Boolean,
       required: false
   } ,
   description: {
       type: String,
       required: false
   }
});

const datetimes = mongoose.model("datetimes", datetimesSchema);
module.exports = datetimes;