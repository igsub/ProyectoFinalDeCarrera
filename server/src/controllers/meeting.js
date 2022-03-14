const Meeting = require('../models/meeting'); // date times model
const jwt = require("jsonwebtoken");

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
        meeting.title = params.title;
        meeting.location = params.location;
        meeting.datetimesByUser = params.datetimesByUser;
        meeting.weather = params.weather

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

    voteDatetime: (req, res) => {
        //Acomodar para que busque en los datetimes con el id del meeting
        // const meeting_id = req.body.meeting_id;
        // const datetime_id = req.body.datetime_id;
        // Meeting.find({: meeting_id}), (error, meeting) => {
        //     for (let datetime in meeting.datetimes) {

        //     }
        // }

        Datetimes.findByIdAndUpdate({_id: datetime_id}, {$inc: {count: 1}}, (error, datetimeUpdated) => {
            if (error) return res.status(500).send({message: 'Error al actualizar'});

            if (!datetimeUpdated) return res.status(404).send({message: 'No existe el datetime para actualizar'});

            return res.status(200).send({
                datetime: datetimeUpdated
            });
        });
    },

    //Probar bien
    getMostVoted: (req, res) => {
        const meeting_id = req.params.meeting_id;
        try {
            Meeting.findById(meeting_id, (error, meeting) => {
                if (error) return res.status(500).send({message: 'Error al encontrar al meeting'});

                if (!datetime) return res.status('No se encontro un meeting');
                
                var datetimesByUser = meeting.datetimesByUser;

                var votos = [];
                
                datetimesByUser.forEach(datetimeByUser => {
                    
                    var datetimes = datetimeByUser.datetimes;
                    
                    datetimes.forEach(datetime => {
                        var index = votos.findIndex(votos_datetime => datetime && datetime.date == votos_datetime.date);
                        if (index != -1) {
                            //Aparece el date, recorrer los timeslots para ver si hay que sumar o agregar
                            datetime.timeslots.forEach(ts => {
                                var ts_index = votos[index].times_votes.findIndex(voto_timeslot => ts && ts.range == voto_timeslot.range);
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
    }
}

module.exports = MeetingController
