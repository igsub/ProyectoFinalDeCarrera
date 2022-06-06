const Meeting = require('../models/meeting'); // date times model
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

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

        meeting.save((error, meetingStored) => {
            if (error) return res.status(500).send({message: 'Error al guardar'});

            if (!meetingStored) return res.status(404).send({message: 'No se ha podido guardar el meeting'});

            return res.status(200).send({
                meeting: meetingStored
            });
        })
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

    //No anda, problema con el constructor Datetimes que viene del model
    addDatetime: (req, res) => {
        var datetime = new Datetimes();

        datetime.date = req.body.date;
        datetime.count = req.body.count;

        datetime.save((error, datetimeStored) => {
            if (error) return res.status(500).send({message: 'Error al guardar datetime'});

            if (!datetimeStored) return res.status(404).send({message: 'No se ha podido guardar el datetime'});

            return res.status(200).send({
                datetime: datetimeStored
            });
        });
    },

    //Modificar para cuando vuleve a ingresar el mismo usuario se pisen los votos viejos
    voteDatetimes: (req, res) => {

        var meeting_id = req.body.meeting_id;
        var user_id = req.body.user_id;
        var email = req.body.email;
        var datetimes = req.body.datetimes;

        var user_datetimes = {email, user_id, datetimes};

        Meeting.findByIdAndUpdate({_id: meeting_id}, {$push: {datetimesByUser: user_datetimes}}, (error, meetingUpdated) => {
            if (error) return res.status(500).send({message: 'Error al agregar los datetimes de un usuario a la meeting'});

            if (!meetingUpdated) return res.status(404).send({message: 'No se pudo agregar el datetime del usuario al meeting'});

            return res.status(200).send({
                meeting: meetingUpdated
            });
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

        //Cambiar despues, tiene que venir del front
        const weatherMatters = true;

        //Agregar el if para ver si el clima es importante
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
                                
                                if (weatherMatters) {
                                    var index_clima = meeting.weather.findIndex(weather => weather.datetime.split(" ")[0].replaceAll("-","/") == datetime.date && parseInt(weather.datetime.split(" ")[1].split(":")[0]) <= parseInt(timeslot.end.split(":")[0]) && parseInt(weather.datetime.split(" ")[1].split(":")[0]) >= parseInt(timeslot.start.split(":")[0]));
                                    var weatherCondition = meeting.weather[index_clima].weather[0].main;

                                    var index_clima_2 = meeting.weather.reverse().findIndex(weather => weather.datetime.split(" ")[0].replaceAll("-","/") == datetime.date && parseInt(weather.datetime.split(" ")[1].split(":")[0]) <= parseInt(timeslot.end.split(":")[0]) && parseInt(weather.datetime.split(" ")[1].split(":")[0]) >= parseInt(timeslot.start.split(":")[0]));
                                    var weatherCondition2 = meeting.weather[index_clima_2].weather[0].main; 

                                    var valores_climas = {
                                        "Clear": 3,
                                        "Clouds": 2,
                                        "Rain": 1
                                    };

                                    if (valores_climas[weatherCondition] > valores_climas[weatherCondition2]) {
                                        votos.push({date: datetime.date, timeslot: timeslot, count: valores_climas[weatherCondition2]});
                                    } else {
                                        votos.push({date: datetime.date, timeslot: timeslot, count: valores_climas[weatherCondition]});
                                    }

                                } else {
                                    votos.push({date: datetime.date, timeslot: timeslot, count: 1});
                                }
            
                            } else {
                                //console.log(votos[index]);
                                var new_count = votos[index].count + 1;
                                votos[index].count = new_count;
                            }
                        });
                    });
                });

                votos.sort((datetime_a, datetime_b) => datetime_b.count - datetime_a.count);

                return res.status(200).send(votos);
            });
        } catch (Error) {
            console.log(Error);
        }
    },

    sendEmails: (req, res) => {
        const meeting_id = req.params.meeting_id;
        const users = [];

        Meeting.findById(meeting_id, (error, meeting) => {
            if (error) return res.status(500).send({message: 'Error al encontrar al meeting'});
    
            if (!meeting) return res.status(404).send('No se encontro un meeting');
                
            var datetimesByUser = meeting.datetimesByUser;

            datetimesByUser.forEach(datetimeByUser => {
                users.push(datetimeByUser.email);
            });

            //Cambiar los datos por una cuenta real
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'meetappok@gmail.com',
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: 'Meet App',
                to: users,
                subject: 'Evento confirmado!',
                text: 'Test'
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
