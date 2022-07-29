const Meeting = require('../models/meeting'); // date times model
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const User = require('../models/user');
var path = require('path');

var MeetingController = {
    
    test: (req, res) => {
        res.status(200).send("Funciona!");
    },
    
    getAllMeetings: (req, res) => {
        Meeting.find({}).exec ((error, meetings) => {
            if (error) return res.status(500).send({message: 'Error al cargar los Meetings'});

            if (!meetings) return res.status(404).send({message: 'No se han podido cargar los Meetings'});

            return res.status(200).send({
                meetings: meetings
            });
        });
    },

    getMeeting: (req, res) => {
        var meetId = req.params.meetId;
        
        if (meetId == null) {
            return res.status(404).send('No existe el meeting');
        }

        Meeting.findById(meetId, (err, meeting) => {
            if(err){
                    return res.status(500).send({
                    success: false,
                    error: err.message
                    });
            }
            if (!meeting) {
                return res.status(404).send('No existe el meeting');
            }
            return res.status(200).send({
                meeting
            });
        });
    },

    addMeeting: (req, res) => {

        var meeting = new Meeting();

        var params = req.body;
        meeting.description = params.description;
        meeting.ownerId = params.ownerId;
        meeting.ownerEmail = params.ownerEmail;
        meeting.title = params.title;
        meeting.location = params.location;
        meeting.datetimesByUser = params.datetimesByUser;
        meeting.weather = params.weather;
        meeting.ownerEmail = params.ownerEmail;
        meeting.weatherMatters = params.weatherMatters;

        meeting.save().then((meetingStored) => {
            
            User.findOneAndUpdate({email: meetingStored.ownerEmail}, {$push: {meetings: meetingStored._id}}).exec();

            return Promise.resolve(meetingStored);
        }).then((meetingStored) => {
            res.status(200).send(meetingStored);
        });
    },

    updateMeeting: (req, res) => {
        var meetId = req.params.meetId;
        var fieldsToUpdate = req.body;
        
        Meeting.findByIdAndUpdate(meetId, fieldsToUpdate, (error, meetingUpdated) => {
            if (error) return res.status(500).send({message: 'Error al actualizar'});

            if (!meetingUpdated) return res.status(404).send({message: 'No existe el meeting para actualizar'});

            return res.status(200).send({
                meeting: meetingUpdated
            });
        });
    },

    deleteMeeting: (req, res) => {
        var meetId = req.params.meetId;
        Meeting.findByIdAndDelete(meetId, function(error, meetingDeleted){
            if (error) return res.status(500).send({message: 'Error al eliminar'});

            if (!meetingDeleted) return res.status(404).send({message: 'No existe el meeting para eliminar'});

            return res.status(200).send({
                meeting: meetingDeleted
            });
        });
    },

    verifyToken: function(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized');
        }
        
        const token = req.headers.authorization.split(' ')[1];
        if (token === null) {
            return res.status(401).send('Unauthorized');
        }

        const payload = jwt.verify(token, 'secretkey');
        next();
    },

    voteDatetimes: (req, res) => {

        var meeting_id = req.body.meeting_id;
        var user_id = req.body.user_id;
        var email = req.body.email;
        var datetimes = req.body.datetimes;

        var user_datetimes = {email, user_id, datetimes};

        Meeting.findById({_id: meeting_id}).then((meeting) => {
            
            const old_user_datetimes = meeting.datetimesByUser.find(datetime => datetime.email == email);

            if (old_user_datetimes != undefined) {
                Meeting.findByIdAndUpdate({_id: meeting_id}, {$pull: {datetimesByUser: old_user_datetimes}}).exec();
                Meeting.findByIdAndUpdate({_id: meeting_id}, {$push: {datetimesByUser: user_datetimes}}).exec();
            } else {
                Meeting.findByIdAndUpdate({_id: meeting_id}, {$push: {datetimesByUser: user_datetimes}}).exec();
                User.findOneAndUpdate({email: email}, {$push: {meetings: meeting_id}}).exec();
            }

            return Promise.resolve(meeting);
        }).then((meeting) => {
            res.status(200).send(meeting);
        });
    },

    getMostVoted: (req, res) => {
        const meeting_id = req.params.meeting_id;

        try {
            Meeting.findById(meeting_id, (error, meeting) => {
                if (error) return res.status(500).send({message: 'Error al encontrar al meeting'});

                if (!meeting) return res.status(404).send('No se encontro un meeting');
                
                var datetimesByUser = meeting.datetimesByUser;

                var votos = [];
                
                datetimesByUser.forEach(datetimeByUser => {
                    
                    var datetimes = datetimeByUser.datetimes;
                    
                    datetimes.forEach(datetime => {
                        var index = votos.findIndex(votos_datetime => datetime && datetime.date == votos_datetime.date);
                        if (index != -1) {
                            //Aparece el date, recorrer los timeslots para ver si hay que sumar o agregar
                            datetime.timeslots.forEach(ts => {
                                var ts_index = votos[index].times_votes.findIndex(voto_timeslot => ts && ts.range == voto_timeslot.timeslot.range);
                                if (ts_index != -1) {
                                    var new_count = votos[index].times_votes[ts_index].count;
                                    new_count++;
                                    votos[index].times_votes[ts_index].count = new_count;
                                } else {
                                    votos[index].times_votes.push({timeslot: ts, count: 1});
                                }
                            })
                            
                        } else {
                            //for para recorrer timeslots y agregar todos al arreglo votos
                            var times_votes = [];
                            datetime.timeslots.forEach(ts => {
                                times_votes.push({timeslot: ts, count: 1});
                            })
                            votos.push({date: datetime.date, times_votes: times_votes});
                        }
                    })

                });
                return res.status(200).send(votos);
            });
        } catch (Error) {
            console.log(Error);
        }
    },

    decideDatetime: (req, res) => {
        const meeting_id = req.params.meeting_id;
        
        try {
            Meeting.findById(meeting_id, (error, meeting) => {
                if (error) return res.status(500).send({message: 'Error al encontrar al meeting'});
    
                if (!meeting) return res.status(404).send('No se encontro un meeting');
                
                var datetimesByUser = meeting.datetimesByUser;
    
                var votos = [];
    
                datetimesByUser.forEach(datetimeByUser => {
                    var dates = datetimeByUser.datetimes;
    
                    dates.forEach(datetime => {
                        var timeslots = datetime.timeslots;
    
                        timeslots.forEach(timeslot => {
                            var index = votos.findIndex(element => element.date == datetime.date && element.timeslot.range == timeslot.range);
                            if (index == -1) {
                                votos.push({date: datetime.date, timeslot: timeslot, count: 1, votes: 1});
                            } else {
                                var new_count = votos[index].count + 1;
                                votos[index].count = new_count;
                                votos[index].votes = new_count;
                            }
                        });
                    });
                });

                if (meeting.weatherMatters) {
                    votos.forEach(datetime => {
                        var index_clima = meeting.weather.findIndex(weather => weather.datetime.split(" ")[0].replaceAll("-","/") == datetime.date && parseInt(weather.datetime.split(" ")[1].split(":")[0]) <= parseInt(datetime.timeslot.end.split(":")[0]) && parseInt(weather.datetime.split(" ")[1].split(":")[0]) >= parseInt(datetime.timeslot.start.split(":")[0]));
                        var weatherCondition = meeting.weather[index_clima].weather[0].main;
                        var weatherTemp = meeting.weather[index_clima].main.temp;

                        var index_clima_2 = meeting.weather.reverse().findIndex(weather => weather.datetime.split(" ")[0].replaceAll("-","/") == datetime.date && parseInt(weather.datetime.split(" ")[1].split(":")[0]) <= parseInt(datetime.timeslot.end.split(":")[0]) && parseInt(weather.datetime.split(" ")[1].split(":")[0]) >= parseInt(datetime.timeslot.start.split(":")[0]));
                        var weatherCondition2 = meeting.weather[index_clima_2].weather[0].main;
                        var weatherTemp2 = meeting.weather[index_clima_2].main.temp;

                        var valores_climas = {
                            "Clear": 2,
                            "Clouds": 1.5,
                            "Rain": 1
                        };

                        //Multiplicando segun estado del clima
                        if (valores_climas[weatherCondition] > valores_climas[weatherCondition2]) {
                            var new_count = datetime.count * valores_climas[weatherCondition2];
                            datetime.count = new_count;
                        } else {
                            var new_count = datetime.count * valores_climas[weatherCondition];
                            datetime.count = new_count;
                        }

                        var min_temp = Math.min(weatherTemp, weatherTemp2);
                        //Multiplicando segun temperatura
                        if (min_temp > 20) {
                            var new_count = datetime.count * 2;
                            datetime.count = new_count;
                        } else if (min_temp > 10) {
                            var new_count = datetime.count * 1.5;
                            datetime.count = new_count;
                        }
                    });
                }

                votos.sort((datetime_a, datetime_b) => datetime_b.count - datetime_a.count);

                const users_count = meeting.datetimesByUser.length;
                
                return res.status(200).send({votos: votos, cant_usuarios: users_count});
            });
        } catch (Error) {
            console.log(Error);
        }
    },

    selectFinalDatetime: (req, res) => {
        const meeting_id = req.body.meeting_id;
        const date = req.body.date;
        const timeslot = req.body.timeslot;

        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const day = weekday[new Date(date).getDay()];
        const users = [];

        Meeting.findByIdAndUpdate(meeting_id, {final_selection: {date: date, timeslot: timeslot}}, (err, meetingUpdated) => {
            if (err) return res.status(500).send({message: 'Error al encontrar al meeting'});
    
            if (!meetingUpdated) return res.status(404).send('No se pudo actualizar la meeting');

            var datetimesByUser = meetingUpdated.datetimesByUser;

            datetimesByUser.forEach(datetimeByUser => {
                users.push(datetimeByUser.email);
            });

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'meetappok@gmail.com',
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const emailBody = '<p>An event was confirmed on ' + day + ' ' + date + ' between ' + timeslot.start + 'hs and ' + timeslot.end + 'hs </p><img style="width:30%" src="cid:logo"></img>'
            const logo_path = path.join(__dirname, "..", "images", "MeetApp-logos_black.png");

            console.log(day);

            const mailOptions = {
                from: 'Meet App',
                to: users,
                subject: 'Event confirmed!',
                text: 'An event was confirmed on ' + day + ' ' + date + ' between ' + timeslot.start + 'hs and ' + timeslot.end +'hs',
                attachments: [{
                    filename: 'Logo.png',
                    path: logo_path,
                    cid: 'logo' //my mistake was putting "cid:logo@cid" here! 
               }],
               html: emailBody
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send(error.message);
                } else {
                    return res.status(200).send('Email sent: ' + info.response);
                }
            });   
        });
    }
}

module.exports = MeetingController;
