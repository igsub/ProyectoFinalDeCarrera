const Participant = require('../models/participant');

var participantController = {
    
    getParticipant: (req, res) => {

    },

    addParticipant: (req, res) => {
        
    },

    getAllParticipants: (req, res) => {
        var meeting_id = req.params.meeting_id;
        
        if (meeting_id == null) {
            return res.status(404).send('No existe la meeting');
        }

        Participant.findById(meeting_id, (err, participants) => {
            if(err){
                    return res.status(500).send({
                    success: false,
                    error: err.message
                    });
            }
            if (!participants) {
                return res.status(404).send('No tiene participantes');
            }
            return res.status(200).send({
                participants
            });
        });
    },

    deleteParticipant: (req, res) => {

    },

    updateParticipant: (req, res) => {

    }
}

module.exports = participantController;